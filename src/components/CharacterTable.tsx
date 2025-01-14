import React from "react";
import { Character } from "../pages/View";
import CharacterRow from "./CharacterRow";

interface CharacterTableProps {
  characters: Character[];
}

const CharacterTable: React.FC<CharacterTableProps> = ({ characters }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm text-gray-700">
        <tbody>
          {characters.map((char, index) => (
            <CharacterRow char={char} index={index}></CharacterRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
