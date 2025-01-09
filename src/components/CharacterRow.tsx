import { CLASS_ICONS, RACE_ICONS } from "../utils/constants";
import React from "react";
import { Character } from "../pages/View";
import LevelCell from "./LevelCell";
import { useState } from "react";
import ExpandedCharacterRow from "./ExpandedCharacterRow";
import OpenRowButton from "./OpenRowButton";

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
        <td className="hidden sm:border border-gray-300 px-4 py-2 align-middle">
          <img
            src={char.avatar}
            alt="Character Avatar"
            className="w-16 h-16 mx-auto"
          />
        </td>
        <td className="border border-gray-300 px-4 py-2">
          <div className="flex justify-between items-center space-x-2">
            <div className="flex space-x-2">
              {/* Left side: Name, Guild, and Realm */}
              <div className="flex flex-col items-start space-y-1">
                {/* Character Name + Guild */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">{char.name}</span>
                  {char.guild && (
                    <span className="text-sm text-gray-500">
                      &lt;{char.guild}&gt;
                    </span>
                  )}
                </div>
                <div className="flex justify-between space-x-2">
                  {/* Realm */}
                  <span className="text-sm text-gray-500">
                    ({char.region.toUpperCase()}) {char.realm}
                  </span>
                </div>
              </div>

              {/* Right side: Icons */}
              <div className="flex items-center space-x-2">
                {char.isSelfFound && (
                  <img
                    src="/icons/ssf.jpg"
                    alt="SSF Icon"
                    className="w-12 h-12"
                  />
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
            {/* Last Logged In*/}
            <div className="hidden sm:flex flex-col text-right text-sm text-gray-500">
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
        <td className="hidden sm:flex border border-gray-300">
          <div className="flex items-center justify-center space-x-2 h-full">
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
      {isOpen && <ExpandedCharacterRow char={char}></ExpandedCharacterRow>}
    </>
  );
};

export default CharacterRow;
