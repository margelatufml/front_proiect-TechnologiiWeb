import React, { useEffect, useState } from "react";
import AlimentAPI from "../api/alimenteAPI";

const AlimenteList = () => {
  const [alimente, setAlimente] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AlimentAPI.getAllAlimente();
        setAlimente(data);
      } catch (error) {
        console.error("Error fetching alimente:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-base-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">Alimente List</h1>

      <ul className="list-disc list-inside">
        {alimente.map((aliment) => (
          <li key={aliment.id_aliment} className="p-2">
            {aliment.continut}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlimenteList;
