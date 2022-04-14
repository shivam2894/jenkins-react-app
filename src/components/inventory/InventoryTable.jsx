import { useDispatch, useSelector } from "react-redux";
import { changePage, editProductOpen, deleteProduct } from "../../redux";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

var formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const InventoryTable = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="divide-y divide-gray-200 lg:table-fixed lg:w-full">
              <thead className="bg-gray-50">
                <tr className="">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-3/12"
                  >
                    NAME
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-2/12"
                  >
                    CATEGORY
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    CURRENT STOCK
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    UNIT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    PRICE
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    MIN STOCK LEVEL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    MAX STOCK LEVEL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              {inventory.products.length > 0 && (
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventory.products.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-nattu hover:text-white transition ease-out duration-200"
                    >
                      <td className="px-6 py-4 text-sm font-bold">{item.id}</td>
                      <td className="px-6 py-4 text-sm break-words">
                        {item.productName}
                      </td>
                      <td className="px-6 py-4 text-sm">{item.categoryName}</td>
                      <td className="px-6 py-4 text-sm">{item.stocks}</td>
                      <td className="px-6 py-4 text-sm">{item.unit}</td>
                      <td className="px-6 py-4 text-sm">
                        {formatter.format(item.price)}
                      </td>
                      <td className="px-6 py-4 text-sm">{item.minStock}</td>
                      <td className="px-6 py-4 text-sm">{item.maxStock}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex space-x-2">
                          <a
                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            onClick={() => {
                              dispatch(editProductOpen(item));
                              setIsModalOpen(true);
                            }}
                          >
                            <PencilIcon className="w-6" />
                          </a>
                          <a
                            className="text-red-600 hover:text-red-900 cursor-pointer"
                            onClick={() =>
                              swal({
                                title: "Are you sure you want to delete this product?",
                                text: `${item.productName}`,
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              })
                              .then((willDelete) => {
                                if (willDelete) {
                                  dispatch(deleteProduct(item.id));
                                }
                              })
                            }
                          >
                            <TrashIcon className="w-6" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
              {inventory.loading && (
                <tbody className="bg-white divide-y divide-gray-200 animate-pulse">
                  <tr>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ele, idx) => (
                      <td
                        key={idx}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                      >
                        <div className="h-2 bg-slate-700 rounded"></div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ele, idx) => (
                      <td
                        key={idx}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                      >
                        <div className="h-2 bg-slate-700 rounded"></div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ele, idx) => (
                      <td
                        key={idx}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                      >
                        <div className="h-2 bg-slate-700 rounded"></div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              )}
            </table>
            <nav
              className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {inventory.currPage * 10 + (inventory.numberOfElements > 0 ? 1 : 0)}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {inventory.currPage * 10 + inventory.numberOfElements}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {inventory.stockSummary.totalProducts}
                  </span>{" "}
                  results
                </p>
              </div>
              <div className="flex-1 flex justify-between sm:justify-end">
                <button
                  disabled={inventory.currPage === 0 ? true : false}
                  className={
                    "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 " +
                    (inventory.currPage !== 0
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-200")
                  }
                  onClick={() => {
                    dispatch(
                      changePage(
                        inventory.currPage === 0
                          ? inventory.currPage
                          : inventory.currPage - 1
                      )
                    );
                  }}
                >
                  Previous
                </button>
                <button
                  disabled={!inventory.nextExists}
                  className={
                    "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 " +
                    (inventory.nextExists
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-200")
                  }
                  onClick={() => {
                    dispatch(changePage(inventory.currPage + 1));
                  }}
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
