import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white text-center py-4 space-y-2">
            <p>
                <a
                    href="https://ko-fi.com/Q5Q815ZBU4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                >
                    <img
                        src="/icons/kofi.svg"
                        alt="Buy Me a Coffee at ko-fi.com"
                        className="h-5 w-5"
                    />
                    <span>Fuel up the squad with sushi</span>
                </a>
            </p>
            <p>2024 o7.gg © All rights reserved.</p>
            <p>
                Made by <a href="https://kos.gg" className="text-blue-400 hover:underline">kos.gg</a>
            </p>
        </footer>
    );
};

export default Footer;