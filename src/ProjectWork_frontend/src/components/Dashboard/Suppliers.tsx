import { useState } from "react";
import SupplierInformation from "../FashionHouse/SupplierInformation";
import SupplierInfoDashboard from "./SupplierInfoDashboard";
import { set } from "zod";
import { Principal } from "@dfinity/principal";
import { ToastContainer, toast } from "react-toastify";
import ViewInfoButton from "../Buttons/ViewInfoButton";
import DeleteButton from "../Buttons/DeleteButton";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import ToggleVisibilityButton from "../Buttons/ToggleVisibilityButton";

const Suppliers = ({ suppliers, setSuppliers, backendActor }) => {
  const [showSupModal, setShowSupModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [deletingSupplierId, setDeletingSupplierId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const [processing, setProcessing] = useState(null);

  const handleShowInfo = (supplier: any) => {
    setSelectedSupplier(supplier);
    setShowSupModal(true);
  };

  const handleDeleteSupplier = (supplier) => {
    setSupplierToDelete(supplier);
    setIsModalOpen(true);
  };
  const confirmDeleteSupplier = async () => {
    let isCancelled = false;
    setIsModalOpen(false);
    try {
      setDeletingSupplierId(supplierToDelete.principalId);
      await backendActor.removeSupplier(
        Principal.fromText(supplierToDelete.principalId)
      );

      if (!isCancelled) {
        const updatedSuppliers = suppliers.filter(
          (sup) => sup.principalId !== supplierToDelete.principalId
        );
        setSuppliers(updatedSuppliers);
        toast.success(`Supplier was deleted successfully.`, {
          autoClose: 5000,
          position: "top-center",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
      toast.error("Failed to delete supplier. Please try again.", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
    } finally {
      if (!isCancelled) {
        setDeletingSupplierId(null);
      }
    }

    return () => {
      isCancelled = true;
    };
  };
  const handleToggleVisibility = async (supplier) => {
    setProcessing(supplier.principalId);
    try {
      await backendActor.toggleUserVisibility(
        Principal.fromText(supplier.principalId)
      );
      const updatedSuppliers = await backendActor.getAllSuppliers();
      setSuppliers(updatedSuppliers);
    } catch (error) {
      console.error("Error toggling visibility:", error);
      toast.error("Failed to toggle visibility. Please try again.");
    }
    setProcessing(null);
  };

  return (
    <div>
      <div className="flex flex-col mt-5 gap-5 w-full overflow-x-auto">
        {suppliers.length > 0 ? (
          <table className="min-w-full text-left text-xs sm:text-sm md:text-base ">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {suppliers
                .sort((a, b) => a.companyName.localeCompare(b.companyName))
                .map((supplier, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {supplier.companyName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 flex items-center gap-3">
                      <ViewInfoButton
                        onClick={() => handleShowInfo(supplier)}
                      />
                      <DeleteButton
                        onClick={() => handleDeleteSupplier(supplier)}
                        deleting={deletingSupplierId === supplier.principalId}
                      />
                      <DeleteConfirmationModal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        confirmDelete={confirmDeleteSupplier}
                      />
                      <ToggleVisibilityButton
                        isVisible={supplier.isVisible}
                        onClick={() => handleToggleVisibility(supplier)}
                        processing={processing === supplier.principalId}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center">
            <h1 className="text-2xl text-gray-500">No results to show</h1>
          </div>
        )}
      </div>
      {showSupModal && (
        <SupplierInfoDashboard
          {...{
            showSupModal,
            setShowSupModal,
            selectedSupplier,
            setSelectedSupplier,
          }}
        />
      )}
    </div>
  );
};

export default Suppliers;
