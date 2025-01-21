import React, { useState, useEffect } from "react";
import AlimentAPI from "../api/alimenteAPI";
import NavBar from "../components/Navbar";
import FridgeWithAlerts from "../components/FridgeWithAlerts";
import AddAliment from "../components/AddAliment";
import FriendGroups from "../components/FriendGroups";
import FriendsList from "../components/FriendsList";
import InviteFriends from "../components/InviteFriends";
import SearchAllUsers from "../components/SearchAllUsers";
import AddFriend from "../components/AddFriend";
import { useUserContext } from "../context/UserContext";

const FridgePage = () => {
  const { user } = useUserContext();
  const [alimente, setAlimente] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [friendsRefreshKey, setFriendsRefreshKey] = useState(0);

  // Fetch alimente and alerts
  const fetchData = async () => {
    try {
      const alimenteData = await AlimentAPI.getAlimenteByUser(user.id);
      setAlimente(alimenteData);

      const alertsData = await AlimentAPI.getAlerts(user.id);
      setAlerts(alertsData.map((alert) => alert.id_aliment));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const handleAddAliment = (newAliment) => {
    // Add new aliment to the state and refetch alerts
    setAlimente((prevAlimente) => [...prevAlimente, newAliment]);
    fetchData();
  };

  const handleToggleDisponibil = async (updatedAliment) => {
    try {
      // Update the aliment's disponibil status in the backend
      const toggledAliment = await AlimentAPI.toggleDisponibil(
        updatedAliment.id_aliment
      );
      // Update the alimente state with the new data
      setAlimente((prevAlimente) =>
        prevAlimente.map((aliment) =>
          aliment.id_aliment === toggledAliment.id_aliment
            ? toggledAliment
            : aliment
        )
      );
      fetchData(); // Refresh alerts and alimente
    } catch (error) {
      console.error("Error toggling disponibil:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <AddAliment userId={user.id} onAdd={handleAddAliment} />
      <FridgeWithAlerts
        alimente={alimente}
        alerts={alerts}
        onToggleDisponibil={handleToggleDisponibil}
      />
      <FriendsList />
      <FriendGroups
        userId={user.id}
        refreshKey={friendsRefreshKey} // Refresh key for FriendGroups
      />
      <InviteFriends userId={user.id} />
      <SearchAllUsers />
      <AddFriend
        userId={user.id}
        onAddComplete={() => setFriendsRefreshKey((prevKey) => prevKey + 1)} // Trigger refresh for FriendGroups
      />
    </div>
  );
};

export default FridgePage;
