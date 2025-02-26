import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Edit, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCigarEntries, type CigarEntry } from "../lib/storage";

interface CigarListProps {
  entries?: CigarEntry[];
}

const CigarList = ({ entries: propEntries }: CigarListProps) => {
  const navigate = useNavigate();
  const [entries, setEntries] = React.useState<CigarEntry[]>([]);

  // Refresh entries when component mounts or location changes
  const refreshEntries = React.useCallback(() => {
    if (propEntries) {
      setEntries(propEntries);
    } else {
      setEntries(getCigarEntries());
    }
  }, [propEntries]);

  React.useEffect(() => {
    refreshEntries();
  }, [refreshEntries]);

  // Also refresh when the component becomes visible
  React.useEffect(() => {
    const handleFocus = () => refreshEntries();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refreshEntries]);

  const getAverageRating = (ratings: CigarEntry["ratings"]) => {
    const values = Object.values(ratings);
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-500">My Cigar Journal</h1>
        <Button
          onClick={() => navigate("/new")}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          Add New Entry
        </Button>
      </div>

      <div className="grid gap-4">
        {entries.map((entry) => (
          <Card
            key={entry.id}
            className="p-4 bg-white hover:bg-amber-50 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div
                className="flex-1"
                onClick={() => navigate(`/entry/${entry.id}`)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-amber-900">
                    {entry.basicInfo.brand} {entry.basicInfo.name}
                  </h3>
                  <div className="flex items-center text-amber-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1">
                      {getAverageRating(entry.ratings)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {entry.date.toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit/${entry.id}`);
                }}
                className="text-amber-600 hover:text-amber-700 hover:bg-amber-100"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CigarList;
