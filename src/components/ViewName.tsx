import React from 'react';

interface Props {
  title: string;
}

const WoWTitle: React.FC<Props> = ({ title }) => {
  return (
      <h1 className="text-5xl text-center font-wow text-gold text-stroke">{title}</h1>
  );
};

export default WoWTitle;