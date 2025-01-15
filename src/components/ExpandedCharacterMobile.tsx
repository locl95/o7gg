import { Character } from "../pages/View";
import { CLASS_ICONS, RACE_ICONS } from "../utils/constants";

interface ExpandedCharacterMobileProps {
  char: Character;
}

const ExpandedCharacterMobile: React.FC<ExpandedCharacterMobileProps> = ({
  char,
}) => {
  const rowColor = char.faction === "Horde" ? "bg-red-50" : "bg-blue-50";
  return (
    <tr className={`sm:hidden ${rowColor}`} tabIndex={0}>
      <td colSpan={3} className="flex justify-around p-2">
        <img src={char.avatar} alt="Character Avatar" className="w-16 h-16" />
        <div className="flex items-center gap-2">
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
      <td />
      <td />
    </tr>
  );
};

export default ExpandedCharacterMobile;
