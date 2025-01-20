import { useState } from "react";
import { CLASS_ICONS } from "../utils/constants";

interface ClassFilterProps {
  onClassSelect: (selectedClasses: string[]) => void;
}

const ClassFilter: React.FC<ClassFilterProps> = ({ onClassSelect }) => {
  const classList = [
    "Warrior",
    "Paladin",
    "Hunter",
    "Rogue",
    "Priest",
    "Shaman",
    "Mage",
    "Warlock",
    "Druid",
  ];

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const toggleFilter = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((cls) => cls !== className)
        : [...prev, className]
    );
    onClassSelect(
      selectedClasses.includes(className)
        ? selectedClasses.filter((cls) => cls !== className)
        : [...selectedClasses, className]
    );
  };

  return (
    <div>
      <div className="flex gap-1 mx-2 my-2">
        {classList.map((className) => (
          <img
            key={className}
            src={CLASS_ICONS[className]}
            alt={className}
            className={
              selectedClasses.includes(className)
                ? "w-8 h-8"
                : "w-8 h-8 filter grayscale opacity-50"
            }
            onClick={() => toggleFilter(className)}
            role="button"
          />
        ))}
      </div>
    </div>
  );
};

export default ClassFilter;
