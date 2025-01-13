import React from "react";
import { Character, WowItem } from "../pages/View";
import {
  CharacterCoreStats,
  CharacterDefensiveStats,
  CharacterOffensiveStats,
  CharacterResistancesStats,
  CharacterResourcesStats,
} from "./CharacterStats";
import { TooltipWowItem } from "./Tooltip";

interface CharacterItemSlotProps {
  item?: WowItem;
  fallback: string;
}

const CharacterItemSlot: React.FC<CharacterItemSlotProps> = ({
  item,
  fallback,
}) => {
  return (
    <div className="relative flex justify-center">
      <div>
        {item ? (
          <TooltipWowItem item={item} fallback={fallback} />
        ) : (
          <img
            src={`/icons/gear/${fallback}.webp`}
            alt={fallback}
            className={`w-[56px] h-[56px] object-contain rounded-lg shadow-sm border-4 border-transparent`}
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
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4">
        {/* Left Side Equipment */}
        <div className="grid grid-cols-5 sm:flex flex-col flex-wrap gap-4 sm:order-none order-1">
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

        {/* Character Stats */}
        <div className="flex flex-col sm:col-span-2 order-3 sm:order-none sm:grid grid-cols-2 gap-4">
          <CharacterCoreStats stats={char.stats} />
          <CharacterOffensiveStats stats={char.stats} />
          <CharacterDefensiveStats stats={char.stats} />
          <CharacterResourcesStats stats={char.stats} />
          <CharacterResistancesStats stats={char.stats} />
        </div>

        {/* Right Side Equipment */}
        <div className="grid grid-cols-5 sm:flex flex-col flex-wrap gap-4 sm:order-none order-2">
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
