import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import DashboardBar from "../components/DashboardBar";
import Profile from "../components/Profile";
import User from "../components/User";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../features/userSlice";

import { RotatingLines } from 'react-loader-spinner'



function Dashboard() {
 

  const [isLoading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("dashboardToken");
    if (token) {
    
      axios
        .get(process.env.REACT_APP_SERVER_DOMAIN + "/dashboard", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          
          dispatch(loginRedux(response.data.result[0]));
          setData(response.data.result[0])
          setLoading(false);
       
        });
    } else {
      navigate("/login");
    }
  }, []);

  const data = useSelector((state) => state.user.userList);

  return (
    <>
    {
        (isLoading) ?
        <div className="w-full h-screen flex justify-center items-center bg-hero_Blue">
        <RotatingLines
  strokeColor="#1E2875"
  strokeWidth="5"
  animationDuration="0.75"
  width="150"
  visible={true}
></RotatingLines>
</div>
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
