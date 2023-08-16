import React from "react";
import Connectioncard from "./Connectioncard";
import { useDispatch, useSelector } from "react-redux";
import RemovedCard from "./RemovedCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AddRedux, ConnAddRedux, ConnRemoveRedux, RemoveRedux } from "../features/userSlice";

function ConnectionDetail() {
  const data = useSelector((state) => state.user.connectionList);
  const token = localStorage.getItem("dashboardToken");
  const dispatch=useDispatch();



  function handleAdd(value) {
    const info = {
      _id: data[0]._id,
      user: value,
    };

    axios
    .patch(
      process.env.REACT_APP_SERVER_DOMAIN + "/connectionData",
     info,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
 
      if (response.data.alert) {
        toast(response.data.message);
dispatch(AddRedux(value));
dispatch(RemoveRedux(value));
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }


  function handleDelete(value) {
    const info = {
        _id: data[0]._id,
        user: value,
      };
  
      axios
      .patch(
        process.env.REACT_APP_SERVER_DOMAIN + "/connectionDelete",
        info,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
      
        if (response.data.alert) {
        dispatch(ConnRemoveRedux(value));
        dispatch(ConnAddRedux(value));
          toast(response.data.message);
  
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }
  return (
    <>
      <div className=" flex flex-col justify-between items-center gap-14 bg-white  rounded-lg border-[#EBEBEE] absolute  md:w-[70%] w-[90%] md:top-64 top-40 md:right-[9%]  ">
        <div className=" flex justify-start md:flex-row flex-col items-center flex-wrap w-full gap-6">
          {data[0].connection.map((post, index) => {
            return (
              <Connectioncard
                key={index}
                id={post.id}
                name={post.name}
                job={post.job}
                company={post.company}
                img={post.img}
                ondelete={handleDelete}
              ></Connectioncard>
            );
          })}
        </div>
        <div className="flex justify-start items-center flex-col w-full gap-6">
          <h1 className="text-[#222222E5] font-body font-medium text-lg md:text-xl text-left w-full ">
            People you can also connect
          </h1>
          <div className="flex md:flex-row flex-col justify-start items-center flex-wrap w-full gap-6 mb-6">
            {data[0].removed.map((post, index) => {
              return (
                <RemovedCard
                  key={index}
                  id={post.id}
                  name={post.name}
                  job={post.job}
                  company={post.company}
                  img={post.img}
                  onadd={handleAdd}
                ></RemovedCard>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ConnectionDetail;
