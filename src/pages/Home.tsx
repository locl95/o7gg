import { useEffect, useState } from "react";
import { fetchViews } from "../api/data";
import Footer from "../components/Footer";
import WoWTitle from "../components/ViewName";
import ViewsTable from "../components/ViewsTable";
import Loading from "../components/Loading";
import { BackendError } from "../api/data";
import Error from "./Error";

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
  const [error, setError] = useState<BackendError>();

  useEffect(() => {
    const loadViews = async () => {
      setLoading(true);
      const viewsDataOrError = await fetchViews();
      if (viewsDataOrError instanceof BackendError) setError(viewsDataOrError);
      else setViews(viewsDataOrError);
      setLoading(false);
    };

    loadViews();
  }, []);

  if (error) return <Error error={error} />;

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-200 pt-8">
      <div className="flex-grow w-full max-w-7xl flex flex-col mx-auto mb-12 px-4 sm:px-6 lg:px-8">
        <WoWTitle title="o7.gg" className="text-4xl sm:text-5xl" />
        <ViewsTable views={views} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
