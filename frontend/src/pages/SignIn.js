import React, { useState } from "react";
import user from "../assets/user.png";
import { ImgtoBase64 } from "../utility/ImgtoBase64";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignIn() {

    const navigate=useNavigate();

    const [img,setImg]=useState("")
    const [data,setData]=useState({
        image:"",
        firstname:"",
        lastname:"",
        email:"",
        phone:"",
        bio:"",
        password:"",
        confirmpswd:"",
    })
  function handleSubmit(event) {
    event.preventDefault();
if(data.password===data.confirmpswd)
{
    axios.post(process.env.REACT_APP_SERVER_DOMAIN +"/register",data).then((response)=>{
       
        if(response.data.alert)
        {
            setData({
                image:"",
                firstname:"",
                lastname:"",
                email:"",
                phone:"",
                bio:"",
                password:"",
                confirmpswd:"",
            })
            setImg("");
            setTimeout(()=>{
             navigate("/login");
            },1000)
        }
      
        toast(response.data.message)
    }).catch((err)=>{
        console.log(err);
    })
}
else{
    toast("Password does not Match")
}


  }
   async function handleUpload(event) {
    
    const imgurl= await ImgtoBase64(event.target.files[0])
    setImg(imgurl)
 

    setData((prevValue)=>{
        return{
            ...prevValue,
            image:imgurl,
        }
       
    })


  }
  function handleChange(event){
    const {name,value}=event.target;
    setData((prevValue)=>{
        return{
            ...prevValue,
            [name]:value
        }
    })
  

  }
  return (
    <>
      <div className="flex items-center justify-center  ">
        <div className=" flex flex-col justify-between items-center shadow-lg shadow-black bg-[#1E2875] p-5 border-2 border-transparent rounded-lg md:w-1/3 w-full m-6">
          <h1 className="text-white text-3xl font-semibold">SIGN UP</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-start gap-4 p-2 md:p-4 w-full  "
          >
            <div className="w-24 h-24 overflow-hidden rounded-full bg-white drop-shadow-md shadow-md m-auto">
              <img src={ img? img: user} className="w-full h-full "></img>

              <label htmlFor="profileImg">
                <div className="absolute bottom-0 h-1/4 right-1 bg-slate-700 bg-opacity-90 w-full text-center cursor-pointer">
                  <p className="text-sm text-white">Upload</p>
                </div>
                <input
                  type={"file"}
                  id="profileImg"
                  accept="image/*"
                  className="invisible"
                  required
                  onChange={handleUpload}
                ></input>
              </label>
            </div>
            <div className="w-full flex flex-col justify-between gap-1 items-start">
              <label htmlFor="firstName" className="text-xl text-white">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstname"
                value={data.firstname}
                required
                placeholder="Enter First Name"
                onChange={handleChange}
                className=" w-full p-2 bg-blue-100 rounded-md"
              ></input>
            </div>
            <div className="w-full flex flex-col justify-between gap-1 items-start">
              <label htmlFor="lastName" className="text-xl text-white">
                Last Name
              </label>
              <input
                type="text"
                id="lastame"
                name="lastname"
                value={data.lastname}
                required
                onChange={handleChange}
                placeholder="Enter Last Name"
                className=" w-full p-2 bg-blue-100 rounded-md"
              ></input>
            </div>
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
              <label htmlFor="firstName" className="text-xl text-white">
                Phone number
              </label>
              <input
                type="text"
                id="number"
                name="phone"
                required
                value={data.phone}
                onChange={handleChange}
                placeholder="Enter Phone number (+91 1234567890)"
                className=" w-full p-2 bg-blue-100 rounded-md"
              ></input>
            </div>
            <div className="w-full flex flex-col justify-between gap-3 items-start">
              <label htmlFor="about" className="text-xl text-white">
                About
              </label>
              <textarea
                id="about"
                name="bio"
                value={data.bio}
                required
                onChange={handleChange}
                rows={4}
                placeholder="Write a short Bio."
                className=" w-full p-2 bg-blue-100 rounded-md"
              ></textarea>
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
            <div className="w-full flex flex-col justify-between gap-3 items-start">
              <label htmlFor="confirm" className="text-xl text-white">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm"
                name="confirmpswd"
                required
                value={data.confirmpswd}
                onChange={handleChange}
                placeholder="Confirm Above Entered Password"
                className=" w-full p-2 bg-blue-100 rounded-md"
              ></input>
            </div>
            <div className="w-full flex flex-col justify-between gap-3 items-center text-white ">
              {" "}
              <p className="text-lg md:text-xl">
                {" "}
                Already Registered?{" "}
                <a
                  href="/login"
                  className="underline text-lg md:text-xl hover:text-black"
                >
                  {" "}
                  Login
                </a>{" "}
              </p>
            </div>
            <div className="w-full flex flex-col justify-between gap-3 items-center">
            <button className="text-white px-3 py-1 rounded-md border-2 text-lg md:text-xl md:hover:scale-110 duration-200 md:hover:bg-white md:hover:text-black"> Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
