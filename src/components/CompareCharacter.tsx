import { Character } from "../pages/View";
import { CLASS_ICONS, RACE_ICONS } from "../utils/constants";
import CharacterItemGrid from "./CharacterItemGrid";
import Footer from "./Footer";
import { WowHeadTalents } from "./TalentsCard";

const CompareCharacter: React.FC<{
  characters: Character[];
  onClose: () => void;
}> = ({ characters, onClose }) => {
  if (characters.length !== 2) return null;

  const [char1, char2] = characters;

  const CompareStatRow = (
    statName: string,
    value1: string | number,
    value2: string | number
  ) => {
    const getComparisonClass = (v1: number, v2: number) =>
      v1 > v2
        ? "text-green-500 font-bold"
        : v1 < v2
        ? "text-red-500 font-bold"
        : "text-gray-700";

    const num1 = typeof value1 === "string" ? parseFloat(value1) : value1;
    const num2 = typeof value2 === "string" ? parseFloat(value2) : value2;

    return (
      <div className="grid grid-cols-3 text-center">
        <div className={getComparisonClass(num1, num2)}>{value1}</div>
        <div className="text-gray-700">{statName}</div>
        <div className={getComparisonClass(num2, num1)}>{value2}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="m-4 bg-white shadow-md rounded-lg relative">
        <button
          className="absolute top-3 right-4 bg-red-500 text-white px-3 py-1 rounded"
          onClick={onClose}
        >
          Close
        </button>

        <h2 className="bg-gray-600 text-white text-lg font-semibold p-4 flex justify-between items-center mb-4">
          Character Comparison
        </h2>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold col-span-3">{char1.name}</h3>
            <div className="flex justify-center items-center">
              <img
                src={char1.avatar}
                alt="Character Avatar"
                className="w-16 h-16 m-2 rounded"
              />
              <img
                src={CLASS_ICONS[char1.characterClass]}
                alt={char1.characterClass}
                className="w-12 h-12"
              />
              <img
                src={RACE_ICONS[char1.race]}
                alt={char1.race}
                className="w-12 h-12"
              />
            </div>
          </div>
          <div className="flex flex-col row-span-3 justify-center">
            {CompareStatRow(
              "Strength",
              char1.stats.strength,
              char2.stats.strength
            )}
            {CompareStatRow(
              "Agility",
              char1.stats.agility,
              char2.stats.agility
            )}
            {CompareStatRow(
              "Intellect",
              char1.stats.intellect,
              char2.stats.intellect
            )}
            {CompareStatRow(
              "Stamina",
              char1.stats.stamina,
              char2.stats.stamina
            )}
            {CompareStatRow("Spirit", char1.stats.spirit, char2.stats.spirit)}
            <br />
            {CompareStatRow(
              "Attack Power",
              char1.stats.attackPower,
              char2.stats.attackPower
            )}
            {CompareStatRow(
              "Main Hand DPS",
              char1.stats.mainHandStats.dps.toFixed(2),
              char2.stats.mainHandStats.dps.toFixed(2)
            )}
            {CompareStatRow(
              "Off Hand DPS",
              char1.stats.offHandStats.dps.toFixed(2),
              char2.stats.offHandStats.dps.toFixed(2)
            )}
            {CompareStatRow(
              "Spell Crit",
              char1.stats.spellCrit.toFixed(2),
              char2.stats.spellCrit.toFixed(2)
            )}
            {CompareStatRow(
              "Melee Crit",
              `${char1.stats.meleeCrit.toFixed(2)}%`,
              `${char2.stats.meleeCrit.toFixed(2)}%`
            )}
            {CompareStatRow(
              "Ranged Crit",
              `${char1.stats.rangedCrit.toFixed(2)}%`,
              `${char2.stats.rangedCrit.toFixed(2)}%`
            )}
            <br />
            {CompareStatRow(
              "Defense",
              char1.stats.defense,
              char2.stats.defense
            )}
            {CompareStatRow("Armor", char1.stats.armor, char2.stats.armor)}
            {CompareStatRow(
              "Dodge",
              `${char1.stats.dodge.toFixed(2)}%`,
              `${char2.stats.dodge.toFixed(2)}%`
            )}
            {CompareStatRow(
              "Parry",
              `${char1.stats.parry.toFixed(2)}%`,
              `${char2.stats.parry.toFixed(2)}%`
            )}
            <br />
            {CompareStatRow("Health", char1.stats.health, char2.stats.health)}
            {CompareStatRow(
              "Mana",
              char1.stats.resource.value,
              char2.stats.resource.value
            )}
            {CompareStatRow(
              "Mana Regen",
              char1.stats.manaRegen,
              char2.stats.manaRegen
            )}
            <br />
            {CompareStatRow(
              "Fire Resistance",
              char1.stats.resistances.fire,
              char2.stats.resistances.fire
            )}
            {CompareStatRow(
              "Holy Resistance",
              char1.stats.resistances.holy,
              char2.stats.resistances.holy
            )}
            {CompareStatRow(
              "Shadow Resistance",
              char1.stats.resistances.shadow,
              char2.stats.resistances.shadow
            )}
            {CompareStatRow(
              "Nature Resistance",
              char1.stats.resistances.nature,
              char2.stats.resistances.nature
            )}
            {CompareStatRow(
              "Arcane Resistance",
              char1.stats.resistances.arcane,
              char2.stats.resistances.arcane
            )}
            <br />
          </div>
          <div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold col-span-3">{char2.name}</h3>
              <div className="flex justify-center items-center">
                <img
                  src={char2.avatar}
                  alt="Character Avatar"
                  className="w-16 h-16 m-2 rounded"
                />
                <img
                  src={CLASS_ICONS[char2.characterClass]}
                  alt={char2.characterClass}
                  className="w-12 h-12"
                />
                <img
                  src={RACE_ICONS[char2.race]}
                  alt={char2.race}
                  className="w-12 h-12"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <CharacterItemGrid char={char1} showStats={false} />
          </div>
          <div className="flex justify-center">
            <CharacterItemGrid char={char2} showStats={false} />
          </div>
          <div>
            <WowHeadTalents char={char1} small={true} />
          </div>
          <div>
            <WowHeadTalents char={char2} small={true} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompareCharacter;
