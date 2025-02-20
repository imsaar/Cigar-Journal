import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import CigarList from "./components/CigarList";
import CigarDetail from "./components/CigarDetail";
import CigarEntryForm from "./components/CigarEntryForm";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen bg-[#292524]">
        <Routes>
          <Route path="/" element={<CigarList />} />
          <Route path="/new" element={<Home />} />
          <Route path="/entry/:id" element={<CigarDetail />} />
          <Route path="/edit/:id" element={<CigarEntryForm />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </div>
    </Suspense>
  );
}

export default App;
