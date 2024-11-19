import React from "react";
import {Character, WowItem} from "../pages/View";
import {
    CharacterCoreStats,
    CharacterDefensiveStats,
    CharacterOffensiveStats,
    CharacterResistancesStats, CharacterResourcesStats
} from "./CharacterStats";


interface CharacterItemSlotProps {
    item?: WowItem
    fallback: string
}

const CharacterItemSlot: React.FC<CharacterItemSlotProps> = ({item, fallback}) => {
    const qualityBorderColor: { [key: string]: string } = {
        POOR: "border-gray-500",
        COMMON: "border-white",
        UNCOMMON: "border-green-500",
        RARE: "border-blue-500",
        EPIC: "border-purple-500",
        LEGENDARY: "border-orange-500",
    };

    const borderColor = item ? qualityBorderColor[item.quality] || "border-transparent" : "border-transparent";


    return (
        <div className="flex justify-center items-center">
            <img
                src={item ? item.icon : `/icons/gear/${fallback}.webp`}
                alt={item ? item.name : fallback}
                className={`w-[56px] h-[56px] object-contain rounded-lg shadow-sm border-4 ${borderColor}`}
            />
        </div>
    )
}


interface CharacterItemGridProps {
    char: Character
}

const CharacterItemGrid: React.FC<CharacterItemGridProps> = ({char}) => {
    return (
        <>
            <div className="grid grid-cols-4 gap-4 p-4">
                <div className="flex flex-col space-y-4">
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Head")} fallback={"head"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Neck")} fallback={"neck"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Shoulders")}
                                       fallback={"shoulders"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Back")} fallback={"back"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Chest")} fallback={"chest"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Shirt")} fallback={"shirt"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Tabard")} fallback={"tabard"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Wrist")} fallback={"wrist"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Main Hand")} fallback={"mainhand"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Offhand")} fallback={"offhand"}/>
                </div>

                <div className="col-span-2 grid grid-rows-3 grid-cols-2 gap-2">
                    <CharacterCoreStats stats={char.stats}/>
                    <CharacterOffensiveStats stats={char.stats}/>
                    <CharacterDefensiveStats stats={char.stats}/>
                    <CharacterResourcesStats stats={char.stats}/>
                    <CharacterResistancesStats stats={char.stats}/>
                </div>

                <div className="flex flex-col space-y-4">
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Hands")}
                                       fallback={"hands"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Waist")}
                                       fallback={"waist"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Legs")} fallback={"legs"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Feet")} fallback={"feet"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Ring 1")}
                                       fallback={"finger"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Ring 2")}
                                       fallback={"finger"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Trinket 1")}
                                       fallback={"trinket"}/>
                    <CharacterItemSlot item={char.items.find(item => item.slot === "Trinket 2")}
                                       fallback={"trinket"}/>
                    <div className="row-span-2">
                        <CharacterItemSlot item={char.items.find(item => item.slot === "Ranged")}
                                           fallback={"ranged"}/>
                    </div>
                </div>
            </div>
        </>
    );
};


export default CharacterItemGrid