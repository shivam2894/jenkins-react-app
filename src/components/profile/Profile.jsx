import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { getAuthenticatedRequest } from "../../redux";
import UpdateProfileModal from "./UpdateProfileModal";

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getAuthenticatedRequest().get(`/user/getUserInfo`).then((res) => {
      // console.log(res.data);
      setUserInfo(res.data);
    });
  }, []);
  return (
    <>
      <ToastContainer />
      {(userInfo != {}) && (<main className="">
        <div className="flex items-center  ">
          {/* <div className="w-screen h-screen bg-white flex flex-row flex-wrap p-3"> */}
          <div className="mx-auto w-5/6 my-4">
            {/* Profile Card */}
            <div
              className="rounded-lg shadow-lg shadow-black bg-nattu w-full flex flex-row flex-wrap p-3 antialiased "
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")',
                backgroundRepeat: "no-repat",
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
              }}
            >
              <div className="md:w-1/4 w-full">
                <img
                  className="rounded-lg shadow-lg antialiased"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  height={200}
                  width={200}
                />
              </div>
              <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap ">
                <div className="w-full text-left text-gray-700 font-semibold relative pt-3 md:pt-0">
                  <div className="text-3xl text-white leading-tight">
                    {userInfo.name}
                  </div>
                  <div className="text-normal font-serif text-gray-300 hover:text-gray-400 cursor-pointer">
                    <span className="border-b border-dashed border-gray-500 pb-1">
                      {userInfo.email}
                    </span>
                  </div>
                  <div className="text-md tracking-wider text-gray-300 hover:text-gray-400 cursor-pointer">
                    <span className="border-b border-dashed border-gray-500 pb-1">
                      {userInfo.dob}
                    </span>
                  </div>

                  <button
                    className="text-xl border-2  text-gray-300 hover:text-gray-400 cursor-pointer md:absolute bottom-0 right-0 bg-transparent rounded-md px-4 py-1"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
            {/* End Profile Card */}
          </div>
        </div>
        {/* </div> */}
        <UpdateProfileModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        {/* ------------company detail----------------- */}
        <div className="mx-auto w-5/6 ">
          {/* Profile Card */}
          <div
            className="rounded-lg shadow-lg shadow-black bg-nattu w-full flex flex-row flex-wrap p-3 antialiased  "
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")',
              backgroundRepeat: "no-repat",
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }}
          >
            <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap ">
              <div className="w-full  text-gray-700 font-semibold relative pt-3 md:pt-0">
                <div className="text-2xl text-white leading-tight">
                  {userInfo.companyName}
                </div>
                <div className="text-normal tracking-wider text-gray-300 hover:text-gray-400 cursor-pointer">
                  <span className="  border-gray-500 pb-1">
                    {userInfo.gstin}
                  </span>
                </div>
                <div className="text-normal text-gray-300 hover:text-gray-400 cursor-pointer">
                  <span className=" border-gray-500 pb-1">
                    {userInfo.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* End Profile Card */}
        </div>
      </main>)}
    </>
  );
}

export default Profile;
