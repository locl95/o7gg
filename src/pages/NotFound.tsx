import Footer from "../components/Footer";

interface NotFoundProps {
    error: string;
}

const NotFound: React.FC<NotFoundProps> = ({error}) => {

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <div className="flex-grow flex items-center justify-center">
                {error}
            </div>
            <Footer />
        </div>
    )
}

export default NotFound;