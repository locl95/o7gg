import React, { useState } from "react";
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
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const filteredCharacters =
    selectedClasses.length > 0
      ? characters.filter((char) =>
          selectedClasses.includes(char.characterClass)
        )
      : characters;

  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    if (!sortBy) return 0;

    const result =
      sortBy === "class"
        ? a.characterClass.localeCompare(b.characterClass)
        : sortBy === "name"
        ? a.name.localeCompare(b.name)
        : sortBy === "level"
        ? a.level - b.level
        : 0;

    return sortOrder === "asc" ? result : -result;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm text-gray-700">
        <thead className="bg-gray-100 border border-gray-300">
          <tr>
            <th />
            {["name", "class", "level"].map((key) => (
              <th
                key={key}
                className="text-right px-2 cursor-pointer border border-gray-300"
                onClick={() => handleSort(key)}
              >
                <span
                  className={`text-lg ${
                    sortBy === key ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {sortBy === key && sortOrder === "asc" ? "⏶" : "⏷"}
                </span>
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {sortedCharacters.map((char, index) => (
            <CharacterRow key={char.id} char={char} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
