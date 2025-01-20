import React from "react";
import { Character } from "../pages/View";
import CharacterRow from "./CharacterRow";

interface CharacterTableProps {
  characters: Character[];
  selectedClasses: string[];
}

const CharacterTable: React.FC<CharacterTableProps> = ({
  characters,
  selectedClasses,
}) => {
  const filteredCharacters =
    selectedClasses.length > 0
      ? characters.filter((char) =>
          selectedClasses.includes(char.characterClass)
        )
      : characters;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm text-gray-700">
        <tbody>
          {filteredCharacters.map((char, index) => (
            <CharacterRow key={char.id} char={char} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
