import jwtDecode from "jwt-decode";
import StockValuationByCategory from "./StockValuationByCategory";
import TransactionValuationByYear from "./TransactionValuationByYear";
import AccessDenied from "../common/AccessDenied";

const Report = () => {
  const parsedJWT = jwtDecode(localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken"));

  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          {parsedJWT.role[0].authority === "ROLE_COMPANYOWNER" ? (
            <div className="space-y-4 mx-auto px-4 sm:px-6 md:px-8">
              {/* ------------------------------------- */}
              <div className="shadow-sm h-24 rounded-md border-2 shadow-gray-300">
                <div className="flex w-full justify-between p-2">
                  <h1 className="text-3xl font-semibold text-gray-700 font-sans mx-3">
                    Business Intelligence
                  </h1>
                  <h1 className="text-xl font-semibold text-gray-700 font-sans mx-3">
                    {new Date().toLocaleDateString("en-IN")}
                  </h1>
                </div>
              </div>
              <StockValuationByCategory />
              <TransactionValuationByYear />
              {/* ------------------------------------- */}
            </div>
          ) : (
            <AccessDenied />
          )}
        </div>
      </main>
    </>
  );
};

export default Report;
