import { Character } from "../pages/View";
import React from "react";
import { LEVEL_XP_MAP } from "../utils/constants";

interface LevelCellProps {
  char: Character;
  index: number;
}

const LevelCell: React.FC<LevelCellProps> = ({ char }) => {
  const requiredExpToLevelUp = LEVEL_XP_MAP[char.level] || 0;

  const progress = (char.experience / requiredExpToLevelUp) * 100;
  if (char.level < 60)
    return (
      <td className="min-w-24 border border-gray-300 px-4 py-2">
        <div className="flex flex-col items-start">
          <div className="text-sm font-semibold">{`Level ${char.level}`}</div>
          <div className="text-xs text-gray-500">{`${char.experience} / ${requiredExpToLevelUp} XP`}</div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(to bottom, #750970 50%, #4c0949 50%)",
              }}
            ></div>
          </div>
        </div>
      </td>
    );
  else
    return (
      <td className="border border-gray-300 px-4 py-2">
        <div className="flex flex-col items-start">
          <div className="text-sm font-semibold">{`Level ${char.level}`}</div>
        </div>
      </td>
    );
};

export default LevelCell;
