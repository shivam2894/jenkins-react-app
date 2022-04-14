import { getAuthenticatedRequest } from "../../redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function UpdateInfo({ setIsModalOpen }) {

  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      dob: Yup.date().max(new Date(Date.now() - (31556952000 * 10)), "Minimum age should be 10 years").required("DOB is required"),
      email: Yup.string().email().required("Email is required")
    }),
    onSubmit: (values) => {
      getAuthenticatedRequest()
        .post(`/user/changeUserInfo`, values)
        .then((res) => {
          setIsModalOpen(false);
          toast.success("Updated Successfully");
        })
        .catch((err) => toast.error("Email already in use. Choose another email"));
    },
  });

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-sm space-y-2 mx-auto p-2">
        <div className="flex items-center border-b border-nattu py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0"
            name="name"
            type="text"
            placeholder="Full Name"
            aria-label="Full name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          {formik.touched.name && formik.errors.name ? (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {formik.errors.name}
            </p>
          ) : null}
        </div>
        <div className="flex items-center border-b border-nattu py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0"
            name="dob"
            type="text"
            placeholder="Date Of Birth"
            aria-label="Date Of Birth"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={(e) => (e.currentTarget.type = "date")}
          />
        </div>
        <div>
          {formik.touched.dob && formik.errors.dob ? (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {formik.errors.dob}
            </p>
          ) : null}
        </div>
        <div className="flex items-center border-b border-nattu py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0"
            name="email"
            type="email"
            placeholder="Email"
            aria-label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          {formik.touched.email && formik.errors.email ? (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {formik.errors.email}
            </p>
          ) : null}
        </div>
        <button
          className="flex-shrink-0 bg-nattubtn hover:bg-nattu border-nattubtn hover:border-nattu text-sm border-4 text-white py-1 px-2 rounded "
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateInfo;
