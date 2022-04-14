import "./App.css";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Login from "./components/landing/Login";
import SignUp from "./components/landing/SignUp";
import ResetPassword from "./components/landing/ResetPassword";
import Dashboard from "./components/common/Dashboard";
import Home from "./components/home/Home";
import UpdateProfile from "./components/profile/UpdateProfile";
import Profile from "./components/profile/Profile";
import Inventory from "./components/inventory/Inventory";
import Transactions from "./components/transactions/Transactions";
import Invoice from "./components/transactions/Invoice";
import Contacts from "./components/contacts/Contacts";
import Team from "./components/team/Team";
import Report from "./components/analytics/Report";
import NotFound from "./components/common/NotFound";
import store from "./redux/store";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="changePassword" element={<ResetPassword />} />
        </Route>
        <Route path="/user" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<UpdateProfile />} />
          <Route
            path="inventory"
            element={
              <ErrorBoundary>
                <Inventory />
              </ErrorBoundary>
            }
          />
          <Route
            path="transactions"
            element={
              <ErrorBoundary>
                <Transactions />
              </ErrorBoundary>
            }
          />
          <Route path="invoice" element={<Invoice />} />
          <Route
            path="contacts"
            element={
              <ErrorBoundary>
                <Contacts />
              </ErrorBoundary>
            }
          />
          <Route
            path="team"
            element={
              <ErrorBoundary>
                <Team />
              </ErrorBoundary>
            }
          />
          <Route
            path="reports"
            element={
              <ErrorBoundary>
                <Report />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
