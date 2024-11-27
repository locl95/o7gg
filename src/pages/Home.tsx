import { useEffect, useState } from "react";
import { fetchViews } from "../api/data";
import Footer from "../components/Footer";
import WoWTitle from "../components/ViewName";
import ViewsTable from "../components/ViewsTable";
import LoadingSpinner from "../components/LoadingSpinner";
import Loading from "../components/Loading";

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
    return <Loading />
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