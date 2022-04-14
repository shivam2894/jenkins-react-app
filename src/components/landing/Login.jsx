import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import jwtDecode from "jwt-decode";
import { forgotPassword, sessionExpired, signIn } from "../../redux/auth/authActions";
import logo from "../../images/nattu.png";

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formikLogin = useFormik({
    initialValues: {
      userName: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
      dispatch(signIn(values, navigate));
    },
  });

  const formikForgotPwd = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(forgotPassword(values.email, navigate));
      setShowForgotPassword(false);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if (token) {
      if (jwtDecode(token).exp < Date.now() / 1000) {
        localStorage.clear();
        sessionStorage.clear();
        dispatch(sessionExpired());
      } else navigate("/user");
    }
  },[]);

  return (
    <>
      <div className="flex-1 flex flex-col justify-center h-screen px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full md:max-w-md lg:w-96">
          <div>
            <div>
              <img src={logo} alt="NattuKaka" className="mx-auto w-80" />
            </div>
          </div>

          {!showForgotPassword ? (
            <div>
              <div className="flex">
                {auth.signUpSuccess && (
                  <div className="bg-slate-200 rounded-md p-2 text-nattudark">
                    Sign Up Successful. Log in to your account
                  </div>
                )}
                {auth.sessionExpired && (
                  <div className="bg-yellow-200 rounded-md p-2 text-yellow-700">
                    Session Expired. Please log in again
                  </div>
                )}
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Don't have an Account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Sign Up Here
                </Link>
              </p>
              <div className="mt-6">
                <form
                  onSubmit={formikLogin.handleSubmit}
                  method="POST"
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="userName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="userName"
                        type="text"
                        autoComplete="username"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                        value={formikLogin.values.username}
                        onChange={formikLogin.handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                        value={formikLogin.values.password}
                        onChange={formikLogin.handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-nattu focus:ring-nattubtn border-gray-300 rounded"
                      value={formikLogin.values.rememberMe}
                      onChange={formikLogin.handleChange}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                    <div className="text-sm">
                      <Link
                        to="#"
                        className="font-medium text-sky-900 hover:text-yellow-800"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                  <p
                    className={
                      "mt-2 text-sm text-red-600 " +
                      (auth.error ? "visible" : "invisible")
                    }
                    id="email-error"
                  >
                    Invalid Username or Password
                  </p>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nattu hover:bg-nattudark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nattubtn"
                    >
                      Sign in
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
          ) : (
            <div className="mt-8">
              <div>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Reset your password
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Please enter your Email to reset your password.
                </p>
              </div>
              <div className="mt-6">
                <form
                  onSubmit={formikForgotPwd.handleSubmit}
                  method="POST"
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        name="email"
                        type="text"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nattubtn focus:border-nattubtn sm:text-sm"
                        value={formikForgotPwd.values.email}
                        onChange={formikForgotPwd.handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nattu hover:bg-nattudark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nattubtn"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nattu hover:bg-nattudark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nattubtn"
                    >
                      Continue
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
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
