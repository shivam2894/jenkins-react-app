import { useState, useEffect } from "react";
import TransactionTable from "./TransactionsTable";
import AddTransactionModal from "./AddTransactionModal";
import { useDispatch, useSelector } from "react-redux";
import { changeEndDateFilter, changeStartDateFilter, changeStatusFilter, fetchAllTransactions, resetInventoryFilters, resetTransactionFilters } from "../../redux";

const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const transaction = useSelector(state=>state.transaction);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetInventoryFilters());
    dispatch(fetchAllTransactions());
  }, []);

  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div className="space-y-4 mx-auto px-4 sm:px-6 md:px-8">
            {/* ------------------------------------- */}
            <div className="shadow-sm rounded-md border-2 shadow-gray-300 space-y-10">
              <div className="flex w-full justify-between p-2">
                <h1 className="text-3xl font-semibold text-gray-700 font-sans mx-3">
                  Transactions
                </h1>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-nattubtn hover:bg-nattu text-white rounded-md px-2 mx-3"
                >
                  + CREATE TRANSACTION
                </button>
              </div>
              <div className="md:flex justify-between p-2 pb-4">
                <div className="space-x-2 mx-3">
                  <span>FROM</span>
                  <input
                    type="date"
                    placeholder="from"
                    className="border-nattubtn focus:border-nattudark focus:ring-nattudark rounded-md"
                    value={transaction.startDateFilter}
                    onChange={(e)=>dispatch(changeStartDateFilter(e.target.value))}
                  />
                  <span>TO</span>
                  <input
                    type="date"
                    placeholder="to"
                    className="border-nattubtn focus:border-nattudark focus:ring-nattudark rounded-md"
                    value={transaction.endDateFilter}
                    onChange={(e)=>dispatch(changeEndDateFilter(e.target.value))}
                  />
                  <button onClick={()=>dispatch(fetchAllTransactions())}
                    className="px-2 py-2 border-2 rounded-md border-nattubtn hover:bg-gray-200 text-nattudark"
                  >
                    Search
                  </button>
                </div>
                <div className="flex mx-3 space-x-2">
                <select
                  id="filterByStatus"
                  name="filterByStatus"
                  className="w-36 px-1 my-auto cursor-pointer border-nattubtn focus:border-nattudark focus:ring-nattudark rounded-md sm:text-sm"
                  onChange={(e) => {
                    dispatch(changeStatusFilter(e.target.value));
                  }}
                  value={transaction.statusFilter}
                >
                  <option disabled value="">
                    Filter by Status
                  </option>
                  <option value="ALL">ALL</option>
                  <option value="RECEIVED">RECEIVED</option>
                  <option value="NOTRECEIVED">NOT RECEIVED</option>
                  <option value="DISPATCHED">DISPATCHED</option>
                  <option value="NOTDISPATCHED">NOT DISPATCHED</option>
                </select>
                <button onClick={()=>dispatch(resetTransactionFilters())} className="my-auto bg-nattubtn hover:bg-nattu text-white rounded-md px-3 py-1">
                  Reset Filters
                </button>
                </div>
              </div>
            </div>
            {/* --------------------------------------------------- */}
            <AddTransactionModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            {/* --------------------Table Component---------------- */}
            <TransactionTable />
            {/* --------------------------------------------------- */}
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Transactions;
