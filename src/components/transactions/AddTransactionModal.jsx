/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductListTable from "./ProductListTable";
import { createTransaction, resetProductList } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddTransactionModal = ({ isModalOpen, setIsModalOpen }) => {
  const transaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      transactionName: "",
      transactionType: "",
      transactionStatus: "",
      companyName: "",
      shippingAddress: "",
    },
    validationSchema: Yup.object({
      transactionName: Yup.string()
        .max(30, "Name must be less than 30 characters")
        .required("Transaction Name is required"),
      transactionType: Yup.string().required("Transaction Type is required"),
      transactionStatus: Yup.string().required(
        "Transaction Status is required"
      ),
      companyName: Yup.string()
        .max(50, "Company Name must be less than 50 characters")
        .required("Company Name is required"),
      shippingAddress: Yup.string()
        .max(250, "Shipping Address must be less than 250 characters")
        .required("Shipping Address is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (transaction.productList.length !== 0) {
        dispatch(
          createTransaction({
            ...values,
            productList: transaction.productList.map((product) => {
              return {
                productId: product.id,
                count: product.quantity,
              };
            }),
          })
        );
        setIsModalOpen(false);
        dispatch(resetProductList());
        resetForm();
      } else toast.error("Please add products to continue");
    },
  });

  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto w-screen"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setIsModalOpen(false);
            formik.handleReset();
            dispatch(resetProductList());
          }}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-auto shadow-xl transform transition-all sm:align-middle w-full sm:p-6 md:max-w-6xl">
                <form className="flex flex-wrap" onSubmit={formik.handleSubmit}>
                  <div className="flex flex-col w-full md:w-1/3">
                    <div className="p-2">
                      <label
                        htmlFor="transactionName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Transaction Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="transactionName"
                          required
                          className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                          value={formik.values.transactionName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.transactionName &&
                        formik.errors.transactionName ? (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                        ) : null}
                      </div>
                      {formik.touched.transactionName &&
                      formik.errors.transactionName ? (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {formik.errors.transactionName}
                        </p>
                      ) : null}
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="unit"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Transaction Type
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <select
                          name="transactionType"
                          required
                          className="mt-1 focus:ring-nattubtn focus:border-nattubtn block w-full p-2 rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                          value={formik.values.transactionType}
                          onChange={(e) => {
                            formik.handleChange(e);
                            dispatch(resetProductList());
                          }}
                          onBlur={formik.handleBlur}
                        >
                          <option disabled value="">
                            Select...
                          </option>
                          <option value="PURCHASE">Purchase</option>
                          <option value="SALES">Sales</option>
                        </select>
                        {formik.touched.transactionType &&
                        formik.errors.transactionType ? (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                        ) : null}
                      </div>
                      {formik.touched.transactionType &&
                      formik.errors.transactionType ? (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {formik.errors.transactionType}
                        </p>
                      ) : null}
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="unit"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Transaction Status
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <select
                          name="transactionStatus"
                          required
                          className="mt-1 focus:ring-nattubtn focus:border-nattubtn block w-full p-2 rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                          value={formik.values.transactionStatus}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option disabled defaultValue="" value="">
                            Select...
                          </option>
                          {formik.values.transactionType === "PURCHASE" && (
                            <option value="RECEIVED">Received</option>
                          )}
                          {formik.values.transactionType === "PURCHASE" && (
                            <option value="NOTRECEIVED">Not Received</option>
                          )}
                          {formik.values.transactionType === "SALES" && (
                            <option value="DISPATCHED">Dispatched</option>
                          )}
                          {formik.values.transactionType === "SALES" && (
                            <option value="NOTDISPATCHED">
                              Not Dispatched
                            </option>
                          )}
                        </select>
                        {formik.touched.transactionStatus &&
                        formik.errors.transactionStatus ? (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                        ) : null}
                      </div>
                      {formik.touched.transactionStatus &&
                      formik.errors.transactionStatus ? (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {formik.errors.transactionStatus}
                        </p>
                      ) : null}
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="companyName"
                          required
                          className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                          value={formik.values.companyName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.companyName &&
                        formik.errors.companyName ? (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                        ) : null}
                      </div>
                      {formik.touched.companyName &&
                      formik.errors.companyName ? (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {formik.errors.companyName}
                        </p>
                      ) : null}
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Shipping Address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="shippingAddress"
                          required
                          maxLength={255}
                          className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                          value={formik.values.shippingAddress}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.shippingAddress &&
                        formik.errors.shippingAddress ? (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                        ) : null}
                      </div>
                      {formik.touched.shippingAddress &&
                      formik.errors.shippingAddress ? (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {formik.errors.shippingAddress}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-x-4 p-2">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto"
                        onClick={() => {
                          setIsModalOpen(false);
                          formik.handleReset();
                          dispatch(resetProductList());
                        }}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-nattubtn px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-nattu focus:outline-none focus:ring-2 focus:ring-nattu focus:ring-offset-2 sm:w-auto"
                      >
                        Add Transaction
                      </button>
                    </div>
                  </div>
                  {formik.values.transactionName &&
                  formik.values.transactionType &&
                  formik.values.transactionStatus &&
                  formik.values.companyName &&
                  formik.values.shippingAddress ? (
                    <ProductListTable type={formik.values.transactionType} />
                  ) : (
                    <p className="text-lg text-red-400 m-auto">
                      Please Enter Transaction details to add products
                    </p>
                  )}
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AddTransactionModal;
