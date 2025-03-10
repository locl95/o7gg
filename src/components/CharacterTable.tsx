import React, { useState } from "react";
import { Character } from "../pages/View";
import CharacterRow from "./CharacterRow";

interface CharacterTableProps {
  characters: Character[];
  selectedClasses: string[];
  onCompare: (selectedCharacters: Character[]) => void;
}

const CharacterTable: React.FC<CharacterTableProps> = ({
  characters,
  selectedClasses,
  onCompare,
}) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const toggleSelection = (char: Character) => {
    setSelectedCharacters((prev) => {
      if (prev.includes(char)) {
        return prev.filter((c) => c.id !== char.id);
      }
      if (prev.length < 2) {
        return [...prev, char];
      }
      return prev;
    });
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
        : sortBy === "lastLogin"
        ? new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime()
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
            {["lastLogin", "class", "level"].map((key) => (
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
            <CharacterRow
              key={char.id}
              char={char}
              index={index}
              isSelecting={isSelecting}
              isSelected={selectedCharacters.includes(char)}
              onSelect={toggleSelection}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center m-2 gap-2 align-center">
        <button
          onClick={() => {
            setIsSelecting((prev) => !prev);
            setSelectedCharacters([]);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isSelecting ? "Cancel" : "Compare Characters"}
        </button>
        {isSelecting && selectedCharacters.length === 2 && (
          <button
            onClick={() => onCompare(selectedCharacters)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Compare
          </button>
        )}
      </div>
    </div>
  );
};

export default CharacterTable;
