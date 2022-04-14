import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingImage from "../../images/landingimage.png"

const Authentication = () => {
  return (
    <>
    <ToastContainer/>
      <div className="min-h-screen flex flex-row-reverse">
        <Outlet/>
        <div className="hidden lg:block relative w-0 flex-1 bg-teal-100">
          <img
            className="absolute inset-0 m-auto object-cover bg-teal-100"
            src={LandingImage}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Authentication;
