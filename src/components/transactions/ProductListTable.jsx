import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExistingProductToTransaction,
  addProductToTransaction,
  getAllCategories,
  removeProductFromTransaction,
} from "../../redux";
import { toast, ToastContainer } from "react-toastify";
import AddProductModal from "../inventory/AddProductModal";

var formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const ProductListTable = ({type}) => {
  const [productName, setProductName] = useState("");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const transaction = useSelector((state) => state.transaction);
  const inventory = useSelector(state=>state.inventory);
  const dispatch = useDispatch();

  const handleAddExistingProductToTransaction = (product) => {
    if(type==="SALES"){
      if (product.stocks - product.quantity === 0) {
        toast.error(`${product.productName} out of stock !!!`);
      } else {
        if (product.stocks - product.quantity - 1 === product.minStock) {
          toast.warn(`Min Stock limit reached for ${product.productName}`);
        }
        dispatch(addExistingProductToTransaction(product));
      }
    } else dispatch(addExistingProductToTransaction(product));
  };

  useEffect(() => {
    if (transaction.err){
      toast.error(
        <a
          onClick={() => {
            setIsProductModalOpen(true);
            dispatch(getAllCategories());
          }}
        >
          Product not Present! Click here to add new product
        </a>
      );
    }
  }, [transaction.err]);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col w-full md:w-2/3">
        <div className="p-2 flex space-x-2">
          <div className="relative">
            <input
              className="block w-40 pl-4 h-full border-teal-500 border-2 focus:outline-none bg-transparent text-gray-900 placeholder-gray-500 rounded-xl sm:text-sm"
              list="products"
              placeholder="Search by Name"
              name="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <datalist id="products">
              {inventory.products &&
                inventory.products.map((item, idx) => (
                  <option key={idx} value={item.productName} />
                ))}
            </datalist>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-nattubtn px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-nattu focus:outline-none focus:ring-2 focus:ring-nattu focus:ring-offset-2 sm:w-auto"
              onClick={() => {
                let idx = transaction.productList.findIndex(
                  (product) => product.productName === productName
                );
                if (idx !== -1) {
                  handleAddExistingProductToTransaction(
                    transaction.productList[idx]
                  );
                } else dispatch(addProductToTransaction(productName));
                setProductName("");
              }}
            >
              Add Product
            </button>
            <AddProductModal
              isModalOpen={isProductModalOpen}
              setIsModalOpen={setIsProductModalOpen}
            />
          </div>
        </div>
        <table className="p-2 divide-y divide-gray-300 lg:table-fixed lg:w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-4/12"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Total
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {transaction.productList.map((product, idx) => (
              <tr key={idx}>
                <td className="text-left py-4 pl-4 pr-3 text-gray-900 sm:pl-6">
                  {product.id}
                </td>
                <td className="text-left px-3 py-4 break-words w-3/12">
                  {product.productName}
                </td>
                <td className="text-left px-3 py-4">
                  {formatter.format(product.price)}
                </td>
                <td className="text-left px-3 py-4">
                  {product.quantity}
                </td>
                <td className="text-left px-3 py-4">
                  {formatter.format(product.total)}
                </td>
                <td className="text-left font-medium sm:pr-6 space-x-2">
                  <div className="flex">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(
                        removeProductFromTransaction(product.productName)
                      );
                    }}
                    className="text-teal-600"
                  >
                    <MinusIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleAddExistingProductToTransaction(product)
                    }
                    className="text-teal-600"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:justify-end pr-16">
            <span className="font-semibold px-2">Grand Total:</span>
            {formatter.format(transaction.grandTotal)}
          </div>
        </nav>
      </div>
    </>
  );
};
export default ProductListTable;
