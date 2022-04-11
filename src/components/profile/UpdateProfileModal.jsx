import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import { VscBriefcase } from "react-icons/vsc";
import { BsFillKeyFill } from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi";
import UpdatePassword from "./UpdatePassword";
import UpdateInfo from "./UpdateInfo";
import UpdateCompanyDetails from "./UpdateCompanyDetails";

const UpdateProfileModal = ({ isModalOpen, setIsModalOpen }) => {
  const [info, setinfo] = useState(true);
  const [password, setpassword] = useState(false);
  const [companyDetails, setCompanyDetails] = useState(false);
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto w-screen"
        initialFocus={cancelButtonRef}
        onClose={setIsModalOpen}
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
              {/* ------------------------------------------- */}
              <div className="max-w-screen-md mx-auto border-2 bg-gray-50">
                <div className="p-4">
                  <img
                    src="https://www.citypng.com/public/uploads/preview/hd-profile-user-round-blue-icon-symbol-transparent-png-11639594354dzabzsbpuv.png"
                    height={100}
                    width={100}
                    className="mx-auto"
                  />
                  <p className="mx-auto px-2 w-32">Upload Photo</p>
                </div>
                <div className="w-full bg-nattu">
                  <ul className="grid grid-cols-3 gap-x-5 m-10 max-w-md mx-auto p-4">
                    <li className="relative">
                      <span className="text-white">
                        <HiOutlineIdentification />
                      </span>
                      <button
                        className="text-white"
                        onClick={() => {
                          setinfo(true);
                          setpassword(false);
                          setCompanyDetails(false);
                        }}
                      >
                        Personal Info
                      </button>
                    </li>
                    <li className="relative">
                      <span className="text-white">
                        <BsFillKeyFill />
                      </span>
                      <button
                        className="text-white"
                        onClick={() => {
                          setpassword(true);
                          setinfo(false);
                          setCompanyDetails(false);
                        }}
                      >
                        Password
                      </button>
                    </li>
                    <li className="relative">
                      <span className="text-white">
                        <VscBriefcase />
                      </span>
                      <button
                        className="text-white"
                        onClick={() => {
                          setCompanyDetails(true);
                          setinfo(false);
                          setpassword(false);
                        }}
                      >
                        Company Details
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="">
                  {info && <UpdateInfo setIsModalOpen={setIsModalOpen} />}
                  {password && <UpdatePassword setIsModalOpen={setIsModalOpen} />}
                  {companyDetails && <UpdateCompanyDetails setIsModalOpen={setIsModalOpen} />}
                </div>
              </div>
              {/* ------------------------------------------- */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UpdateProfileModal;
