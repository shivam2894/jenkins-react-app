import { getAuthenticatedRequest } from "../../redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function UpdateCompanyDetails({ setIsModalOpen }) {

  const formik = useFormik({
    initialValues: {
      companyName: "",
      gstin: "",
      address: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().max(250)
        .required("Company Name is required"),
      gstin: Yup.string()
        .min(15, "GSTIN Must be of 15 characters")
        .max(15, "GSTIN Must be of 15 characters")
        .required("GSTIN is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      getAuthenticatedRequest()
        .patch(`/companies/editUserCompany`, values)
        .then((res) => {
          setIsModalOpen(false);
          toast.success("Company details updated successfully");
        })
        .catch((err) => toast.error(err.response.data.message));
    },
  });

  return (
    <div className=" ">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-sm space-y-2 mx-auto p-2">
        <div className="flex items-center border-b border-nattu py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0"
            name="companyName"
            type="text"
            placeholder="Company Name"
            aria-label="Full name"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          {formik.touched.companyName && formik.errors.companyName ? (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {formik.errors.companyName}
            </p>
          ) : null}
        </div>
        <div className="flex items-center border-b border-nattu py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0"
            name="gstin"
            type="text"
            placeholder="GSTIN"
            maxLength={15}
            aria-label="Full name"
            value={formik.values.gstin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          {formik.touched.gstin && formik.errors.gstin ? (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {formik.errors.gstin}
            </p>
          ) : null}
        </div>
        <div className="flex items-center border-b border-nattu py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0"
            name="address"
            type="text"
            placeholder="Address"
            aria-label="Full name"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          {formik.touched.address && formik.errors.address ? (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {formik.errors.address}
            </p>
          ) : null}
        </div>
        <button
          className="flex-shrink-0 bg-nattubtn hover:bg-nattu border-nattubtn hover:border-nattu text-sm border-4 text-white py-1 px-2 rounded "
          type="submit"
        >
          Edit Details
        </button>
      </form>
    </div>
  );
}

export default UpdateCompanyDetails;
