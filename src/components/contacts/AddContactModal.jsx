/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addContact,
  editContact,
  editContactClose,
  fetchAllContacts,
} from "../../redux";
import { useDispatch, useSelector } from "react-redux";

const AddContactModal = ({ isModalOpen, setIsModalOpen }) => {

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  const formik = useFormik({
    initialValues: {
      companyName: "",
      gstin: "",
      address: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string()
        .required("Company Name is required"),
        gstin: Yup.string()
        .min(15, "Must be of 15 characters")
        .max(15, "Must be of 15 characters")
        .required("GSTIN is required"),
        address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      if (contacts.isEdit) dispatch(editContact(values));
      else dispatch(addContact(values));
      dispatch(fetchAllContacts());
      setIsModalOpen(false);
    },
  });

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    formik.setValues(contacts.contactToEdit);
  }, [contacts.contactToEdit]);

  return (
    <>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto w-screen"
          initialFocus={cancelButtonRef}
          onClose={() => {
            formik.handleReset();
            dispatch(editContactClose());
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
                  
                  
                  {/*COMPANY NAME*/}
                  <div className="p-2 w-full md:w-1/2">
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
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
                    {formik.touched.companyName && formik.errors.companyName ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.companyName}
                      </p>
                    ) : null}
                  </div>

                      {/* GSTIN */}
                  <div className="p-2 w-full md:w-1/2">
                    <label
                      htmlFor="gstin"
                      className="block text-sm font-medium text-gray-700"
                    >
                      GSTIN
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="gstin"
                        id="gstin"
                        maxLength={15}
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formik.values.gstin}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min="0"
                      />
                      {formik.touched.gstin && formik.errors.gstin ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.gstin && formik.errors.gstin ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.gstin}
                      </p>
                    ) : null}
                  </div>

                      {/* Address */}
                  
                  <div className="p-2 w-full md:w-1/2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.address && formik.errors.address ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.address && formik.errors.address ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.address}
                      </p>
                    ) : null}
                  </div>
                  <div className="basis-full"></div>
                  {/* SAVE BUTTON */}
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse p-2">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Save
                    </button>

                    {/* CANCEL BUTTON */}
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                      ref={cancelButtonRef}
                      onClick={() => {
                        formik.handleReset();
                        dispatch(editContactClose());
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

export default AddContactModal;
