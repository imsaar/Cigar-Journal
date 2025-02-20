import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface TastingNotesSectionProps {
  notes?: string;
  onChange?: (notes: string) => void;
}

const TastingNotesSection = ({
  notes = "Initial light reveals notes of cedar and leather, developing into a complex profile of toasted almonds and dark chocolate...",
  onChange = () => {},
}: TastingNotesSectionProps) => {
  return (
    <Card className="w-full p-6 bg-white shadow-md">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="tasting-notes"
            className="text-lg font-semibold text-gray-900"
          >
            Tasting Notes
          </Label>
        </div>

        <Textarea
          id="tasting-notes"
          placeholder="Describe the flavors, aromas, and evolution of the cigar throughout your smoking experience..."
          className="min-h-[150px] w-full resize-none border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          value={notes}
          onChange={(e) => onChange(e.target.value)}
        />

        <div className="text-sm text-gray-500">
          Describe the progression of flavors, intensity, and any unique
          characteristics you notice.
        </div>
      </div>
    </Card>
  );
};

export default TastingNotesSection;
