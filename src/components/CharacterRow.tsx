import { CLASS_ICONS, RACE_ICONS } from "../utils/constants";
import React from "react";
import { Character } from "../pages/View";
import LevelCell from "./LevelCell";
import { useState } from "react";
import ExpandedCharacterRow from "./ExpandedCharacterRow";
import OpenRowButton from "./OpenRowButton";
import ExpandedCharacterMobile from "./ExpandedCharacterMobile";
import { Tooltip } from "./Tooltip";

interface CharacterRowProps {
  char: Character;
  index: number;
}

const CharacterRow: React.FC<CharacterRowProps> = ({ char, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleRow = () => {
    setIsOpen(!isOpen);
  };

  const rowColor = char.faction === "Horde" ? "bg-red-50" : "bg-blue-50";
  return (
    <>
      <tr
        key={char.id}
        className={rowColor}
        onClick={toggleRow}
        tabIndex={0}
        role="button"
      >
        <td className="hidden lg:table-cell border border-gray-300">
          <img
            src={char.avatar}
            alt="Character Avatar"
            className="w-16 h-16 mx-auto"
          />
        </td>
        <td className="border border-gray-300 px-4 py-4">
          <div className="flex justify-between items-center space-x-2">
            <div className="flex space-x-2">
              <div className="flex flex-col items-start space-y-1">
                <div className="flex flex-wrap gap-x-2 items-center">
                  <span className="text-lg font-bold">{char.name}</span>
                  {char.guild && (
                    <span className="text-sm text-gray-500">
                      &lt;{char.guild}&gt;
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <span className="text-sm text-gray-500">
                    ({char.region.toUpperCase()}) {char.realm}
                  </span>
                  <div className="flex md:hidden items-center space-x-2">
                    {char.isSelfFound && (
                      <img
                        src="/icons/ssf.jpg"
                        alt="SSF Icon"
                        className="w-8 h-8"
                      />
                    )}
                    {char.isDead && (
                      <img
                        src="/icons/rip.svg"
                        alt="Tombstone Icon"
                        className="w-8 h-8"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-2">
                {char.isSelfFound && (
                  <Tooltip
                    offset={{ x: 10, y: -40 }}
                    content={
                      <div className="flex flex-col bg-black text-white py-1 px-2 rounded-lg max-w-sm">
                        <span className="text-yellow-400">
                          Self-Found Adventurer
                        </span>
                        <span>
                          Unable to trade, use the auction house, or send and
                          receive most mail
                        </span>
                      </div>
                    }
                  >
                    <img
                      src="/icons/ssf.jpg"
                      alt="SSF Icon"
                      className="w-12 h-12"
                    />
                  </Tooltip>
                )}
                {char.isDead && (
                  <img
                    src="/icons/rip.svg"
                    alt="Tombstone Icon"
                    className="w-12 h-12"
                  />
                )}
              </div>
            </div>
            <div className="hidden lg:flex flex-col text-right text-sm text-gray-500">
              <span>Last logged in</span>
              <span>
                {new Date(char.lastLogin).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
          </div>
        </td>
        <td className="hidden sm:table-cell border border-gray-300">
          <div className="flex items-center justify-center space-x-2">
            <img
              src={CLASS_ICONS[char.characterClass]}
              alt={char.characterClass}
              className="w-12 h-12"
            />
            <img
              src={RACE_ICONS[char.race]}
              alt={char.race}
              className="w-12 h-12"
            />
          </div>
        </td>
        <LevelCell char={char} index={index} />
        <OpenRowButton isOpen={isOpen} />
      </tr>
      {isOpen && <ExpandedCharacterMobile char={char} />}
      {isOpen && <ExpandedCharacterRow char={char} />}
    </>
  );
};

export default CharacterRow;
