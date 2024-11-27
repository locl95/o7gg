import { useEffect, useState } from "react";
import { fetchViews } from "../api/data";
import Footer from "../components/Footer";
import WoWTitle from "../components/ViewName";
import ViewsTable from "../components/ViewsTable";

export interface View {
    characterIds: number[];
    game: string;
    id: string;
    name: string;
    owner: string;
    published: boolean;
  }

const Home: React.FC = () => {
  const [views, setViews] = useState<View[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
          setViews(viewsData);
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
  }, []);


  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-200">
          <div className="flex-grow flex items-center justify-center">
              <LoadingSpinner />
          </div>
          <Footer />
      </div>
  );
  }

  if (error) {
    return <>{error}</>
  }

  console.log(views)

    return (
        <div className="flex flex-col justifiy-between min-h-screen bg-gray-200 pt-8">
          <div className="flex-grow w-full max-w-7xl flex flex-col mx-auto mb-12" >
            <WoWTitle title="o7.gg" />
            <ViewsTable views={views} />
          </div>
          <Footer />
        </div>
    )
}

export default Home;