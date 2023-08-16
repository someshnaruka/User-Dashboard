import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import DashboardBar from "../components/DashboardBar";
import Profile from "../components/Profile";
import User from "../components/User";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../features/userSlice";

import { Audio } from 'react-loader-spinner'



function Dashboard() {
 

  const [isLoading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("dashboardToken");
    if (token) {
      console.log(token, "from localstorage");
      axios
        .get(process.env.REACT_APP_SERVER_DOMAIN + "/dashboard", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
            console.log(response.data,"data from backnend");
          dispatch(loginRedux(response.data.result[0]));
          setData(response.data.result[0])
          setLoading(false);
       
        });
    } else {
      navigate("/login");
    }
  }, []);
  console.log(userData, "user data value");
  const data = useSelector((state) => state.user.userList);
  console.log(data, "redux store data");
  return (
    <>
    {
        (isLoading) ?<Audio className="loadingContainer"
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
></Audio>
:<div className="flex flex-col justify-between items-center h-full relative bg-[#FAFBFF]">
        <Header></Header>
        <DashboardBar></DashboardBar>
        <Profile></Profile>
<User></User>
      
      </div>
    }
      
    </>
  );
}

export default Dashboard;
