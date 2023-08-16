import React, { useState } from "react";
import menu from "../assets/menu.svg";
import notification from "../assets/Notification.svg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../assets/logo.svg";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header(props) {

  const data=useSelector((state)=>state.user.userList);
  const [show, setShow] = useState(false);
  const navigate=useNavigate();

  function handleLogout(){
    localStorage.removeItem("dashboardToken");
    toast("Loged Out successfully")
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  }
  function handleclick() {
    setShow(!show);
  }
  console.log(show);
  console.log(props, "user data");
  return (
    <>
      {/* hamburger menu */}
      {show &&  <div className=" md:flex flex-col justify-between items-start fixed  top-0 z-40 left-0 bg h-screen w-1/2 bg-white border-[1px] shadow-sm">
      <div ></div>

        <div className="flex flex-col justify-between items-center w-full">
        <div className="w-full flex flex-col justify-normal gap-3 items-center  pr-2 my-1">
        <div className="w-full flex items-end justify-end"><AiOutlineClose size={20} onClick={()=>setShow(!show)} className="text-right"></AiOutlineClose></div>
        <p className="text-[#222222E5] text-lg  font-semibold border-[1px] px-2 py-2 drop-shadow-md rounded-lg font-body cursor-pointer w-5/6 ">
            Dashboard
          </p></div>
         
          <div className="w-full flex justify-between items-center">
         
            <p className="text-[#413B89] text-lg p-2 m-4  font-semibold font-myfont border-[1px] border-[#413B89]  drop-shadow-md rounded-lg cursor-pointer w-full "onClick={()=>navigate("/")}>
              {" "}
              My Profile
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
          
            <p className="text-[#413B89] text-xl p-2 m-4 font-semibold font-myfont border-[1px] border-[#413B89]  drop-shadow-md rounded-lg cursor-pointer w-full " onClick={()=>navigate("/connection")}>
              {" "}
              My Connections
            </p>
          </div>
        </div>
        <p
          className="text-[#222222] text-xl px-4 py-2 w-5/6  mx-auto  font-semibold font-body hover:border-[1px] border-[#222222]  drop-shadow-md rounded-lg cursor-pointer  "
          onClick={handleLogout}
        >
          Log Out
        </p>
      </div>}
     

      {/* Herder section */}
      <div className="w-full  fixed z-40 bg-[#FFFFFF]   flex justify-between border-[1px] border-[#CECECE] shadow-[#CECECE] shadow-sm items-center">
        <div className="flex items-center justify-between mx-2">
          <img src={menu} className="w-10" onClick={handleclick}></img>
          <img src={logo} className="w-20"></img>
        </div>
        <div className="flex flex-row justify-between  items-center">
          <img src={notification} className="w-6 md:w-8"></img>
          <div className="flex justify-between items-center md:mx-8 mx-4 my-4 shadow-sm md:border-[1px] rounded-lg md:p-4 md:border-[#E8EFF7] md:bg-[#FFFFFF] gap-3">
            <div className="w-[50px] h-[50px] border-[1px] md:rounded-xl rounded-full overflow-hidden ">
              <img src={data[0].image ?data[0].image:logo} className="w-full bg-cover h-full"></img>
            </div>
            <div className="md:flex flex-col items-start justify-between hidden">
              <p className="font-medium text-[#373B5C] text-md">
                Welcome back,
              </p>
              <p className="font-medium text-[#373B5C] text-2xl">{`${data[0].firstname} ${data[0].lastname}`}</p>
            </div>
            <p className="ml-3 md:flex hidden">
              <IoIosArrowDown color="#373B5C" size={"30px"}></IoIosArrowDown>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
