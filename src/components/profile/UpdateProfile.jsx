import React from "react";
import { useState } from "react";
import { VscBriefcase } from "react-icons/vsc";
import { BsFillKeyFill } from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi";
import UpdatePassword from "./UpdatePassword";
import UpdateInfo from "./UpdateInfo";
import UpdateCompanyDetails from "./UpdateCompanyDetails";

function UpdateProfile() {
  const [info, setinfo] = useState(true);
  const [password, setpassword] = useState(false);
  const [companyDetails, setCompanyDetails] = useState(false);

  return (
    <div className="max-w-screen-md mx-auto border-2 bg-gray-50">
      <div className="p-4">
        <img
          src="https://www.citypng.com/public/uploads/preview/hd-profile-user-round-blue-icon-symbol-transparent-png-11639594354dzabzsbpuv.png"
          height={100}
          width={100}
          className="mx-auto"
        />
        <p className="mx-auto px-2 w-32">Upload Photo</p>
      </div>
      <div className="w-full bg-nattu">
        <ul className="grid grid-cols-3 gap-x-5 m-10 max-w-md mx-auto p-4">
          <li className="relative">
            <span className="text-white">
              <HiOutlineIdentification />
            </span>
            <button
              className="text-white"
              onClick={() => {
                setinfo(true);
                setpassword(false);
                setCompanyDetails(false);
              }}
            >
              Personal Info
            </button>
          </li>
          <li className="relative">
            <span className="text-white">
              <BsFillKeyFill />
            </span>
            <button
              className="text-white"
              onClick={() => {
                setpassword(true);
                setinfo(false);
                setCompanyDetails(false);
              }}
            >
              Password
            </button>
          </li>
          <li className="relative">
            <span className="text-white">
              <VscBriefcase />
            </span>
            <button
              className="text-white"
              onClick={() => {
                setCompanyDetails(true);
                setinfo(false);
                setpassword(false);
              }}
            >
              Company Details
            </button>
          </li>
        </ul>
      </div>
      <div className="">
        {info && <UpdateInfo />}
        {password && <UpdatePassword />}
        {companyDetails && <UpdateCompanyDetails />}
      </div>
    </div>
  );
}

export default UpdateProfile;
