import { ChangeEvent } from "react";

interface SearchNameProps {
  setSearchQuery: (query: string) => void;
}

const SearchName: React.FC<SearchNameProps> = ({ setSearchQuery }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative flex h-full content-center">
      <input
        className="m-2 px-2 w-72 h-8 border border-gray-300"
        type="text"
        onChange={handleInputChange}
        placeholder="Search character..."
      />
    </div>
  );
};

export default SearchName;
