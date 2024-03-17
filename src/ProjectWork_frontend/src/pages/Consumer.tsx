import React, { useEffect, useState } from "react";
import { useAuth } from "../components/hooks/ContextWrapper";
import { toast } from "react-toastify";
import { Principal } from "@dfinity/principal";
import SupplierInformation from "../components/FashionHouse/SupplierInformation";

const Consumer = () => {
  const { backendActor } = useAuth();
  const [error, setError] = useState("");
  const [fhNotFound, setFhNotFound] = useState(false);
  const [houses, setHouses] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [product1, setProduct1] = useState("");
  const [product2, setProduct2] = useState("");
  const [product3, setProduct3] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showSupModal, setShowSupModal] = useState(false);

  const handleCompanyNameChange = async (e: any) => {
    setCompanyName(e.target.value);
    setFhNotFound(false);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    setSuppliers([]);
    try {
      const matchingHouse = houses.find(
        (house) => house.companyName.toLowerCase() === companyName.toLowerCase()
      );
      if (!matchingHouse) {
        setFhNotFound(true);
        return;
      }

      const fhSuppliers = await backendActor.getFashionHouseSuppliers(
        Principal.fromText(matchingHouse.principalId)
      );

      const allSuppliers = [];

      const supplierDetailsList = await Promise.all(
        fhSuppliers.map((supplier) =>
          backendActor.getSupplierInfo(Principal.fromText(supplier.principalId))
        )
      );

      const uniqueLayer1Suppliers = new Map();
      const productTypes = new Set(
        [product1, product2, product3].map((p) => p.toLowerCase())
      );

      for (let i = 0; i < fhSuppliers.length; i++) {
        const supplier = fhSuppliers[i];
        const supplierDetails = supplierDetailsList[i];

        if (supplierDetails && supplierDetails.length > 0) {
          const products = [];
          const layers = [];

          const supplierSuppliersCounts = await Promise.all(
            supplierDetails.map((detail) =>
              backendActor.getSupplierSuppliersCount(detail.id)
            )
          );

          for (let j = 0; j < supplierDetails.length; j++) {
            const detail = supplierDetails[j];
            if (productTypes.has(detail.productType.toLowerCase())) {
              const supplierSuppliersCount = supplierSuppliersCounts[j];
              products.push(detail.productType);
              layers.push(Number(supplierSuppliersCount) + 1);

              if (
                Number(supplierSuppliersCount) === 1 ||
                Number(supplierSuppliersCount) === 0
              ) {
                const layer1Suppliers = await backendActor.getSupplierSuppliers(
                  detail.id
                );
                for (const layer1Supplier of layer1Suppliers) {
                  const productTypeSet =
                    uniqueLayer1Suppliers.get(detail.productType) || new Set();
                  if (!productTypeSet.has(layer1Supplier.id)) {
                    const modifiedLayer1Supplier = {
                      ...layer1Supplier,
                      type: detail.productType,
                      layer: 1,
                    };
                    allSuppliers.push(modifiedLayer1Supplier);
                    productTypeSet.add(layer1Supplier.id);
                    uniqueLayer1Suppliers.set(
                      detail.productType,
                      productTypeSet
                    );
                  }
                }
              }
            }
          }

          const modifiedSupplier = {
            ...supplier,
            type: products.join(", "),
            layer: layers.join(", "),
          };
          allSuppliers.push(modifiedSupplier);
        }
      }

      setSuppliers(allSuppliers);
    } catch (error) {
      console.log(error);
    }
    setIsSearching(false);
  };

  useEffect(() => {
    if (error !== "") {
      toast.error(`${error}`, {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      setError("");
    }
  }, [error]);

  useEffect(() => {
    getHouses();
  }, []);

  const getHouses = async () => {
    try {
      const res = await backendActor.getAllFashionHouses();
      setHouses(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowInfor = (supplier: any) => {
    setSelectedSupplier(supplier);
    setShowSupModal(true);
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-gray-600 p-5 rounded-lg flex flex-col items-center mb-5 mx-auto md:w-1/2 xs:w-4/5">
          {fhNotFound && (
            <h1 className="text-red-500 text-lg mb-4">
              No Fashion House found with this name
            </h1>
          )}
          <h1 className="text-2xl font-semibold mb-1">Supplier Search </h1>
          <h1 className="text-xs mb-4">
            (You can search upto 3 products at once)
          </h1>
          <div className="mb-4">
            <label className="block mb-2 text-gray-200">Fashion House:</label>
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyNameChange}
              className="w-full border border-gray-300 text-gray-700 rounded-md px-4 py-2"
              placeholder="Enter Fashion House Name"
            />
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
              <label className="block mb-2 text-gray-200">
                Product Type 1:
              </label>
              <input
                type="text"
                value={product1}
                onChange={(e) => setProduct1(e.target.value)}
                className="w-full border border-gray-300 text-gray-700 rounded-md px-4 py-2"
                placeholder="Enter Product Type"
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
              <label className="block mb-2 text-gray-200">
                Product Type 2:
              </label>
              <input
                type="text"
                value={product2}
                onChange={(e) => setProduct2(e.target.value)}
                className="w-full border border-gray-300 text-gray-700 rounded-md px-4 py-2"
                placeholder="Enter Product Type"
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
              <label className="block mb-2 text-gray-200">
                Product Type 3:
              </label>
              <input
                type="text"
                value={product3}
                onChange={(e) => setProduct3(e.target.value)}
                className="w-full border border-gray-300 text-gray-700 rounded-md px-4 py-2"
                placeholder="Enter Product Type"
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:shadow-lg transition duration-300"
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
        <div className="w-full overflow-x-auto">
          {suppliers.length > 0 ? (
            <div className="w-full">
              <h1 className="text-center my-3 font-semibold sm:text-sm md:text-base">{`These are suppliers associated with ${companyName} that supply ${
                product1 !== "" ? `${product1}` : ``
              }
            ${product2 !== "" ? `, ${product2}` : ``}
            `}</h1>
              <table className="min-w-full text-left text-xs sm:text-sm md:text-base">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Company Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Product Type
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Layer
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {supplier.companyName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {supplier.type || "-"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {supplier.layer || "-"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex items-center gap-3 flex-wrap">
                        <button
                          onClick={() => handleShowInfor(supplier)}
                          className="px-2 py-1.5 rounded-md bg-blue-500 text-white"
                        >
                          View Information
                        </button>
                      </td>
                    </tr>
                  ))}
                  {suppliers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center">
                        No suppliers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center">
              <h1 className="text-2xl text-gray-500">No results to show</h1>
            </div>
          )}
        </div>
      </div>
      {showSupModal && (
        <SupplierInformation
          {...{ showSupModal, setShowSupModal, selectedSupplier }}
        />
      )}
    </>
  );
};

export default Consumer;
