import React from "react";
import {Character} from "../pages/View";

interface WowHeadTalentsProps {
    char: Character
}

export const WowHeadTalents: React.FC<WowHeadTalentsProps> = ({char}) => {
    return (
        <div className="relative w-full h-[600px]">
            <iframe
                src={`https://www.wowhead.com/classic/en/talent-calc/embed/${char.characterClass.toLowerCase()}/${char.specializations.wowHeadEmbeddedTalents}`}
                title="WoW Talent Calculator"
                className="w-full h-full border-0"
                allowFullScreen
            />
        </div>
    );
};