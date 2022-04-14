import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "../../redux/auth/authActions";
import logo from "../../images/nattu.png";
import { getAuthenticatedRequest } from "../../redux";
import debounce from "lodash.debounce";

const RegisterUser = () => {
  const [showRegUser, setShowRegUser] = useState(true);
  const [alreadyExists, setAlreadyExists] = useState({
    username: false,
    email: false,
  });
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  const formikUser = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      cpassword: "",
      dob: "",
      companyName: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Username must be minimum 6 characters")
        .required("Username is required"),
      name: Yup.string().required("Name is required"),
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
    onSubmit: () => {
      if (!alreadyExists.username && !alreadyExists.email)
        setShowRegUser(false);
    },
  });

  const formikCompany = useFormik({
    initialValues: {
      companyName: "",
      gstin: "",
      address: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().max(250).required("Company Name is required"),
      gstin: Yup.string()
        .min(15, "GSTIN Must be of 15 characters")
        .max(15, "GSTIN Must be of 15 characters")
        .required("GSTIN is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      dispatch(signUp({ ...formikUser.values, ...values }, navigate));
    },
  });

  return showRegUser ? (
    <div className="flex-1 flex flex-col justify-center h-screen px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img className="mx-auto w-80" src={logo} alt="NattuKaka" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an Account?{" "}
            <Link
              to="/login"
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Sign In Here
            </Link>
          </p>
        </div>
        <div className="mt-4">
          <form onSubmit={formikUser.handleSubmit} className="space-y-6">

            <div>
              <div className="mt-1 relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Username"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                  value={formikUser.values.username}
                  onChange={(e) => {
                    formikUser.handleChange(e);
                    usernameChangeHandler(e.target.value);
                  }}
                  onBlur={formikUser.handleBlur}
                />
                {formikUser.touched.username && formikUser.errors.username && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {formikUser.touched.username && formikUser.errors.username && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {formikUser.errors.username}
                </p>
              )}
              {alreadyExists.username && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  Username already exists
                </p>
              )}
            </div>

            <div>
              <div className="mt-1 relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full Name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                  value={formikUser.values.name}
                  onChange={formikUser.handleChange}
                  onBlur={formikUser.handleBlur}
                />
                {formikUser.touched.name && formikUser.errors.name && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {formikUser.touched.name && formikUser.errors.name && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {formikUser.errors.name}
                </p>
              )}
            </div>

            <div>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                  value={formikUser.values.email}
                  onChange={(e) => {
                    formikUser.handleChange(e);
                    emailChangeHandler(e.target.value);
                  }}
                  onBlur={formikUser.handleBlur}
                />
                {formikUser.touched.email && formikUser.errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {formikUser.touched.email && formikUser.errors.email && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {formikUser.errors.email}
                </p>
              )}
              {alreadyExists.email && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  Email already exists
                </p>
              )}
            </div>

            <div>
              <div className="mt-1 relative">
                <input
                  id="dob"
                  name="dob"
                  type="text"
                  autoComplete="Date of Birth"
                  placeholder="Date of Birth"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                  value={formikUser.values.dob}
                  onFocus={(e) => (e.currentTarget.type = "date")}
                  onChange={formikUser.handleChange}
                  onBlur={formikUser.handleBlur}
                />
                {formikUser.touched.dob && formikUser.errors.dob && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {formikUser.touched.dob && formikUser.errors.dob && (
                <p className="mt-2 text-sm text-red-600">
                  {formikUser.errors.dob}
                </p>
              )}
            </div>

            <div>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                  value={formikUser.values.password}
                  onChange={formikUser.handleChange}
                  onBlur={formikUser.handleBlur}
                />
                {formikUser.touched.password && formikUser.errors.password && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {formikUser.touched.password && formikUser.errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {formikUser.errors.password}
                </p>
              )}
            </div>

            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Confirm Password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                  value={formikUser.values.cpassword}
                  onChange={formikUser.handleChange}
                  onBlur={formikUser.handleBlur}
                />
                {formikUser.touched.cpassword && formikUser.errors.cpassword ? (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                ) : null}
              </div>
              {formikUser.touched.cpassword && formikUser.errors.cpassword ? (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {formikUser.errors.cpassword}
                </p>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nattu hover:bg-nattudark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nattubtn"
              >
                Next
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex-1 flex flex-col justify-center h-screen px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Enter Company Details
        </h3>
      </div>
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div className="mt-8">
          <div className="mt-6">
            <form onSubmit={formikCompany.handleSubmit} className="space-y-6">
              <div>
                <div className="mt-1 relative">
                  <input
                    id="company"
                    name="companyName"
                    type="text"
                    autoComplete="Company Name"
                    placeholder="Company Name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                    value={formikCompany.values.companyName}
                    onChange={formikCompany.handleChange}
                    onBlur={formikCompany.handleBlur}
                  />
                  {formikCompany.touched.companyName &&
                    formikCompany.errors.companyName && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                </div>
                {formikCompany.touched.companyName &&
                  formikCompany.errors.companyName && (
                    <p className="mt-2 text-sm text-red-600">
                      {formikCompany.errors.companyName}
                    </p>
                  )}
              </div>

              <div className="space-y-1">
                <div className="mt-1 relative">
                  <input
                    id="gstin"
                    name="gstin"
                    type="text"
                    autoComplete="GST Number"
                    placeholder="GST Number"
                    maxLength={15}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                    value={formikCompany.values.gstin}
                    onChange={formikCompany.handleChange}
                    onBlur={formikCompany.handleBlur}
                  />
                  {formikCompany.touched.gstin && formikCompany.errors.gstin && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                {formikCompany.touched.gstin && formikCompany.errors.gstin && (
                  <p className="mt-2 text-sm text-red-600">
                    {formikCompany.errors.gstin}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="mt-1 relative">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="Address"
                    placeholder="Address"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                    value={formikCompany.values.address}
                    onChange={formikCompany.handleChange}
                    onBlur={formikCompany.handleBlur}
                  />
                  {formikCompany.touched.address &&
                    formikCompany.errors.address && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                </div>
                {formikCompany.touched.address &&
                  formikCompany.errors.address && (
                    <p className="mt-2 text-sm text-red-600">
                      {formikCompany.errors.address}
                    </p>
                  )}
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  className="w-1/2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nattubtn hover:bg-nattu focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nattubtn"
                  onClick={() => setShowRegUser(true)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nattu hover:bg-nattudark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nattubtn"
                >
                  Sign Up
                  {auth.loading && (
                    <svg
                      className="animate-spin mx-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
