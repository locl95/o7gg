import React, { useEffect, useState } from "react";
import { BackendError, fetchData } from "../api/data";
import { Link, useParams } from "react-router-dom";
import CharacterTable from "../components/CharacterTable";
import WoWTitle from "../components/ViewName";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Error from "./Error";
import ClassFilter from "../components/ClassFilter";

type SellPrice = {
  readonly header: string;
  readonly gold: string;
  readonly silver: string;
  readonly copper: string;
};

type WeaponStats = {
  readonly damage: string;
  readonly dps: string;
  readonly attackSpeed: string;
};

export class WowItem {
  readonly id: number;
  readonly slot: string;
  readonly quality: string;
  readonly name: string;
  readonly level: number;
  readonly binding: string | undefined;
  readonly requiredLevel: number;
  readonly itemSubclass: string;
  readonly armor: string | undefined;
  readonly stats: string[];
  readonly enchantments: string[];
  readonly spells: string[];
  readonly sellPrice: SellPrice | undefined;
  readonly durability: string | undefined;
  readonly weaponStats: WeaponStats | undefined;
  readonly icon: string | undefined;

  constructor(
    id: number,
    slot: string,
    quality: string,
    name: string,
    level: number,
    binding: string | undefined,
    requiredLevel: number,
    itemSubclass: string,
    armor: string | undefined,
    stats: string[],
    enchantments: string[],
    spells: string[],
    sellPrice: SellPrice | undefined,
    durability: string | undefined,
    weaponStats: WeaponStats | undefined,
    icon: string | undefined
  ) {
    this.id = id;
    this.slot = slot;
    this.quality = quality;
    this.name = name;
    this.level = level;
    this.binding = binding;
    this.requiredLevel = requiredLevel;
    this.itemSubclass = itemSubclass;
    this.armor = armor;
    this.enchantments = enchantments;
    this.stats = stats;
    this.spells = spells;
    this.sellPrice = sellPrice;
    this.durability = durability;
    this.weaponStats = weaponStats;
    this.icon = icon;
  }
}

class WowResource {
  readonly type: string;
  readonly value: number;

  constructor(type: string, value: number) {
    this.type = type;
    this.value = value;
  }
}

class WowWeaponStats {
  readonly minDamage: number;
  readonly maxDamage: number;
  readonly speed: number;
  readonly dps: number;

  constructor(
    minDamage: number,
    maxDamage: number,
    speed: number,
    dps: number
  ) {
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
    this.speed = speed;
    this.dps = dps;
  }
}

class WowResistances {
  readonly fire: number;
  readonly holy: number;
  readonly shadow: number;
  readonly nature: number;
  readonly arcane: number;

  constructor(
    fire: number,
    holy: number,
    shadow: number,
    nature: number,
    arcane: number
  ) {
    this.fire = fire;
    this.holy = holy;
    this.shadow = shadow;
    this.nature = nature;
    this.arcane = arcane;
  }
}

export class WowStats {
  readonly health: number;
  readonly resource: WowResource;
  readonly strength: number;
  readonly agility: number;
  readonly intellect: number;
  readonly stamina: number;
  readonly meleeCrit: number;
  readonly attackPower: number;
  readonly mainHandStats: WowWeaponStats;
  readonly offHandStats: WowWeaponStats;
  readonly spellPower: number;
  readonly spellPenetration: number;
  readonly spellCrit: number;
  readonly manaRegen: number;
  readonly manaRegenCombat: number;
  readonly armor: number;
  readonly dodge: number;
  readonly parry: number;
  readonly block: number;
  readonly rangedCrit: number;
  readonly spirit: number;
  readonly defense: number;
  readonly resistances: WowResistances;

