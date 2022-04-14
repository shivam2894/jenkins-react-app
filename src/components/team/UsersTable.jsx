import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "@heroicons/react/outline";

import { changeTeamPage, removeEmployee } from "../../redux";

const UsersTable = () => {
  const team = useSelector((state) => state.team);
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      USERNAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      DOB
                    </th>
                    <th
                      scope="col"
                      className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {/* <span className="sr-only">Edit</span> */}
                      Actions
                    </th>
                  </tr>
                </thead>
                {team.employees.length > 0 && (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {team.employees.map((emp, index) => (
                      <tr
                        key={index}
                        className="hover:bg-nattu hover:text-white transition ease-out duration-200"
                      >
                        <td className="px-6 py-4 text-sm whitespace-nowrap ">
                          {emp.userName}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap ">
                          {emp.name}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap ">
                          {emp.email}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap ">
                          {emp.dob}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-right flex space-x-2">
                          <button
                            onClick={() =>
                              swal({
                                title: "Are you sure you want to remove employee details?",
                                text: `Employee name: ${emp.name}`,
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              })
                              .then((willDelete) => {
                                if (willDelete) {
                                  dispatch(removeEmployee(emp.userName));
                                }
                              })
                            }
                            className="text-red-600 hover:text-red-900 cursor-pointer"
                          >
                            <TrashIcon className="w-6" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
                {team.loading && (
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
                    disabled={team.currPage === 0 ? true : false}
                    className={
                      "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 " +
                      (team.currPage !== 0
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-200")
                    }
                    onClick={() => {
                      dispatch(
                        changeTeamPage(
                          team.currPage === 0
                            ? team.currPage
                            : team.currPage - 1
                        )
                      );
                    }}
                  >
                    Previous
                  </button>
                  <button
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => {
                      dispatch(changeTeamPage(team.currPage + 1));
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

export default UsersTable;
