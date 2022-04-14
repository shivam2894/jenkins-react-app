import swal from 'sweetalert';
import {
  TrashIcon,
  DocumentDownloadIcon,
  ArrowDownIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeTransactionPage,
  deleteTransaction,
  updateTransactionStatus,
} from "../../redux";

const statusStyles = {
  RECEIVED: "bg-green-100 text-green-800",
  NOTRECEIVED: "bg-red-100 text-red-800",
  DISPATCHED: "bg-green-100 text-green-800",
  NOTDISPATCHED: "bg-yellow-100 text-yellow-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TransactionsTable = () => {
  const transaction = useSelector((state) => state.transaction);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      COMPANY NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      TYPE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider flex"
                    >
                      LAST MODIFIED DATE
                      <ArrowDownIcon className="w-4 h-5 text-red-500" />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                {transaction.transactions.length > 0 && (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transaction.transactions.map((tx, index) => (
                      <tr
                        key={index}
                        className="hover:bg-nattu hover:text-white transition ease-out duration-200"
                      >
                        <td className="px-6 py-4 text-sm whitespace-nowrap font-bold">
                          {tx.id}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap ">
                          {tx.companyName}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap ">
                          {tx.transactionName}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap ">
                          {tx.transactionType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <select
                            defaultValue={tx.transactionStatus}
                            className={classNames(
                              statusStyles[tx.transactionStatus],
                              "inline-flex items-center w-36 px-2 rounded-full text-xs font-medium capitalize"
                            )}
                            onChange={(e) =>
                              dispatch(
                                updateTransactionStatus(tx.id, e.target.value)
                              )
                            }
                          >
                            {tx.transactionType === "PURCHASE" && (
                              <option className="bg-green-100" value="RECEIVED">
                                RECEIVED
                              </option>
                            )}
                            {tx.transactionType === "PURCHASE" && (
                              <option
                                className="bg-red-100"
                                value="NOTRECEIVED"
                              >
                                NOT RECEIVED
                              </option>
                            )}
                            {tx.transactionType === "SALES" && (
                              <option
                                className="bg-green-100"
                                value="DISPATCHED"
                              >
                                DISPATCHED
                              </option>
                            )}
                            {tx.transactionType === "SALES" && (
                              <option
                                className="bg-yellow-100"
                                value="NOTDISPATCHED"
                              >
                                NOT DISPATCHED
                              </option>
                            )}
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap ">
                          {tx.lastModifiedDate}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-right flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900 cursor-pointer"
                            onClick={() =>
                              navigate("/user/invoice", {
                                state: { transactionId: tx.id },
                              })
                            }
                          >
                            <DocumentDownloadIcon className="w-6" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 cursor-pointer"
                            onClick={() =>
                              swal({
                                title: "Are you sure you want to delete this Transaction?",
                                text: `${tx.transactionName}`,
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              })
                              .then((willDelete) => {
                                if (willDelete) {
                                  dispatch(deleteTransaction(tx.id));
                                }
                              })
                            }
                          >
                            <TrashIcon className="w-6" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
                {transaction.loading && (
                  <tbody className="bg-white divide-y divide-gray-200 animate-pulse">
                    <tr>
                      {[1, 2, 3, 4, 5, 6, 7].map((ele, idx) => (
                        <td
                          key={idx}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                        >
                          <div className="h-2 bg-slate-700 rounded"></div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {[1, 2, 3, 4, 5, 6, 7].map((ele, idx) => (
                        <td
                          key={idx}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                        >
                          <div className="h-2 bg-slate-700 rounded"></div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {[1, 2, 3, 4, 5, 6, 7].map((ele, idx) => (
                        <td
                          key={idx}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                        >
                          <div className="h-2 bg-slate-700 rounded"></div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                )}
              </table>
              <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                aria-label="Pagination"
              >
                <div className="flex-1 flex justify-between sm:justify-end">
                  <button
                    disabled={transaction.currPage === 0 ? true : false}
                    className={
                      "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 " +
                      (transaction.currPage !== 0
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-200")
                    }
                    onClick={() => {
                      dispatch(
                        changeTransactionPage(
                          transaction.currPage === 0
                            ? transaction.currPage
                            : transaction.currPage - 1
                        )
                      );
                    }}
                  >
                    Previous
                  </button>
                  <button
                    disabled={!transaction.nextExists}
                    className={
                      "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 " +
                      (transaction.nextExists
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-200")
                    }
                    onClick={() => {
                      dispatch(changeTransactionPage(transaction.currPage + 1));
                    }}
                  >
                    Next
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
