import React, { useEffect, useState } from "react";
import InventoryTable from "./InventoryTable";
import AddProductModal from "./AddProductModal";
import * as XLSX from "xlsx";
import {
  changeStockFilter,
  fetchAllProducts,
  getAllCategories,
  uploadProducts,
  searchByProductId,
  searchByProductName,
  getStockSummary,
  resetInventoryFilters,
} from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { SearchIcon } from "@heroicons/react/solid";
import "react-toastify/dist/ReactToastify.css";

var formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchById, setSearchById] = useState("");
  const [searchByName, setSearchByName] = useState("");
  const inventory = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStockSummary());
    dispatch(getAllCategories());
    dispatch(fetchAllProducts());
  }, []);

  const handleFile = async (e) => {
    const file = e.target.files[0];

    if (file.name.endsWith(".xlsx")) {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      if (jsonData.length > 0) {
        dispatch(uploadProducts(jsonData));
      } else {
        return toast.error(
          "Unable to fetch data from excel file! Please make sure data is in correct format"
        );
      }
    } else {
      toast.error("Please upload excel files only");
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="flex-1">
        <div className="py-6">
          <div className="space-y-4 mx-auto px-4 sm:px-6 md:px-8">
            {/* ------------------------------------- */}
            <div className="shadow-sm rounded-md border-2 shadow-gray-300">
              <div className="flex w-full justify-between p-2">
                <h1 className="text-3xl font-semibold text-gray-700 font-sans mx-3">
                  Inventory
                </h1>
                <div className="flex space-x-3">
                  <button
                    className="bg-nattubtn hover:bg-nattu text-white rounded-md px-3 py-1"
                    onClick={() => {
                      setIsModalOpen(true);
                      dispatch(getAllCategories());
                    }}
                  >
                    Add Item
                  </button>
                  <label className="bg-nattubtn hover:bg-nattu text-white rounded-md px-3 py-1 cursor-pointer">
                    <span className="align-middle">Upload Items</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFile}
                    />
                  </label>
                </div>
              </div>

              <div className="w-full flex flex-wrap my-4 space-x-2 px-2">
                <div className="flex my-auto space-x-2">
                  <div className="relative">
                    <input
                      className="block w-full md:w-40 border-nattubtn focus:border-nattudark focus:ring-nattudark bg-transparent text-gray-900 placeholder-gray-500 rounded-md sm:text-sm"
                      placeholder="Search by ID"
                      type="search"
                      value={searchById}
                      onChange={(e) => setSearchById(e.target.value)}
                    />
                    <button
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                      onClick={() => {
                        dispatch(searchByProductId(searchById));
                        setSearchById("");
                      }}
                    >
                      <SearchIcon
                        className="h-5 w-5 text-nattubtn"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      className="block w-full md:w-40 border-nattubtn focus:border-nattudark focus:ring-nattudark bg-transparent text-gray-900 placeholder-gray-500 rounded-md sm:text-sm"
                      placeholder="Search by Name"
                      type="search"
                      value={searchByName}
                      onChange={(e) => {
                        setSearchByName(e.target.value);
                      }}
                    />
                    <button
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                      onClick={() => {
                        dispatch(searchByProductName(searchByName));
                        setSearchByName("");
                      }}
                    >
                      <SearchIcon
                        className="h-5 w-5 text-nattubtn"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
                <table className="my-1 flex-1 bg-emerald-200 rounded-xl">
                  <thead>
                    <tr>
                      <th className="text-center font-normal text-gray-600 uppercase tracking-wider px-4">
                        Stock Value
                      </th>

                      <th className="text-center font-normal text-gray-600 uppercase tracking-wider px-4">
                        Low Stock
                      </th>
                      <th className="text-center font-normal text-gray-600 uppercase tracking-wider px-4">
                        Excess Stock
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center py-2 whitespace-nowrap md:px-6">
                        <div className="text-md text-nattudark text-2xl">
                          <span>
                            {formatter.format(
                              inventory.stockSummary.stockValue
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-2 whitespace-nowrap md:px-6">
                        <div className="text-md text-nattudark text-2xl">
                          {inventory.stockSummary.lowStock}
                        </div>
                      </td>
                      <td className="text-center py-2 whitespace-nowrap md:px-6">
                        <div className="text-md text-nattudark text-2xl">
                          {inventory.stockSummary.excessStock}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="my-auto flex space-x-2">
                  <select
                    id="filterByStock"
                    name="filterByStock"
                    className="block w-32 px-1 border-nattubtn focus:border-nattudark focus:ring-nattudark bg-transparent text-gray-900 placeholder-gray-500 rounded-md sm:text-sm"
                    onChange={(e) => {
                      dispatch(changeStockFilter(e.target.value));
                    }}
                    value={inventory.stockFilter}
                  >
                    <option disabled value="none">
                      Filter by Stock
                    </option>
                    <option value="all">All</option>
                    <option value="low">Low Stock</option>
                    <option value="excess">Excess Stock</option>
                  </select>

                  <button
                    className="bg-nattubtn hover:bg-nattu text-white rounded-md px-3 py-1"
                    onClick={() => {
                      dispatch(resetInventoryFilters());
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
            {/* ------------------------------------- */}
            <AddProductModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            <InventoryTable
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Inventory;
