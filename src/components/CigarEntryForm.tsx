import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BasicInfoSection from "./BasicInfoSection";
import EnvironmentalSection from "./EnvironmentalSection";
import TastingNotesSection from "./TastingNotesSection";
import RatingDashboard from "./RatingDashboard";
import {
  saveCigarEntry,
  updateCigarEntry,
  getCigarEntry,
  type CigarEntry,
} from "../lib/storage";

interface CigarEntryFormProps {
  onSubmit?: (formData: CigarEntry) => void;
  initialData?: Partial<CigarEntry>;
}

const defaultData: Omit<CigarEntry, "id"> = {
  date: new Date(),
  basicInfo: {
    brand: "",
    name: "",
    wrapperType: "maduro",
    binder: "",
    filler: "",
    price: "",
  },
  environmental: {
    date: new Date(),
    humidity: 65,
  },
  tastingNotes: "",
  ratings: {
    taste: 3,
    construction: 3,
    value: 3,
    bandAesthetics: 3,
  },
};

const CigarEntryForm = ({
  onSubmit = () => {},
  initialData = defaultData,
}: CigarEntryFormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<typeof defaultData>(
    initialData as typeof defaultData,
  );

  React.useEffect(() => {
    if (id) {
      const entry = getCigarEntry(id);
      if (entry) {
        const { id: _, ...data } = entry;
        setFormData(data);
      }
    }
  }, [id]);

  const handleBasicInfoChange = (basicInfo: typeof defaultData.basicInfo) => {
    setFormData((prev) => ({ ...prev, basicInfo }));
  };

  const handleEnvironmentalChange = (
    field: keyof typeof defaultData.environmental,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      environmental: { ...prev.environmental, [field]: value },
    }));
  };

  const handleTastingNotesChange = (notes: string) => {
    setFormData((prev) => ({ ...prev, tastingNotes: notes }));
  };

  const handleRatingChange = (
    type: keyof typeof defaultData.ratings,
    value: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [type]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateCigarEntry(id, formData);
    } else {
      saveCigarEntry(formData);
    }
    onSubmit(formData as CigarEntry);
    navigate("/");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-[#1c1917] text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-3xl font-bold text-amber-500 mb-8">
          Cigar Tasting Entry
        </h1>

        <BasicInfoSection
          onInfoChange={handleBasicInfoChange}
          initialValues={formData.basicInfo}
        />

        <EnvironmentalSection
          date={formData.environmental.date}
          humidity={formData.environmental.humidity}
          onDateChange={(date) => handleEnvironmentalChange("date", date)}
          onHumidityChange={(humidity) =>
            handleEnvironmentalChange("humidity", humidity)
          }
        />

        <TastingNotesSection
          notes={formData.tastingNotes}
          onChange={handleTastingNotesChange}
        />

        <RatingDashboard
          taste={formData.ratings.taste}
          construction={formData.ratings.construction}
          value={formData.ratings.value}
          bandAesthetics={formData.ratings.bandAesthetics}
          onRatingChange={handleRatingChange}
        />

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Entry
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CigarEntryForm;
