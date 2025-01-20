import React from "react";

interface Props {
  title: string;
  className: string;
}

const WoWTitle: React.FC<Props> = ({ title, className }) => {
  return (
    <h1 className={`font-wow text-gold text-stroke-[#000000] ${className}`}>
      {title}
    </h1>
  );
};

export default WoWTitle;
