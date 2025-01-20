import React, { useState, useEffect } from "react";
import FridgeList from "../components/FridgeList";
import AddAliment from "../components/AddAliment";
import CategoryFilter from "../components/CategoryFilter";
import AlertsList from "../components/Alertsist";
import AlimentAPI from "../api/alimenteAPI";
import NavBar from "../components/Navbar";
import FriendGroups from "../components/FriendGroups";
import InviteFriends from "../components/InviteFriends";
import SearchAllUsers from "../components/SearchAllUsers";
import AddFriend from "../components/AddFriend";
import FoodItemsModal from "../components/FoodItemsModal";

const FridgePage = ({ userId }) => {
  const [alimente, setAlimente] = useState([]);
  const [filteredAlimente, setFilteredAlimente] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAlimente = async () => {
      try {
        const data = await AlimentAPI.getAlimenteByUser(userId);
        setAlimente(data);
        setFilteredAlimente(data);
      } catch (error) {
        console.error("Error fetching alimente:", error);
      }
    };

    fetchAlimente();
  }, [userId]);

  const handleAddAliment = (newAliment) => {
    setAlimente((prev) => [...prev, newAliment]);
    setFilteredAlimente((prev) => [...prev, newAliment]);
  };

  const handleFilterCategory = async (category) => {
    try {
      const data = await AlimentAPI.getAlimenteByCategory(userId, category);
      setFilteredAlimente(data);
    } catch (error) {
      console.error("Error filtering alimente by category:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavBar />
      <AddAliment userId={userId} onAdd={handleAddAliment} />
      <CategoryFilter onFilter={handleFilterCategory} />
      <AlertsList userId={userId} />
      <FridgeList alimente={filteredAlimente} />
      <FriendGroups userId={userId} />
      <InviteFriends userId={userId} />
      <SearchAllUsers />
      <AddFriend userId={userId} />
      {isModalOpen && (
        <FoodItemsModal
          userId={userId}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}{" "}
      <button className="btn btn-primary" onClick={openModal}>
        View All Food Items
      </button>
    </div>
  );
};

export default FridgePage;
