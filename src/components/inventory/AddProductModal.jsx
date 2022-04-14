/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addProduct,
  editProduct,
  editProductClose,
} from "../../redux";
import { useDispatch, useSelector } from "react-redux";

const AddProductModal = ({ isModalOpen, setIsModalOpen }) => {

  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);

  const formik = useFormik({
    initialValues: {
      id: "",
      productName: "",
      stocks: "",
      unit: "",
      price: "",
      minStock: "",
      maxStock: "",
      categoryName: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string()
        .max(250, "Name must be less than 250 characters")
        .required("Product Name is required"),
      stocks: Yup.number()
        .min(0, "Stock can't be negative")
        .required("Stocks are required"),
      unit: Yup.string().required("Unit is required"),
      price: Yup.number().min(0, "Price can't be negative").required(),
      minStock: Yup.number().min(0, "Min Stock can't be negative").required(),
      maxStock: Yup.number().min(0, "Max Stock can't be negative").moreThan(Yup.ref("minStock"),"Must be greater than min stock")
      .required(),
      categoryName: Yup.string().required("Category Name is Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      if (inventory.isEdit) dispatch(editProduct(values));
      else dispatch(addProduct(values));
      setIsModalOpen(false);
    },
  });

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    formik.setValues(inventory.productToEdit);
  }, [inventory.productToEdit]);

  return (
    <>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto w-screen"
          initialFocus={cancelButtonRef}
          onClose={() => {
            formik.handleReset();
            dispatch(editProductClose());
            setIsModalOpen(false);
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 md:max-w-2xl">
                <form className="flex flex-wrap" onSubmit={formik.handleSubmit}>
                  <div className="p-2 w-1/2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="productName"
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.productName &&
                      formik.errors.productName ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.productName && formik.errors.productName ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.productName}
                      </p>
                    ) : null}
                  </div>

                  <div className="p-2 w-1/2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        list="categories"
                        type="text"
                        name="categoryName"
                        required
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formik.values.categoryName.toUpperCase()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <datalist id="categories">
                        {inventory.categories && inventory.categories.map((item, idx) => (
                          <option key={idx} value={item.categoryName} />
                        ))}
                      </datalist>
                      {formik.touched.categoryName &&
                      formik.errors.categoryName ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.categoryName &&
                    formik.errors.categoryName ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.categoryName}
                      </p>
                    ) : null}
                  </div>

                  <div className="p-2 w-1/2">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="mt-1 focus:ring-nattubtn focus:border-nattubtn block w-full pl-7 rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                        placeholder="0.00"
                        aria-describedby="price-currency"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min="0"
                      />
                      {formik.touched.price && formik.errors.price ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.price && formik.errors.price ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.price}
                      </p>
                    ) : null}
                  </div>

                  <div className="p-2 w-1/2">
                    <label
                      htmlFor="unit"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Unit
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <select
                        id="unit"
                        name="unit"
                        autoComplete="unit"
                        className="mt-1 focus:ring-nattubtn focus:border-nattubtn block w-full p-2 rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                        value={formik.values.unit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option disabled value="">
                          Select...
                        </option>
                        <option value="KILOGRAM">Kilogram</option>
                        <option value="NUMBER">Number</option>
                        <option value="METER">Meter</option>
                        <option value="GRAM">Gram</option>
                        <option value="LITER">Liter</option>
                      </select>
                      {formik.touched.unit && formik.errors.unit ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.unit && formik.errors.unit ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.unit}
                      </p>
                    ) : null}
                  </div>
                  <div className="p-2 md:w-1/3">
                    <label
                      htmlFor="stocks"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Stock
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        name="stocks"
                        id="stocks"
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formik.values.stocks}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.stocks && formik.errors.stocks ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.stocks && formik.errors.stocks ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.stocks}
                      </p>
                    ) : null}
                  </div>

                  <div className="p-2 md:w-1/3">
                    <label
                      htmlFor="minStock"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Minimum Stock
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        name="minStock"
                        id="minStock"
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formik.values.minStock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.minStock && formik.errors.minStock ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.minStock && formik.errors.minStock ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.minStock}
                      </p>
                    ) : null}
                  </div>

                  <div className="p-2 md:w-1/3">
                    <label
                      htmlFor="maxStock"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Maximum Stock
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        name="maxStock"
                        id="maxStock"
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formik.values.maxStock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.maxStock && formik.errors.maxStock ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.maxStock && formik.errors.maxStock ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.maxStock}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse p-2">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-nattubtn text-base font-medium text-white hover:bg-nattu focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                      ref={cancelButtonRef}
                      onClick={() => {
                        formik.handleReset();
                        dispatch(editProductClose());
                        setIsModalOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AddProductModal;
