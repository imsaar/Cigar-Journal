import React from "react";
import CigarEntryForm from "./CigarEntryForm";

interface HomeProps {
  onSave?: (data: any) => void;
}

const Home = ({ onSave = () => {} }: HomeProps) => {
  return (
    <div className="min-h-screen bg-[#292524] p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-amber-500 mb-2">
            Cigar Tasting Journal
          </h1>
          <p className="text-amber-200">
            Document your cigar experiences with detailed notes and ratings
          </p>
        </header>

        <CigarEntryForm onSubmit={onSave} />
      </div>
    </div>
  );
};

export default Home;
