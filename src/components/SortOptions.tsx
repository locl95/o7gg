import { useState } from "react";

interface SortOptionsProps {
  onSortChange: (sortBy: string | null) => void;
  keys: string[];
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSortChange, keys }) => {
  const [activeSort, setActiveSort] = useState<string | null>(null);

  const handleSort = (key: string) => {
    setActiveSort((prev) => (prev === key ? null : key));
    onSortChange(activeSort === key ? null : key);
  };

  return (
    <div className="flex gap-2 mx-2 my-2">
      {keys.map((key) => (
        <div key={key} onClick={() => handleSort(key)}></div>
      ))}
    </div>
  );
};

export default SortOptions;
