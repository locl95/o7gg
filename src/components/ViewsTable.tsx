import { Link } from "react-router-dom";
import { View } from "../pages/Home";

interface ViewTableProps {
    views: View[]
}

const ViewsTable: React.FC<ViewTableProps> = ({views}) => {

    return (
        
        <div className="min-w-full text-left text-sm text-gray-700">
            <h1 className="text-2xl font-bold my-6">All views</h1>
            <div className="">            
                {views.map((view) => (
                    <div key={view.id} className="border rounded border-gray-400 p-2 my-1 bg-gray-300">
                        <Link to={`./${view.id}`}>
                            <h2 className="text-lg font-bold">{view.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewsTable;