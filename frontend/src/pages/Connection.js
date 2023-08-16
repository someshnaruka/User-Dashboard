import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { connectionRedux, loginRedux } from '../features/userSlice';
import DashboardBar from '../components/DashboardBar';
import Profile from '../components/Profile';
import { Audio } from 'react-loader-spinner'
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
        
       
        });
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("dashboardToken");
    if (token) {
      console.log(token, "from localstorage");
      axios
        .get(process.env.REACT_APP_SERVER_DOMAIN + "/connection", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
            console.log(response.data,"Connection data from backnend");
          dispatch(connectionRedux(response.data.result[0]));
          setData(response.data.result[0])
          setLoading(false);
       
        });
    } else {
      navigate("/login");
    }
  }, []);
  console.log(userData, "user data value");
  const conndata = useSelector((state) => state.user.connectionList);
  console.log(conndata, "Connection redux store data");
  return (
   <>
    {
        (isLoading)  ?<Audio className="loadingContainer"
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
        <ProfileConn></ProfileConn>
        <ConnectionDetail></ConnectionDetail> 
      </div>
    }
   </>
  )
}

export default Connection