import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface BasicInfoSectionProps {
  onInfoChange?: (info: BasicInfo) => void;
  initialValues?: BasicInfo;
}

interface BasicInfo {
  brand: string;
  name: string;
  wrapperType: string;
  binder: string;
  filler: string;
  price: string;
}

const defaultValues: BasicInfo = {
  brand: "",
  name: "",
  wrapperType: "maduro",
  binder: "",
  filler: "",
  price: "",
};

const wrapperTypes = [
  "maduro",
  "connecticut",
  "habano",
  "corojo",
  "cameroon",
  "sumatra",
];

const BasicInfoSection = ({
  onInfoChange = () => {},
  initialValues = defaultValues,
}: BasicInfoSectionProps) => {
  const [info, setInfo] = React.useState<BasicInfo>(initialValues);

  const handleChange = (field: keyof BasicInfo, value: string) => {
    const newInfo = { ...info, [field]: value };
    setInfo(newInfo);
    onInfoChange(newInfo);
  };

  return (
    <Card className="p-6 bg-[#1c1917] text-white">
      <h2 className="text-2xl font-semibold mb-6">Basic Cigar Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            placeholder="e.g. Cohiba"
            value={info.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            className="bg-[#292524] border-[#44403c]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Cigar Name</Label>
          <Input
            id="name"
            placeholder="e.g. Behike"
            value={info.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-[#292524] border-[#44403c]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="wrapper-type">Wrapper Type</Label>
          <Select
            value={info.wrapperType}
            onValueChange={(value) => handleChange("wrapperType", value)}
          >
            <SelectTrigger className="bg-[#292524] border-[#44403c]">
              <SelectValue placeholder="Select wrapper type" />
            </SelectTrigger>
            <SelectContent>
              {wrapperTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="binder">Binder</Label>
          <Input
            id="binder"
            placeholder="e.g. Dominican"
            value={info.binder}
            onChange={(e) => handleChange("binder", e.target.value)}
            className="bg-[#292524] border-[#44403c]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="filler">Filler</Label>
          <Input
            id="filler"
            placeholder="e.g. Nicaraguan, Dominican"
            value={info.filler}
            onChange={(e) => handleChange("filler", e.target.value)}
            className="bg-[#292524] border-[#44403c]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="text"
            placeholder="$0.00"
            value={info.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="bg-[#292524] border-[#44403c]"
          />
        </div>
      </div>
    </Card>
  );
};

export default BasicInfoSection;
