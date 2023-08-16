import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { connectionRedux, loginRedux } from '../features/userSlice';
import DashboardBar from '../components/DashboardBar';
import Profile from '../components/Profile';
import { RotatingLines } from 'react-loader-spinner'
import ProfileConn from '../components/ProfileConn';
import ConnectionDetail from '../components/ConnectionDetail';
function Connection() {
    

    const [isLoading, setLoading] = useState(true);
    const [connection,setconnection]=useState(true)
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
        
       
        });
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("dashboardToken");
    if (token) {
     
      axios
        .get(process.env.REACT_APP_SERVER_DOMAIN + "/connection", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
           
          dispatch(connectionRedux(response.data.result[0]));
          setData(response.data.result[0])
          setLoading(false);
       
        });
    } else {
      navigate("/login");
    }
  }, []);
 
  const conndata = useSelector((state) => state.user.connectionList);
 
  return (
   <>
    {
        (isLoading)  ?<div className="w-full h-screen flex justify-center items-center bg-hero_Blue">
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
        <ProfileConn></ProfileConn>
        <ConnectionDetail></ConnectionDetail> 
      </div>
    }
   </>
  )
}

export default Connection