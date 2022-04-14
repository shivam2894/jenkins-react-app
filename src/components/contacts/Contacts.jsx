import { useState } from "react";
import ContactsTable from "./ContactsTable";
import AddContactModal from "./AddContactModal";
import { ToastContainer } from "react-toastify";

const Contacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <ToastContainer/>
      <main className="flex-1">
        <div className="py-6">
          <div className="space-y-4 mx-auto px-4 sm:px-6 md:px-8">
            {/* ------------------------------------- */}
            <div className="shadow-sm h-24 rounded-md border-2 shadow-gray-300">
              <div className="flex w-full justify-between p-2">
                <h1 className="text-3xl font-semibold text-gray-700 font-sans mx-3">
                  Contacts
                </h1>
                <div className="flex">
                  <button
                    className="bg-nattubtn hover:bg-nattu text-white rounded-md px-3 py-1"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    Add Contact
                  </button>
                </div>
              </div>

              <div className="w-full flex flex-wrap my-4 space-x-2 px-2">
                <div className="flex my-auto space-x-2">
                </div>
              </div>
            </div>
            {/* ------------------------------------- */}
              <AddContactModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            <ContactsTable
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Contacts;