  constructor(
    health: number,
    resource: WowResource,
    strength: number,
    agility: number,
    intellect: number,
    stamina: number,
    meleeCrit: number,
    attackPower: number,
    mainHandStats: WowWeaponStats,
    offHandStats: WowWeaponStats,
    spellPower: number,
    spellPenetration: number,
    spellCrit: number,
    manaRegen: number,
    manaRegenCombat: number,
    armor: number,
    dodge: number,
    parry: number,
    block: number,
    rangedCrit: number,
    spirit: number,
    defense: number,
    resistances: WowResistances
  ) {
    this.health = health;
    this.resource = resource;
    this.strength = strength;
    this.agility = agility;
    this.intellect = intellect;
    this.stamina = stamina;
    this.meleeCrit = meleeCrit;
    this.attackPower = attackPower;
    this.mainHandStats = mainHandStats;
    this.offHandStats = offHandStats;
    this.spellPower = spellPower;
    this.spellPenetration = spellPenetration;
    this.spellCrit = spellCrit;
    this.manaRegen = manaRegen;
    this.manaRegenCombat = manaRegenCombat;
    this.armor = armor;
    this.dodge = dodge;
    this.parry = parry;
    this.block = block;
    this.rangedCrit = rangedCrit;
    this.spirit = spirit;
    this.defense = defense;
    this.resistances = resistances;
  }
}

class WowTalent {
  readonly id: number;
  readonly rank: number;

  constructor(id: number, rank: number) {
    this.id = id;
    this.rank = rank;
  }
}

export class WowSpecialization {
  readonly name: string;
  readonly points: number;
  readonly talents: WowTalent[];

  constructor(name: string, points: number, talents: WowTalent[]) {
    this.name = name;
    this.points = points;
    this.talents = talents;
  }
}

export class WowSpecializations {
  readonly specializations: WowSpecialization[];
  readonly wowHeadEmbeddedTalents: string;

  constructor(
    specializations: WowSpecialization[],
    wowheadEmbeddedTalents: string
  ) {
    this.specializations = specializations;
    this.wowHeadEmbeddedTalents = wowheadEmbeddedTalents;
  }
}

export class Character {
  readonly id: number;
  readonly name: string;
  readonly level: number;
  readonly isDead: boolean;
  readonly isSelfFound: boolean;
  readonly averageItemLevel: number;
  readonly equippedItemLevel: number;
  readonly characterClass: string;
  readonly gender: string;
  readonly race: string;
  readonly realm: string;
  readonly region: string;
  readonly experience: number;
  readonly faction: string;
  readonly items: WowItem[];
  readonly stats: WowStats;
  readonly specializations: WowSpecializations;
  readonly lastLogin: string;
  readonly guild?: string;
  readonly avatar?: string;

  constructor(
    id: number,
    name: string,
    level: number,
    isDead: boolean,
    isSelfFound: boolean,
    averageItemLevel: number,
    equippedItemLevel: number,
    characterClass: string,
    gender: string,
    race: string,
    realm: string,
    region: string,
    experience: number,
    faction: string,
    items: WowItem[],
    stats: WowStats,
    specializations: WowSpecializations,
    lastLogin: string,
    guild?: string,
    avatar?: string
  ) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.isDead = isDead;
    this.isSelfFound = isSelfFound;
    this.averageItemLevel = averageItemLevel;
    this.equippedItemLevel = equippedItemLevel;
    this.characterClass = characterClass;
    this.gender = gender;
    this.race = race;
    this.realm = realm;
    this.region = region;
    this.experience = experience;
    this.faction = faction;
    this.items = items;
    this.stats = stats;
    this.specializations = specializations;
    this.lastLogin = lastLogin;
    this.guild = guild;
    this.avatar = avatar;
  }
}

const View: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [viewName, setViewName] = useState<string | undefined>(undefined);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BackendError>();
  const { viewId } = useParams();

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const dataOrError = await fetchData(viewId!);
      if (dataOrError instanceof BackendError) setError(dataOrError);
      else {
        setViewName(dataOrError.viewName);
        setCharacters(dataOrError.data);
      }
      setLoading(false);
    };

    loadCharacters();
  }, [viewId]);

  if (error) return <Error error={error} />;

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <div className="grid-cols-3 flex-grow">
        {viewName && (
          <div className="flex items-center justify-between p-2 h-20">
            <Link to={"/"} className="h-full">
              <img src="/icons/o7gg.png" alt="o7gg" className="h-16 min-w-16" />
            </Link>
            <WoWTitle
              title={viewName}
              className={"text-4xl sm:text-5xl text-center"}
            />
            <img
              src="/icons/kosgg.jpeg"
              alt="kosgg"
              className="h-16 min-w-16"
            />
          </div>
        )}
        <div className="justify-self-end">
          <ClassFilter onClassSelect={setSelectedClasses} />
        </div>
        <CharacterTable
          characters={characters}
          selectedClasses={selectedClasses}
        />
      </div>
      <Footer />
    </div>
  );
};

export default View;
