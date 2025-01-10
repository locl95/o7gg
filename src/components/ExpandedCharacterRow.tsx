import React from "react";
import { Character } from "../pages/View";
import CharacterItemGrid from "./CharacterItemGrid";
import { WowHeadTalents } from "./TalentsCard";
import { CLASS_ICONS, RACE_ICONS } from "../utils/constants";

interface ExpandedCharacterRowProps {
  char: Character;
}

const ExpandedCharacterRow: React.FC<ExpandedCharacterRowProps> = ({
  char,
}) => {
  return (
    <tr className="bg-gray-100 transition-all duration-300 ease-in-out">
      <td colSpan={6} className="border border-gray-300 pl-4 pr-8 py-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white shadow-md rounded-lg">
            <div>
              <div className="bg-gray-600 text-white text-lg font-semibold p-4 flex justify-between items-center">
                <div>Gear</div>
                <div className="flex space-x-2">
                  <span className="bg-gray-300 text-black text-xs px-2 py-1 rounded-lg flex flex-col items-center space-y-1">
                    <span> Item Level {char.equippedItemLevel} </span>
                  </span>
                </div>
              </div>
            </div>
            <CharacterItemGrid char={char} />
          </div>

          <div className="bg-white shadow-md rounded-lg">
            <div className="bg-gray-600 text-white text-lg font-semibold p-4">
              Talents
            </div>
            <div className="space-y-2 p-2">
              {/* eslint-disable-next-line react/jsx-no-undef */}
              <WowHeadTalents char={char} />
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ExpandedCharacterRow;
