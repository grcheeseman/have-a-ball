import React from "react";
import KnitterCollection from "./KnitterCollection";
import { useState, useEffect } from "react";
import Search from "./Search";

function KnittersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [knitters, setKnitters] = useState([]);

  useEffect(() => {
    fetch("/api/knitters")
      .then((resp) => resp.json())
      .then((knitters) => setKnitters(knitters));
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    setSearchTerm(e.target.searchTerm.value);
  }

  return (
    <>
      <div className="flex justify-center ">
        <Search handleSearch={handleSearch} />
      </div>
      <div className="flex justify-center product-page 5 bg-yellow-50">
        <div className="max-w-4xl p-10">
          <KnitterCollection knitters={knitters} searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
}

export default KnittersPage;
