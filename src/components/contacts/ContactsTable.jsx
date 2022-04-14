import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllContacts,
  changeContactPage,
  editContactOpen,
  deleteContact,
} from "../../redux";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

const ContactsTable = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchAllContacts(contacts.currPage));
  }, []);

  return (
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
                    GSTIN
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ADDRESS
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              {contacts.companies.length > 0 && (
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.companies.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-nattu hover:text-white transition ease-out duration-200"
                    >
                      <td className="px-6 py-4 text-sm whitespace-nowrap font-bold">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap ">
                        {item.companyName}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap ">
                        {item.gstin}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap ">
                        {item.address}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-right flex space-x-2">
                        <a
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                          onClick={() => {
                            dispatch(editContactOpen(item));
                            setIsModalOpen(true);
                          }}
                        >
                          <PencilIcon className="w-6" />
                        </a>
                        <a
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          // onClick={() => {
                          //   dispatch(deleteContact(item.id));
                          // }}
                          onClick={() =>
                            swal({
                              title: "Are you sure you want to remove this contact?",
                              text: `Company name: ${item.companyName}`,
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            })
                            .then((willDelete) => {
                              if (willDelete) {
                                dispatch(deleteContact(item.id));
                              }
                            })
                          }
                        >
                          <TrashIcon className="w-6" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
              {contacts.loading && (
                <tbody className="bg-white divide-y divide-gray-200 animate-pulse">
                  <tr>
                    {[1, 2, 3, 4, 5].map((ele, idx) => (
                      <td
                        key={idx}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                      >
                        <div className="h-2 bg-slate-700 rounded"></div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {[1, 2, 3, 4, 5].map((ele, idx) => (
                      <td
                        key={idx}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                      >
                        <div className="h-2 bg-slate-700 rounded"></div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {[1, 2, 3, 4, 5].map((ele, idx) => (
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
                  disabled={contacts.currPage === 0 ? true : false}
                  className={
                    "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 " +
                    (contacts.currPage !== 0
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-200")
                  }
                  onClick={() => {
                    dispatch(
                      changeContactPage(
                        contacts.currPage === 0
                          ? contacts.currPage
                          : contacts.currPage - 1
                      )
                    );
                  }}
                >
                  Previous
                </button>
                <button
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => {
                    dispatch(changeContactPage(contacts.currPage + 1));
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
  );
};

export default ContactsTable;
