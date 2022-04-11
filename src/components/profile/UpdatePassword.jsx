import { getAuthenticatedRequest } from "../../redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function UpdatePassword({ setIsModalOpen }) {
  const formik = useFormik({
    initialValues: {
      password: "",
      newpassword: "",
      cnewpassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
          "Password must contain minimum six characters, at least one letter, one number and one special character"
        )
        .required("Password is required"),
      newpassword: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
          "Password must contain minimum six characters, at least one letter, one number and one special character"
        )
        .required("Password is required"),
      cnewpassword: Yup.string().oneOf(
        [Yup.ref("newpassword"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      getAuthenticatedRequest()
        .post(`/user/changePassword`, {
          oldPassword: values.password,
          newPassword: values.newpassword,
        })
        .then((res) => {
          localStorage.setItem("jwtToken", res.data.jwt);
          setIsModalOpen(false);
          toast.success("Password Changed Successfully");
        })
        .catch((err) => toast.error(err.response.data.message));
    },
  });

  return (
    <div className=" ">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm space-y-2 mx-auto p-2"
      >
        <div className="flex items-center border-b border-nattu py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0"
            name="password"
            type="password"
            placeholder="Old Password"
            aria-label="Full name"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          {formik.touched.password && formik.errors.password ? (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {formik.errors.password}
            </p>
          ) : null}
        </div>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0"
            name="newpassword"
            type="password"
            placeholder="New Password"
            aria-label="Full name"
            value={formik.values.newpassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          {formik.touched.newpassword && formik.errors.newpassword ? (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {formik.errors.newpassword}
            </p>
          ) : null}
        </div>
        <div className="flex items-center border-b border-nattu py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0"
            name="cnewpassword"
            type="password"
            placeholder="Confirm new password"
            aria-label="Full name"
            value={formik.values.cnewpassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          {formik.touched.cnewpassword && formik.errors.cnewpassword ? (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {formik.errors.cnewpassword}
            </p>
          ) : null}
        </div>
        <button
          className="flex-shrink-0 bg-nattubtn hover:bg-nattu border-nattubtn hover:border-nattu text-sm border-4 text-white py-1 px-2 rounded "
          type="submit"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
