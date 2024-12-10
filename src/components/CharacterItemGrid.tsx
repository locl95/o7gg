import React from "react";
import { Character, WowItem } from "../pages/View";
import {
  CharacterCoreStats,
  CharacterDefensiveStats,
  CharacterOffensiveStats,
  CharacterResistancesStats,
  CharacterResourcesStats,
} from "./CharacterStats";
import Tooltip from "./Tooltip";

interface CharacterItemSlotProps {
  item?: WowItem;
  fallback: string;
}

const CharacterItemSlot: React.FC<CharacterItemSlotProps> = ({
  item,
  fallback,
}) => {
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
    <div className="relative flex justify-center">
      <div>
        {item ? (
          <Tooltip
            offset={{ x: 10, y: -40 }}
            content={
              <div className="flex flex-col bg-black text-white py-1 px-2 rounded-lg max-w-sm">
                <span className={`block ${nameColor}`}>{item.name}</span>
                <span className="text-yellow-400">Item level {item.level}</span>
                <div className="flex justify-between">
                  <span>{item.slot}</span>
                  {item.itemSubclass !== "Miscellaneous" && (
                    <span>{item.itemSubclass}</span>
                  )}
                </div>
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
        ) : (
          <img
            src={`/icons/gear/${fallback}.webp`}
            alt={fallback}
            className={`w-[56px] h-[56px] object-contain rounded-lg shadow-sm border-4 ${borderColor}`}
          />
        )}
      </div>
    </div>
  );
};

interface CharacterItemGridProps {
  char: Character;
}

const CharacterItemGrid: React.FC<CharacterItemGridProps> = ({ char }) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="flex flex-col space-y-4">
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Head")}
            fallback={"head"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Neck")}
            fallback={"neck"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Shoulders")}
            fallback={"shoulders"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Back")}
            fallback={"back"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Chest")}
            fallback={"chest"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Shirt")}
            fallback={"shirt"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Tabard")}
            fallback={"tabard"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Wrist")}
            fallback={"wrist"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Main Hand")}
            fallback={"mainhand"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Off Hand")}
            fallback={"offhand"}
          />
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-2">
          <CharacterCoreStats stats={char.stats} />
          <CharacterOffensiveStats stats={char.stats} />
          <CharacterDefensiveStats stats={char.stats} />
          <CharacterResourcesStats stats={char.stats} />
          <CharacterResistancesStats stats={char.stats} />
        </div>

        <div className="flex flex-col space-y-4">
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Hands")}
            fallback={"hands"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Waist")}
            fallback={"waist"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Legs")}
            fallback={"legs"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Feet")}
            fallback={"feet"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Ring 1")}
            fallback={"finger"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Ring 2")}
            fallback={"finger"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Trinket 1")}
            fallback={"trinket"}
          />
          <CharacterItemSlot
            item={char.items.find((item) => item.slot === "Trinket 2")}
            fallback={"trinket"}
          />
          <div className="row-span-2">
            <CharacterItemSlot
              item={char.items.find((item) => item.slot === "Ranged")}
              fallback={"ranged"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterItemGrid;
