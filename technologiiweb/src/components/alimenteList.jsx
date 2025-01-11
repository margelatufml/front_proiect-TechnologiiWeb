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
    <div>
      <h1>Alimente List</h1>
      <ul>
        {alimente.map((aliment) => (
          <li key={aliment.id_aliment}>{aliment.continut}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlimenteList;
