import React from "react";
import {Character} from "../pages/View";
import CharacterRow from "./CharacterRow";

interface CharacterTableProps {
    characters: Character[];
}

const CharacterTable: React.FC<CharacterTableProps> = ({ characters }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-left text-sm text-gray-700">
                <tbody className="divide-y divide-gray-200">
                {characters.map((char, index) => (
                    <CharacterRow char={char} index={index}></CharacterRow>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CharacterTable;
