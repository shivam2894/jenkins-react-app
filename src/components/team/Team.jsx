import { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import InviteEmployeeModal from "./InviteEmployeeModal";
import { fetchAllEmployees } from "../../redux";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import AccessDenied from "../common/AccessDenied";

const Team = () => {
  const dispatch = useDispatch();
  const parsedJWT = jwtDecode(localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  return (
    <>
    <ToastContainer/>
      <main className="flex-1">
        <div className="py-6">
          {parsedJWT.role[0].authority === "ROLE_COMPANYOWNER" ? (<div className="space-y-4 mx-auto px-4 sm:px-6 md:px-8">
            {/* ------------------------------------- */}
            <div className="shadow-sm h-24 rounded-md border-2 shadow-gray-300">
              <div className="flex w-full justify-between p-2">
                <h1 className="text-3xl font-semibold text-gray-700 font-sans mx-3">
                  Manage Team
                </h1>
                <div className="flex space-x-3">
                  <button
                    className="bg-nattubtn hover:bg-nattu text-white rounded-md px-3 py-1"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    Invite Employee
                  </button>
                </div>
              </div>
            </div>
            {/* ------------------------------------- */}
            <UsersTable
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            <InviteEmployeeModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            {/* /End replace */}
          </div>) : (<AccessDenied/>)}
        </div>
      </main>
    </>
  );
};

export default Team;
