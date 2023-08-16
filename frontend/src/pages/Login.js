import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate=useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
    console.log(data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(process.env.REACT_APP_SERVER_DOMAIN + "/login", data)
      .then((response) => {
        console.log(response.data);
        if (response.data.alert) {
            localStorage.setItem("dashboardToken",response.data.result);
          setData({
            email: "",
            password: "",
          });
          setTimeout(() => {
            navigate("/")
          }, 1000);
        }
        toast(response.data.message);
        
      });
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className=" flex flex-col justify-between items-center shadow-lg shadow-black bg-[#1E2875] p-5 border-2 border-transparent rounded-lg md:w-1/3 w-full m-6">
          <h1 className="text-white text-3xl font-semibold">Login </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-start gap-4 p-2 md:p-4 w-full  "
          >
            <div className="w-full flex flex-col justify-between gap-3 items-start">
              <label htmlFor="firstName" className="text-xl text-white">
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="email"
                value={data.email}
                required
                onChange={handleChange}
                placeholder="Enter email address"
                className=" w-full p-2 bg-blue-100 rounded-md"
              ></input>
            </div>

            <div className="w-full flex flex-col justify-between gap-3 items-start">
              <label htmlFor="pswd" className="text-xl text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={data.password}
                onChange={handleChange}
                placeholder="Enter a password"
                className=" w-full p-2 bg-blue-100 rounded-md"
              ></input>
            </div>
            <div className="w-full flex flex-col justify-between gap-3 items-center text-white ">
              {" "}
              <p className="text-lg md:text-xl">
                {" "}
                New user?{" "}
                <a
                  href="/signin"
                  className="underline text-lg md:text-xl hover:text-black"
                >
                  {" "}
                  Sign Up
                </a>{" "}
              </p>
            </div>

            <div className="w-full flex flex-col justify-between gap-3 items-center">
              <button className="text-white px-3 py-1 rounded-md border-2 text-lg md:text-xl md:hover:scale-110 duration-200 md:hover:bg-white md:hover:text-black">
                {" "}
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
