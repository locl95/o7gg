import React from "react";

interface Props {
  title: string;
  className: string;
}

const WoWTitle: React.FC<Props> = ({ title, className }) => {
  return (
    <h1 className={`text-5xl font-wow text-gold text-stroke ${className}`}>
      {title}
    </h1>
  );
};

export default WoWTitle;
