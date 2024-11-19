import React, {useEffect, useState} from "react";
import {fetchData} from "../api/data";
import {useParams} from "react-router-dom";
import CharacterTable from "../components/CharacterTable";
import WoWTitle from "../components/ViewName";
import Footer from "../components/Footer";

export class WowItem {
    readonly id: number
    readonly slot: string
    readonly quality: string
    readonly name: string
    readonly icon: string

    constructor(id: number, slot: string, quality: string, name: string, icon: string) {
        this.id = id;
        this.slot = slot;
        this.quality = quality;
        this.name = name;
        this.icon = icon
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

    constructor(minDamage: number, maxDamage: number, speed: number, dps: number) {
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

    constructor(fire: number, holy: number, shadow: number, nature: number, arcane: number) {
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
    readonly specializations: WowSpecialization[]
    readonly wowHeadEmbeddedTalents: string

    constructor(specializations: WowSpecialization[], wowheadEmbeddedTalents: string) {
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
    readonly experience: number;
    readonly faction: string
    readonly items: WowItem[]
    readonly stats: WowStats
    readonly specializations: WowSpecializations
    readonly guild?: string;
    readonly avatar?: string

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
        experience: number,
        faction: string,
        items: WowItem[],
        stats: WowStats,
        specializations: WowSpecializations,
        guild?: string,
        avatar?: string
    ) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.isDead = isDead;
        this.isSelfFound = isSelfFound
        this.averageItemLevel = averageItemLevel;
        this.equippedItemLevel = equippedItemLevel;
        this.characterClass = characterClass;
        this.gender = gender;
        this.race = race;
        this.realm = realm;
        this.experience = experience;
        this.faction = faction;
        this.items = items;
        this.stats = stats;
        this.specializations = specializations;
        this.guild = guild;
        this.avatar = avatar;
    }
}

const View: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [viewName, setViewName] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState(false);
    const {viewId} = useParams();

    const LoadingSpinner = () => (
        <div className="flex justify-center items-center">
            <div
                className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-blue-500"></div>
        </div>
    );

    useEffect(() => {
        const loadCharacters = async () => {
            try {
                setLoading(true)
                const data = await fetchData(viewId!)
                setViewName(data.viewName)
                setCharacters(data.data);
            } catch (error) {
                console.error('Failed to fetch characters', error);
            } finally {
                setLoading(false);
            }
        };

        loadCharacters();
    }, [viewId]);

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <div className="flex-grow">
                {viewName && <WoWTitle title={viewName}/>}
                <CharacterTable characters={characters}></CharacterTable>
            </div>
            <Footer/>
        </div>
    );
}

export default View