import React from 'react'
import { toast } from 'react-hot-toast';
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
function DashboardBar() {
 const navigate=useNavigate();
  function handleConnection(){
navigate("/connection")
  }

  function handleLogout(){
    localStorage.removeItem("dashboardToken");
    toast("Loged Out successfully")
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  }
  return (
   <>
      <div className="hidden md:flex flex-col justify-between items-start md:fixed absolute top-0 z-40 left-0 bg h-screen w-1/6 bg-white border-[1px] shadow-sm">
          <div className="flex flex-col justify-between items-center">
            <p className="text-[#222222E5] text-2xl ml-16 my-8 font-semibold border-[1px] px-6 py-2 drop-shadow-md rounded-lg font-body cursor-pointer ">
              Dashboard
            </p>
            <div className="w-full flex justify-between items-center">
              <p className="ml-4 text-[#413B89]">
                <IoIosArrowForward></IoIosArrowForward>
              </p>
              <p className="text-[#413B89] text-xl p-2 m-4 font-semibold font-myfont border-[1px] border-[#413B89]  drop-shadow-md rounded-lg cursor-pointer w-full " onClick={()=>navigate("/")}>
                {" "}
                My Profile
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="ml-4 text-[#413B89]">
                <IoIosArrowForward></IoIosArrowForward>
              </p>
              <p className="text-[#413B89] text-xl p-2 m-4 font-semibold font-myfont border-[1px] border-[#413B89]  drop-shadow-md rounded-lg cursor-pointer w-full " onClick={handleConnection}>
                {" "}
                My Connections
              </p>
            </div>
          </div>
          <p className="text-[#222222] text-xl px-4 py-2 w-1/2 mx-auto my-5 font-semibold font-body hover:border-[1px] border-[#222222]  drop-shadow-md rounded-lg cursor-pointer  " onClick={handleLogout}>Log Out</p>
        </div>
   </>
  )
}

export default DashboardBar