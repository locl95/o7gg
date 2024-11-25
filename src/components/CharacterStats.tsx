import React from "react";
import {WowStats} from "../pages/View";

const StatRow: React.FC<{ label: string; value: React.ReactNode }> = ({label, value}) => (
    <div className="flex justify-between mt-1">
        <div className="font-medium">{label}</div>
        <div>{value}</div>
    </div>
);

interface CharacterStatsProps {
    stats: WowStats
}

export const CharacterCoreStats: React.FC<CharacterStatsProps> = ({stats}) => {
    return (
        <div>
            <div className="bg-gray-300 text-black text-lg font-semibold p-2 flex items-center space-x-2">
                <img src="/icons/stats.png" alt="Icon" className="w-5 h-5" />
                <span>Core</span>
            </div>
            <div className="space-y-2">
                <StatRow label={"Strength"} value={stats.strength}/>
                <StatRow label={"Agility"} value={stats.agility}/>
                <StatRow label={"Intellect"} value={stats.intellect}/>
                <StatRow label={"Stamina"} value={stats.stamina}/>
                <StatRow label={"Spirit"} value={stats.spirit}/>
            </div>
        </div>
    )
}

export const CharacterOffensiveStats: React.FC<CharacterStatsProps> = ({stats}) => {
    return (
        <div>
            <div className="bg-gray-300 text-black text-lg font-semibold p-2 flex items-center space-x-2">
                <img src="/icons/sword.png" alt="Icon" className="w-5 h-5" />
                <span>Offensive</span>
            </div>
            <div className="space-y-2">
                <StatRow label={"Attack Power"} value={stats.attackPower}/>
                <StatRow label={"Main Hand DPS"} value={stats.mainHandStats.dps.toFixed(2)}/>
                {stats.offHandStats.dps > 0 &&
                    <StatRow label={"Off Hand DPS"} value={stats.offHandStats.dps.toFixed(2)}/>}
                {stats.spellCrit > 0 &&
                    <StatRow label={"Spell Crit"} value={`${stats.spellCrit.toFixed(2)}%`}/>}
                {stats.meleeCrit > 0 &&
                    <StatRow label={"Melee Crit"} value={`${stats.meleeCrit.toFixed(2)}%`}/>}
                {stats.rangedCrit > 0 &&
                    <StatRow label={"Ranged Crit"} value={`${stats.rangedCrit.toFixed(2)}%`}/>}
                {stats.spellPower > 0 &&
                    <StatRow label={"Spell Power"} value={`${stats.spellPower.toFixed(2)}%`}/>}
            </div>
        </div>
    )
}

export const CharacterDefensiveStats: React.FC<CharacterStatsProps> = ({stats}) => {
    return (
        <div>
            <div className="bg-gray-300 text-black text-lg font-semibold p-2 flex items-center space-x-2">
                <img src="/icons/shield.png" alt="Icon" className="w-5 h-5" />
                <span>Defensive</span>
            </div>
            <div className="space-y-2">
                    <StatRow label={"Defense"} value={stats.defense}/>
                    <StatRow label={"Armor"} value={stats.armor}/>
                    <StatRow label={"Dodge"} value={`${stats.dodge.toFixed(2)}%`}/>
                    <StatRow label={"Parry"} value={`${stats.parry.toFixed(2)}%`}/>
            </div>
        </div>
    )
}

export const CharacterResistancesStats: React.FC<CharacterStatsProps> = ({stats}) => {
    return (
        <div className="col-span-2 w-1/2 m-auto mt-0 ">
            <div className="bg-gray-300 text-black text-lg font-semibold p-2 flex items-center space-x-2">
                <img src="/icons/fire.png" alt="Icon" className="w-5 h-5" />
                <span>Resistances</span>
            </div>
            <div className="space-y-2">
                <StatRow label={"Fire"} value={stats.resistances.fire}/>
                <StatRow label={"Holy"} value={stats.resistances.holy}/>
                <StatRow label={"Shadow"} value={stats.resistances.shadow}/>
                <StatRow label={"Nature"} value={stats.resistances.nature}/>
                <StatRow label={"Arcane"} value={stats.resistances.arcane}/>
            </div>
        </div>
    )
}

export const CharacterResourcesStats: React.FC<CharacterStatsProps> = ({stats}) => {
    return (
        <div>
            <div className="bg-gray-300 text-black text-lg font-semibold p-2 flex items-center space-x-2">
                <img src="/icons/heart.png" alt="Icon" className="w-5 h-5" />
                <span>Resources</span>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between mt-1">
                    <div className="font-medium">Health</div>
                    <div>{stats.health}</div>
                </div>
                <div className="flex justify-between mt-1">
                    <div className="font-medium">{stats.resource.type}</div>
                    <div>{stats.resource.value}</div>
                </div>
                {stats.manaRegen > 0 && <div className="flex justify-between mt-1">
                    <div className="font-medium">Mana Regen</div>
                    <div>{stats.manaRegen}</div>
                </div>}
            </div>
        </div>
    )
}