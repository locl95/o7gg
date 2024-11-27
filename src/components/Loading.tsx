import Footer from "./Footer";
import LoadingSpinner from "./LoadingSpinner";

const Loading = () => (
    <div className="flex flex-col min-h-screen bg-gray-200">
        <div className="flex-grow flex items-center justify-center">
            <LoadingSpinner />
        </div>
        <Footer />
    </div>
);

export default Loading;