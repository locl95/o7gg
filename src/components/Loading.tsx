import Footer from "./Footer";

export const LoadingSpinner = () => (
    <div className="flex justify-center items-center relative">
        {/* Spinner */}
        <div className="w-64 h-64 border-8 border-t-8 border-gray-200 border-solid rounded-full animate-spin border-t-red-500"></div>

        {/* Spinning text */}
        <div className="absolute text-center text-2xl text-red-500 font-bold animate-[spin_3s_linear_infinite]">
            o7
        </div>
    </div>
);

const Loading = () => (
    <div className="flex flex-col min-h-screen bg-gray-200">
        <div className="flex-grow flex items-center justify-center">
            <LoadingSpinner />
        </div>
        <Footer />
    </div>
);

export default Loading;