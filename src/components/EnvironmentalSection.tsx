import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface EnvironmentalSectionProps {
  date?: Date;
  humidity?: number;
  onDateChange?: (date: Date) => void;
  onHumidityChange?: (humidity: number) => void;
}

const EnvironmentalSection = ({
  date = new Date(),
  humidity = 65,
  onDateChange = () => {},
  onHumidityChange = () => {},
}: EnvironmentalSectionProps) => {
  return (
    <Card className="w-full p-6 bg-white">
      <h3 className="text-xl font-semibold mb-4 text-amber-900">
        Environmental Factors
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-amber-800">
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-white hover:bg-amber-50"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && onDateChange(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="humidity" className="text-amber-800">
            Humidity Level (%)
          </Label>
          <Input
            id="humidity"
            type="number"
            min="0"
            max="100"
            value={humidity}
            onChange={(e) => onHumidityChange(Number(e.target.value))}
            className="bg-white border-amber-200 focus:border-amber-400"
          />
        </div>
      </div>
    </Card>
  );
};

export default EnvironmentalSection;
