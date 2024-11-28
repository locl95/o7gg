import { BackendError } from "../api/data";
import Footer from "../components/Footer";

interface ErrorProps {
  error: BackendError;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <div className="flex-grow flex items-center justify-center">
        {error.error}
      </div>
      <Footer />
    </div>
  );
};

export default Error;
