import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Edit, ArrowLeft, Star } from "lucide-react";
import { getCigarEntry, type CigarEntry } from "../lib/storage";

interface CigarDetailProps {
  entry?: CigarEntry;
}

const CigarDetail = ({ entry: propEntry }: CigarDetailProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = React.useState<CigarEntry | null>(
    propEntry || null,
  );

  React.useEffect(() => {
    if (!propEntry && id) {
      const found = getCigarEntry(id);
      if (found) setEntry(found);
    }
  }, [propEntry, id]);

  if (!entry) {
    return (
      <div className="min-h-screen bg-[#292524] p-6 flex items-center justify-center">
        <p className="text-amber-500">Entry not found</p>
      </div>
    );
  }

  const getAverageRating = (ratings: Record<string, number>) => {
    const values = Object.values(ratings);
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-[#292524] p-6">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-amber-500 hover:text-amber-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
          <Button
            onClick={() => navigate(`/edit/${entry.id}`)}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Entry
          </Button>
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-amber-900 mb-2">
                {entry.basicInfo.brand} {entry.basicInfo.name}
              </h1>
              <p className="text-gray-600">{entry.date.toLocaleDateString()}</p>
            </div>
            <div className="flex items-center bg-amber-100 px-3 py-1 rounded-full">
              <Star className="w-5 h-5 text-amber-600 fill-current" />
              <span className="ml-1 font-semibold text-amber-900">
                {getAverageRating(entry.ratings)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-3">
                Specifications
              </h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Wrapper Type:</dt>
                  <dd className="font-medium">{entry.basicInfo.wrapperType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Binder:</dt>
                  <dd className="font-medium">{entry.basicInfo.binder}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Filler:</dt>
                  <dd className="font-medium">{entry.basicInfo.filler}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Price:</dt>
                  <dd className="font-medium">{entry.basicInfo.price}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Humidity:</dt>
                  <dd className="font-medium">
                    {entry.environmental.humidity}%
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-3">
                Ratings
              </h3>
              <dl className="space-y-2">
                {Object.entries(entry.ratings).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <dt className="text-gray-600 capitalize">{key}:</dt>
                    <dd className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Number(value) ? "text-amber-500 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-amber-900 mb-3">
              Tasting Notes
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {entry.tastingNotes}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CigarDetail;
