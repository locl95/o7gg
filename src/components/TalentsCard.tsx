import React from "react";
import { Character } from "../pages/View";

interface WowHeadTalentsProps {
  char: Character;
  small?: boolean;
}

export const WowHeadTalents: React.FC<WowHeadTalentsProps> = ({
  char,
  small,
}) => {
  return (
    <div
      className={`sm:flex justify-center overflow-x-auto sm:overflow-visible ${
        small ? "h-[430px]" : "h-[530px]"
      }`}
    >
      <iframe
        src={`https://www.wowhead.com/classic/en/talent-calc/embed/${char.characterClass.toLowerCase()}/${
          char.specializations.wowHeadEmbeddedTalents
        }`}
        title="WoW Talent Calculator"
        style={{
          width: "300%",
          maxWidth: "1000px",
        }}
        className="w-[300%] h-full border-0 pointer-events-auto sm:w-full"
        allowFullScreen
      />
    </div>
  );
};
