/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { inviteEmployee } from "../../redux";
import debounce from "lodash.debounce";
import { getAuthenticatedRequest } from "../../redux";

const InviteEmployeeModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      cpassword: "",
      dob: "",
      roles: ["ROLE_EMPLOYEE"],
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Username must be minimum 6 characters")
        .required("Username is required"),
      email: Yup.string().email().required("Email is required"),
      dob: Yup.date()
        .max(
          new Date(Date.now() - 31556952000 * 10),
          "Minimum age should be 10 years"
        )
        .required("DOB is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
          "Password must contain minimum six characters, at least one letter, one number and one special character"
        )
        .required("Password is required"),
      cpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Passwords must match"),
    }),
    onSubmit: (values, { resetForm }) => {
      if(!alreadyExists.username && !alreadyExists.email){
        dispatch(inviteEmployee(values));
        resetForm();
        setIsModalOpen(false);
      }
    },
  });
  const [alreadyExists, setAlreadyExists] = useState({
    username: false,
    email: false,
  });

  const cancelButtonRef = useRef(null);

  const checkUsernameExists = async (value) => {
    if (!value)
      return setAlreadyExists((prev) => {
        return { ...prev, username: false };
      });
    const response = await getAuthenticatedRequest()
      .get(`/usernameCheck/${value}`)
      .then((res) =>
        setAlreadyExists((prev) => {
          return { ...prev, username: res.data };
        })
      );
    return !response;
  };

  const checkEmailExists = async (value) => {
    if (!value)
      return setAlreadyExists((prev) => {
        return { ...prev, email: false };
      });
    const response = await getAuthenticatedRequest()
      .get(`/emailCheck/${value}`)
      .then((res) =>
        setAlreadyExists((prev) => {
          return { ...prev, email: res.data };
        })
      );
    return !response;
  };

  const usernameChangeHandler = useCallback(
    debounce(checkUsernameExists, 500),
    []
  );

  const emailChangeHandler = useCallback(debounce(checkEmailExists, 500), []);

  return (
    <>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto w-screen"
          initialFocus={cancelButtonRef}
          onClose={()=>{
            setIsModalOpen(false);
            formik.handleReset();
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
                  {/*User Name Field*/}
                  <div className="p-2 w-full md:w-1/2">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      User Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="username"
                        id="userName"
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="User Name"
                        value={formik.values.username}
                        onChange={(e) => {
                          formik.handleChange(e);
                          usernameChangeHandler(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.username && formik.errors.username && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    {formik.touched.username && formik.errors.username && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.username}
                      </p>
                    )}
                    {alreadyExists.username && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        Username already exists
                      </p>
                    )}
                  </div>

                  {/*Employee Full Name Field*/}
                  <div className="p-2 w-full md:w-1/2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Employee Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.name && formik.errors.name ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.name}
                      </p>
                    ) : null}
                  </div>

                  {/*Employee email Id Field*/}
                  <div className="p-2 w-full md:w-1/2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Employee Email ID
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        required
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formik.values.email}
                        onChange={(e) => {
                          formik.handleChange(e);
                          emailChangeHandler(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.email}
                      </p>
                    )}
                    {alreadyExists.email && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        Email already exists
                      </p>
                    )}
                  </div>

                  {/*Employee dob Field*/}
                  <div className="p-2 w-full md:w-1/2">
                    <label
                      htmlFor="dob"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Employee Date Of Birth
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="dob"
                        name="dob"
                        type="text"
                        autoComplete="Date of Birth"
                        placeholder="Date of Birth"
                        required
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formik.values.dob}
                        onFocus={(e) => (e.currentTarget.type = "date")}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.dob && formik.errors.dob ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.dob && formik.errors.dob ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.dob}
                      </p>
                    ) : null}
                  </div>

                  {/*password Field*/}
                  <div className="p-2 w-full md:w-1/2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        required
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.password}
                      </p>
                    ) : null}
                  </div>

                  {/*Confirm Password Field*/}
                  <div className="p-2 w-full md:w-1/2">
                    <label
                      htmlFor="cpassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="cpassword"
                        name="cpassword"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Confirm Password"
                        required
                        className="shadow-sm focus:ring-nattubtn focus:border-nattubtn block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formik.values.cpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.cpassword && formik.errors.cpassword ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.cpassword && formik.errors.cpassword ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.cpassword}
                      </p>
                    ) : null}
                  </div>

                  {/* submit and cancel buttons */}

                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add To Employee List
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setIsModalOpen(false);
                        formik.handleReset();
                      }}
                      ref={cancelButtonRef}
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

export default InviteEmployeeModal;
