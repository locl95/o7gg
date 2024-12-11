import React from "react";
import { createPortal } from "react-dom";
import { WowItem } from "../pages/View";

interface TooltipProps {
  children: React.ReactElement;
  offset?: { x: number; y: number };
  content: React.ReactElement;
}

const Tooltip: React.FC<TooltipProps> = ({
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

interface TooltipWowItemProps {
  item: WowItem;
  fallback: string;
}

const TooltipWowItem: React.FC<TooltipWowItemProps> = ({ item, fallback }) => {
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
        {price.gold && price.gold !== "0" && price.gold !== "" && (
          <span className="flex items-center">
            {price.gold}
            <img
              src="/icons/currency/gold.webp"
              alt="gold"
              className="w-4 h-4"
            />
          </span>
        )}
        {price.silver && price.silver !== "0" && price.silver !== "" && (
          <div className="flex items-center">
            {price.silver}
            <img
              src="/icons/currency/silver.webp"
              alt="silver"
              className="w-4 h-4"
            />
          </div>
        )}
        {price.copper && price.copper !== "0" && price.copper !== "" && (
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

  return (
    <Tooltip
      offset={{ x: 10, y: -40 }}
      content={
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
          <span>{item.durability}</span>
          <span>Requires Level {item.requiredLevel}</span>
          <div className="flex flex-col text-green-500">
            {item.spells.map((spell, index) => (
              <div key={index}>{spell}</div>
            ))}
          </div>
          <span>{formatSellPrice(item.sellPrice)}</span>
        </div>
      }
    >
      <img
        src={item ? item.icon : `/icons/gear/${fallback}.webp`}
        alt={item ? item.name : fallback}
        className={`w-[56px] h-[56px] object-contain rounded-lg shadow-sm border-4 ${borderColor}`}
      />
    </Tooltip>
  );
};

export default TooltipWowItem;
