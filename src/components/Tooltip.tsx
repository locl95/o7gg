import React from "react";
import { createPortal } from "react-dom";
import { WowItem } from "../pages/View";

interface TooltipProps {
  children: React.ReactElement;
  offset?: { x: number; y: number };
  content: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  offset = { x: 0, y: 0 },
  content,
}) => {
  const [show, setShow] = React.useState(false);
  const [{ clientX, clientY }, setCoordinates] = React.useState<{
    clientX: number;
    clientY: number;
  }>({ clientX: 0, clientY: 0 });

  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const getTooltipPosition = () => {
    if (!tooltipRef.current)
      return { left: clientX + offset.x, top: clientY + offset.y };

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;

    let left = clientX + offset.x;
    let top = clientY + offset.y;

    if (left + tooltipRect.width > innerWidth) {
      left = clientX - tooltipRect.width - offset.x;
    }

    if (top + tooltipRect.height > innerHeight) {
      top = clientY - tooltipRect.height - offset.y;
    }

    if (left < 0) {
      left = clientX + offset.x;
    }

    if (top < 0) {
      top = clientY + offset.y;
    }

    return { left, top };
  };

  const position = getTooltipPosition();

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onMouseEnter: () => setShow(true),
        onMouseLeave: () => setShow(false),
        onMouseMove: (e: React.MouseEvent) =>
          setCoordinates({ clientX: e.clientX, clientY: e.clientY }),
      })}
      {createPortal(
        show && (
          <div
            ref={tooltipRef}
            className="fixed top-0 left-0"
            style={{
              transform: `translate(${position.left}px, ${position.top}px)`,
            }}
          >
            {content}
          </div>
        ),
        document.body
      )}
    </React.Fragment>
  );
};

export const TooltipMobile: React.FC<TooltipProps> = ({
  children,
  content,
}) => {
  const [show, setShow] = React.useState(false);
  const childRef = React.useRef<HTMLDivElement>(null);

  const toggleTooltip = () => {
    setShow((prev) => {
      if (!prev) {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
      }
      return !prev;
    });
  };

  const handleClickOutside = () => {
    setShow(false);
    document.removeEventListener("mousedown", handleClickOutside);
  };

  const handleScroll = () => {
    setShow(false);
    window.removeEventListener("scroll", handleScroll);
  };

  return (
    <>
      <div ref={childRef} onClick={toggleTooltip}>
        {children}
      </div>
      {createPortal(
        show && (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-white"
              style={{ opacity: 0.4, zIndex: 999 }}
            ></div>
            <div
              className="fixed bg-black text-white p-2 rounded-lg"
              style={{
                top: "30%",
                left: "30%",
                transform: "translate(-20%, -20%)",
                zIndex: 1000,
              }}
            >
              {content}
            </div>
          </>
        ),
        document.body
      )}
    </>
  );
};

interface TooltipWowItemProps {
  item: WowItem;
  fallback: string;
}

export const TooltipWowItem: React.FC<TooltipWowItemProps> = ({
  item,
  fallback,
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const qualityBorderColor: { [key: string]: string } = {
    Poor: "border-gray-500",
    Common: "border-white",
    Uncommon: "border-green-500",
    Rare: "border-blue-500",
    Epic: "border-purple-500",
    Legendary: "border-orange-500",
  };

  const qualityNameColor: { [key: string]: string } = {
    Poor: "text-gray-500",
    Common: "border-white",
    Uncommon: "text-green-500",
    Rare: "text-blue-500",
    Epic: "text-purple-500",
    Legendary: "text-orange-500",
  };

  const borderColor = item
    ? qualityBorderColor[item.quality] || "border-transparent"
    : "border-transparent";
  const nameColor = item
    ? qualityNameColor[item.quality] || "text-white"
    : "text-white";

  interface PriceProps {
    header: string;
    gold?: string;
    silver?: string;
    copper?: string;
  }

  function formatSellPrice(price: PriceProps) {
    return (
      <div className="flex gap-x-1.5">
        {price.header}
        {price.gold && price.gold !== "0" && (
          <span className="flex items-center">
            {price.gold}
            <img
              src="/icons/currency/gold.webp"
              alt="gold"
              className="w-4 h-4"
            />
          </span>
        )}
        {price.silver && price.silver !== "0" && (
          <div className="flex items-center">
            {price.silver}
            <img
              src="/icons/currency/silver.webp"
              alt="silver"
              className="w-4 h-4"
            />
          </div>
        )}
        {price.copper && price.copper !== "0" && (
          <div className="flex items-center">
            {price.copper}
            <img
              src="/icons/currency/copper.webp"
              alt="copper"
              className="w-4 h-4"
            />
          </div>
        )}
      </div>
    );
  }

  const formatEnchantment = (enchantment: string) => {
    if (enchantment.includes("(")) {
      return enchantment.split("(")[0].trim();
    } else if (enchantment.includes(":")) {
      return enchantment.split(":")[1].trim();
    }
    return enchantment;
  };

  const content = (
    <div className="flex flex-col bg-black text-white py-1 px-2 rounded-lg max-w-sm">
      <span className={`block ${nameColor}`}>{item.name}</span>
      <span className="text-yellow-400">Item level {item.level}</span>
      <span>{item.binding}</span>
      <div className="flex justify-between">
        <span>{item.slot}</span>
        {item.itemSubclass !== "Miscellaneous" && (
          <span>{item.itemSubclass}</span>
        )}
      </div>
      {item.weaponStats && (
        <div className="flex flex-col">
          <div className="flex justify-between space-x-6">
            <span>{item.weaponStats.damage}</span>
            <span>{item.weaponStats.attackSpeed}</span>
          </div>
          <span>{item.weaponStats.dps}</span>
        </div>
      )}
      <span>{item.armor}</span>
      <div className="flex flex-col">
        {item.stats.map((stat, index) => (
          <div key={index}>{stat}</div>
        ))}
      </div>
      <div className="flex flex-col text-green-500">
        {item.enchantments.map((ench, index) => (
          <div key={index}>{formatEnchantment(ench)}</div>
        ))}
      </div>
      <span>{item.durability}</span>
      <span>
        {item.requiredLevel === 0 ? "" : `Requires Level ${item.requiredLevel}`}
      </span>
      <div className="flex flex-col text-green-500">
        {item.spells.map((spell, index) => (
          <div key={index}>{spell}</div>
        ))}
      </div>
      <span>{item.sellPrice ? formatSellPrice(item.sellPrice) : ""}</span>
    </div>
  );

  return isMobile ? (
    <TooltipMobile offset={{ x: 0, y: 0 }} content={content}>
      <img
        src={item?.icon || `/icons/gear/${fallback}.webp`}
        alt={item?.name || fallback}
        className={`w-[56px] h-auto object-contain rounded-lg shadow-sm border-4 ${borderColor}`}
      />
    </TooltipMobile>
  ) : (
    <Tooltip offset={{ x: 10, y: -40 }} content={content}>
      <img
        src={item?.icon || `/icons/gear/${fallback}.webp`}
        alt={item?.name || fallback}
        className={`w-[56px] h-[56px] object-contain rounded-lg shadow-sm border-4 ${borderColor}`}
      />
    </Tooltip>
  );
};
