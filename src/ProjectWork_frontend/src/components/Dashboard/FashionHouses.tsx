import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { ToastContainer, toast } from "react-toastify";
import ViewInfoButton from "../Buttons/ViewInfoButton";
import DeleteButton from "../Buttons/DeleteButton";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import ToggleVisibilityButton from "../Buttons/ToggleVisibilityButton";

const FashionHouses = ({ houses, setHouses, backendActor }) => {
  const [deletingHouseId, setDeletingHouseId] = useState(null);
  const [houseToDelete, setHouseToDelete] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteHouses = (house) => {
    setHouseToDelete(house);
    setIsModalOpen(true);
  };
  const confirmDeleteHouse = async () => {
    setIsModalOpen(false);
    let isCancelled = false;
    try {
      setDeletingHouseId(houseToDelete.principalId);
      await backendActor.removeFashionHouse(
        Principal.fromText(houseToDelete.principalId)
      );

      if (!isCancelled) {
        const updatedHouses = houses.filter(
          (hss) => hss.principalId !== houseToDelete.principalId
        );
        setHouses(updatedHouses);
        toast.success(`Fashion house was deleted successfully.`, {
          autoClose: 5000,
          position: "top-center",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error deleting fashion house:", error);
      toast.error("Failed to delete fashion house. Please try again.", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
    } finally {
      if (!isCancelled) {
        setDeletingHouseId(null);
      }
    }

    return () => {
      isCancelled = true;
    };
  };

  const handleToggleVisibility = async (house) => {
    setProcessing(house.principalId);
    try {
      await backendActor.toggleUserVisibility(
        Principal.fromText(house.principalId)
      );
      const updatedHouses = await backendActor.getAllFashionHouses();
      setHouses(updatedHouses);
    } catch (error) {
      console.error("Error toggling visibility:", error);
      toast.error("Failed to toggle visibility. Please try again.");
    }
    setProcessing(null);
  };

  return (
    <div>
      <div className="flex flex-col mt-5 gap-5 w-full overflow-x-auto">
        {houses.length > 0 ? (
          <table className="min-w-full text-left text-xs sm:text-sm md:text-base ">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  Company Name
                </th>
              </tr>
            </thead>
            <tbody>
              {houses
                .sort((a, b) => a.companyName.localeCompare(b.companyName))
                .map((house, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {house.companyName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 flex items-center gap-3">
                      <DeleteButton
                        onClick={() => handleDeleteHouses(house)}
                        deleting={deletingHouseId === house.principalId}
                      />
                      <DeleteConfirmationModal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        confirmDelete={confirmDeleteHouse}
                      />
                      <ToggleVisibilityButton
                        isVisible={house.isVisible}
                        onClick={() => handleToggleVisibility(house)}
                        processing={processing === house.principalId}
                      />
                      <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center">
            <h1 className="text-2xl text-gray-500">
              No fashion houses to show yet
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default FashionHouses;
