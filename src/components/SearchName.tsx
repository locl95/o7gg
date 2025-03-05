import { useState } from "react";
import { Character } from "../pages/View";

interface SearchNameProps {
  characters: Character[];
  onCharacterSelect: (character: Character | undefined) => void;
}

const SearchName: React.FC<SearchNameProps> = ({
  characters,
  onCharacterSelect,
}) => {
  const [inputName, setInputName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Character[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputName(value);

    if (value.length >= 2) {
      const filtered = characters.filter((char) =>
        char.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
      onCharacterSelect(undefined);
    }
  };

  const handleSuggestionClick = (character: Character) => {
    setInputName(character.name);
    setSuggestions([]);
    onCharacterSelect(character);
  };

  const handleEmptySelection = () => {
    setInputName("");
    setSuggestions([]);
    onCharacterSelect(undefined);
  };

  return (
    <div className="relative flex h-full content-center">
      <input
        className="m-2 px-2 w-72 h-8 border border-gray-300"
        type="text"
        onChange={handleInputChange}
        value={inputName}
        placeholder="Search character..."
      />
      {inputName && (
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          onClick={handleEmptySelection}
        >
          ✕
        </button>
      )}
      {suggestions.length > 0 && (
        <div className="absolute bg-white border border-gray-300 w-72 mt-11 ml-2 shadow-md max-h-40 overflow-auto">
          {suggestions.map((char) => (
            <div
              key={char.id}
              className="cursor-pointer px-2 py-1 hover:bg-gray-200"
              onClick={() => handleSuggestionClick(char)}
            >
              {char.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchName;
