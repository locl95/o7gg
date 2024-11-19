import React from "react";

interface OpenRowButtonProps {
    isOpen: boolean
}

const OpenRowButton: React.FC<OpenRowButtonProps> = ({isOpen}) => {
    return (<td className="border border-gray-300 px-4 py-2 text-center">
        <button
            className="focus:outline-none"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>
    </td>)
}

export default OpenRowButton