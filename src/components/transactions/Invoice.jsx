import { useEffect, useState, useRef } from "react";
import { getAuthenticatedRequest } from "../../redux";
import { MdOutlineEmail } from "react-icons/md";
import html2canvas from "html2canvas";
import { useNavigate, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";

var formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function Invoice() {
  const printRef = useRef();
  const navigate = useNavigate();
  var backHandler = () => {
    navigate("/user/transactions");
  };
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };
  const location = useLocation();
  const [invoice, setInvoice] = useState(null);
  useEffect(() => {
    console.log(location.state.transactionId);
    getAuthenticatedRequest()
      .get(`/invoice/details/${location.state.transactionId}`)
      .then((res) => setInvoice(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="">
        <div ref={printRef} className="flex items-center justify-center ">
          {invoice && (
            <div className=" md:w-full lg:w-4/5 xl:w-3/5 my-16 bg-white shadow-lg">
              <div className="flex justify-between p-4">
                <div>
                  <h1 className="text-3xl italic font-extrabold tracking-widest text-indigo-500">
                    {invoice.ownerCompanyName}
                  </h1>
                  <p className="text-base"></p>
                </div>
                <div className="p-2">
                  <ul className="flex">
                    <li className="flex flex-col items-center p-2 border-l-2 border-nattubtn-200">
                      <MdOutlineEmail className="text-blue-700" size={20} />
                      <span className="text-sm flex flex-wrap">{invoice.ownerEmail}</span>
                    </li>
                    <li className="flex flex-col p-2 border-l-2 border-nattubtn-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm">
                        {invoice.ownerCompanyAddress}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full h-0.5 bg-indigo-500" />
              <div className="flex justify-between p-4">
                {/*Order related info here */}
                <div>
                  <h6 className="font-bold">
                    Order ID :{" "}
                    <span className="text-sm font-medium">
                      {" "}
                      {invoice.invoiceId}
                    </span>
                  </h6>
                  <h6 className="font-bold">
                    Order Date :{" "}
                    <span className="text-sm font-medium">
                      {" "}
                      {invoice.orderDate}
                    </span>
                  </h6>
                </div>
                <div className="w-40">
                  <address className="text-sm">
                    <span className="font-bold"> Billed To : </span>
                    {invoice.companyAddress}
                  </address>
                </div>
                <div />
              </div>

              {/*Product list here */}
              <div className="flex justify-center p-4">
                <div className="border-b w-full border-gray-200 shadow">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-sm text-left text-gray-500 ">
                          Product ID
                        </th>
                        <th className="px-4 py-2 text-sm text-left text-gray-500 ">
                          Product Name
                        </th>
                        <th className="px-4 py-2 text-sm text-left text-gray-500 ">
                          Rate
                        </th>
                        <th className="px-4 py-2 text-sm text-left text-gray-500 ">
                          Quantity
                        </th>
                        <th className="px-4 py-2 text-sm text-left text-gray-500 ">
                          SubTotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {invoice.productList.map((item) => (
                        <tr key={item.productId} className="whitespace-nowrap">
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {item.productId}
                          </td>
                          <td className="px-6 py-4 text-sm text-left">
                            <div className="text-sm text-gray-900">
                              {item.productName} {/*Product Name */}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-left">
                            <div className="text-sm text-gray-500">
                              {formatter.format(item.rate)} {/*Product Rate */}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-left text-gray-500">
                            {item.quantity} {/*Quantity */}
                          </td>
                          <td className="px-6 py-4 text-sm text-left">
                            {formatter.format(item.rate * item.quantity)}{" "}
                            {/*Total */}
                          </td>
                        </tr>
                      ))}
                      {/*end map here */}

                      <tr className="text-white bg-gray-800">
                        <th colSpan={3} />
                        <td className="text-sm font-bold">
                          <b>Grand Total </b>
                        </td>
                        <td className="text-sm font-bold p-2">
                          <b>
                            {formatter.format(invoice.total)}{" "}
                            {/*Grand Total here */}
                          </b>
                        </td>
                      </tr>
                      {/*end tr*/}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-between p-4">
                <div>
                  <h3 className="text-xl">Terms And Condition :</h3>
                  <ul className="text-xs list-disc list-inside">
                    <li>
                      All accounts are to be paid within 7 days from receipt of
                      invoice.
                    </li>
                    <li>
                      To be paid by cheque or credit card or direct payment
                      online.
                    </li>
                    <li>
                      If account is not paid within 7 days the credits details
                      supplied.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-max-full h-0.5 mt-0" />
        <div className="p-4">
          <div className="flex items-center justify-center">
            Thank you very much for doing business with us.
          </div>

          <div className="flex items-center justify-center space-x-3 mt-2">
            <button
              onClick={handleDownloadPdf}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg
                class="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Download</span>
            </button>
            <button
              onClick={backHandler}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
