import React, { useState } from "react";
import user from "../assets/user.png";
import { ImgtoBase64 } from "../utility/ImgtoBase64";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [img, setImg] = useState("");
  const [data, setData] = useState({
    image: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    bio: "",
    password: "",
    confirmpswd: "",
  });
  function handleSubmit(event) {
    event.preventDefault();
    setShow(true);
    if (data.password === data.confirmpswd) {
      axios
        .post(process.env.REACT_APP_SERVER_DOMAIN + "/register", data)
        .then((response) => {
          if (response.data.alert) {
            setData({
              image: "",
              firstname: "",
              lastname: "",
              email: "",
              phone: "",
              bio: "",
              password: "",
              confirmpswd: "",
            });
            setImg("");
            // setTimeout(()=>{

            // },1000)
          }
          setShow(false);
          toast(response.data.message);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast("Password does not Match");
    }
  }
  async function handleUpload(event) {
    const imgurl = await ImgtoBase64(event.target.files[0]);
    const uploadImg = event.target.files[0];
    setImg(imgurl);
    const formData = new FormData();
    formData.append("file", uploadImg);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    axios
      .post(
        "https://api.cloudinary.com/v1_1/" +
          process.env.REACT_APP_CLOUD_NAME +
          "/upload",
        formData
      )
      .then((response) => {
        console.log(response.data.url, "img url");
        setData((prevValue) => {
          return {
            ...prevValue,
            image: response.data.url,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    console.log(data);
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
              <img src={img ? img : user} className="w-full h-full "></img>

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
            <div className="w-full flex  justify-center gap-3 items-center">
              {show ? (
                <button
                  className="text-white px-3 py-1 rounded-md border-2 text-lg md:text-xl md:hover:scale-110 duration-200 md:hover:bg-white md:hover:text-black flex justify-between items-center"
                  disabled
                >
                  {" "}
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>{" "}
                  Sign Up
                </button>
              ) : (
                <button className="text-white px-3 py-1 rounded-md border-2 text-lg md:text-xl md:hover:scale-110 duration-200 md:hover:bg-white md:hover:text-black flex justify-between items-center">
                  {" "}
                  Sign Up
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
