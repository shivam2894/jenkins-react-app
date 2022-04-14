import { useFormik } from "formik";
import {useNavigate, useSearchParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import logo from "../../images/nattu.png";
import * as Yup from "yup";
import { resetPassword } from "../../redux";

function ResetPassword() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const formikResetPwd = useFormik({
    initialValues: {
      newpassword: "",
      cnewpassword: "",
    },
    validationSchema: Yup.object({
      newpassword: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
          "Password must contain minimum six characters, at least one letter, one number and one special character"
        )
        .required("Password is required"),
      cnewpassword: Yup.string()
        .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
        .required("Passwords must match"),
    }),
    onSubmit: (values) => {
        dispatch(resetPassword(searchParams.get("token"), values.newpassword, navigate));
    },
  });

  return (
    <>
      <div className="flex-1 flex flex-col justify-center h-screen px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full md:max-w-md lg:w-96">
          <div>
            <div>
              <img src={logo} alt="NattuKaka" className="mx-auto w-80" />
            </div>
          </div>
          <div className="mt-8">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Reset your password
              </h2>
            </div>
            <div className="mt-6">
              <form
                onSubmit={formikResetPwd.handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="newpassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="newpassword"
                      name="newpassword"
                      type="password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                      value={formikResetPwd.values.newpassword}
                      onChange={formikResetPwd.handleChange}
                      onBlur={formikResetPwd.handleBlur}
                    />
                    {formikResetPwd.touched.newpassword &&
                      formikResetPwd.errors.newpassword && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                  </div>
                  {formikResetPwd.touched.newpassword &&
                    formikResetPwd.errors.newpassword && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formikResetPwd.errors.newpassword}
                      </p>
                    )}
                </div>

                <div>
                  <label
                    htmlFor="newpassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="cnewpassword"
                      name="cnewpassword"
                      type="password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                      value={formikResetPwd.values.cnewpassword}
                      onChange={formikResetPwd.handleChange}
                      onBlur={formikResetPwd.handleBlur}
                    />
                    {formikResetPwd.touched.cnewpassword &&
                      formikResetPwd.errors.cnewpassword && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                  </div>
                  {formikResetPwd.touched.cnewpassword &&
                    formikResetPwd.errors.cnewpassword && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formikResetPwd.errors.cnewpassword}
                      </p>
                    )}
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nattu hover:bg-nattudark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nattubtn"
                  >
                    Reset Password
                    {auth.loading && (
                      <svg
                        className="animate-spin mx-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
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
    </>
  );
}

export default ResetPassword;
