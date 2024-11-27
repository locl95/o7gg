import { useEffect, useState } from "react";
import { fetchViews } from "../api/data";
import Footer from "../components/Footer";

interface View {
    characterIds: number[];
    game: string;
    id: string;
    name: string;
    owner: string;
    published: boolean;
  }

const Home: React.FC = () => {
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const owner = 'weewee';

  const LoadingSpinner = () => (
      <div className="flex justify-center items-center relative">
          {/* Spinner */}
          <div className="w-64 h-64 border-8 border-t-8 border-gray-200 border-solid rounded-full animate-spin border-t-red-500"></div>

          {/* Spinning text */}
          <div className="absolute text-center text-2xl text-red-500 font-bold animate-[spin_3s_linear_infinite]">
              o7
          </div>
      </div>
  );

  useEffect(() => {
    const loadViews = async () => {
      setLoading(true);
      try {
        const viewsData = await fetchViews();
        if (viewsData) {
          const filteredViews = viewsData.filter((view: { owner: string; }) => view.owner === owner);
          setViews(filteredViews);
        } else {
          setError('Failed to load views');
        }
      } catch (error) {
        setError('Failed to load views');
      } finally {
        setLoading(false);
      }
    };
  
    loadViews();
  }, [owner]);


  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <>{error}</>
  }

  console.log(views)

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
          <div className="w-full max-w-7xl flex flex-col mx-auto" >
            <h1 className="text-5xl font-wow text-gold text-stroke">o7.gg</h1>
          </div>
          <Footer />
        </div>
    )
}

export default Home;