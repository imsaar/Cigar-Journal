import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface RatingDashboardProps {
  taste?: number;
  construction?: number;
  value?: number;
  bandAesthetics?: number;
  onRatingChange?: (type: string, value: number) => void;
}

const RatingDashboard = ({
  taste = 3,
  construction = 3,
  value = 3,
  bandAesthetics = 3,
  onRatingChange = () => {},
}: RatingDashboardProps) => {
  return (
    <Card className="w-full p-6 bg-white">
      <h3 className="text-xl font-semibold mb-4 text-amber-900">
        Rating Dashboard
      </h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="taste" className="text-amber-800">
            Taste
          </Label>
          <Slider
            id="taste"
            min={1}
            max={5}
            step={1}
            value={[taste]}
            onValueChange={(value) => onRatingChange("taste", value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-amber-700">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="construction" className="text-amber-800">
            Construction
          </Label>
          <Slider
            id="construction"
            min={1}
            max={5}
            step={1}
            value={[construction]}
            onValueChange={(value) => onRatingChange("construction", value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-amber-700">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="value" className="text-amber-800">
            Value
          </Label>
          <Slider
            id="value"
            min={1}
            max={5}
            step={1}
            value={[value]}
            onValueChange={(value) => onRatingChange("value", value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-amber-700">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bandAesthetics" className="text-amber-800">
            Band Aesthetics
          </Label>
          <Slider
            id="bandAesthetics"
            min={1}
            max={5}
            step={1}
            value={[bandAesthetics]}
            onValueChange={(value) =>
              onRatingChange("bandAesthetics", value[0])
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-amber-700">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RatingDashboard;
