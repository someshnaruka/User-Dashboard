import React, { useEffect, useState } from "react";
import stars from "../assets/Stars.svg";
import vector from "../assets/Vector.svg";
import logo from "../assets/logo.svg";
import { ImgtoBase64 } from "../utility/ImgtoBase64";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import {
  AddcertiRedux,
  AddeduRedux,
  AddexpRedux,
  AddskillRedux,
  aboutRedux,
  deleteEduRedux,
  deleteExpRedux,
  deleteSkillRedux,
  deletecertiRedux,
  editCertiRedux,
  editEduRedux,
  editExpRedux,
  imageRedux,
  profileRedux,
} from "../features/userSlice";
import { IoIosAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

import Addexp from "./Addexp";
import AddExperience from "./AddExperience";
import Addedu from "./Addedu";

function User(props) {
  const data = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [imgValue, setValue] = useState({
    _id: data[0]._id,
    image: null,
  });
  const [add, setAdd] = useState(false);
  const [newskill, setNewskill] = useState("");

  const [user, setUser] = useState({
    _id: data[0]._id,
    firstname: data[0].firstname,
    lastname: data[0].lastname,
    phone: data[0].phone,
  });

  const [about, setAbout] = useState({
    _id: data[0]._id,
    bio: data[0].bio,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  const [change, setChange] = useState([]);

  const token = localStorage.getItem("dashboardToken");

  useEffect(() => {
    if(imgValue.image!=null)
    {
      handlePhoto();
    }
   
  }, [imgValue]);

  function handlePhoto() {

    axios
      .patch(process.env.REACT_APP_SERVER_DOMAIN + "/profileImg", imgValue, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          dispatch(imageRedux(response.data.result));
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        
      });
  }
 

  function handleAbout(event) {
    const { name, value } = event.target;

    setAbout((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleUpdatebio() {
    axios
      .patch(process.env.REACT_APP_SERVER_DOMAIN + "/profileData", about, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          dispatch(aboutRedux(about));
          setEdit(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSkill() {
    const updateSkill = {
      _id: data[0]._id,
      skills: [...data[0].skills, newskill],
    };

    axios
      .patch(
        process.env.REACT_APP_SERVER_DOMAIN + "/profileData",
        updateSkill,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          dispatch(AddskillRedux(newskill));
          setEdit(false);
          setAdd(false);
          setNewskill("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleNewskill(event) {
    setNewskill(event.target.value);
  }

  function handleprofile() {
    axios
      .patch(process.env.REACT_APP_SERVER_DOMAIN + "/profileData", user, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          dispatch(profileRedux(user));
          setEdit(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditData(value) {
    setChange([value]);
  }

  function handleEdit(value) {
    setEdit(value);
  }


  async function handleUpload(event) {
    setLoading(true);
    const imgurl = event.target.files[0];
    const formData = new FormData ();
    formData.append("file", imgurl);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    axios.post("https://api.cloudinary.com/v1_1/"+process.env.REACT_APP_CLOUD_NAME+"/upload",formData).then((response)=>{
 
      setValue((prevValue) => {
        return {
          ...prevValue,
          image: response.data.url,
        };
      });
      
    }).catch((err)=>{
      console.log(err);
    })
    
    
  }
 
  function handleCertiUpdate(value) {
    const certiData = {
      _id: data[0]._id,
      certification: [
        ...data[0].certification,
        {
          id: Math.floor(100000000 + Math.random() * 900000000),
          skill: value.skill,
          provider: value.provider,
        },
      ],
    };

    axios
      .patch(process.env.REACT_APP_SERVER_DOMAIN + "/profileData", certiData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          dispatch(AddcertiRedux(value));
          setEdit(false);
          document.body.style.overflowY = "visible";
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCertiedit(value) {
    dispatch(editCertiRedux(value));
    const editData = {
      _id: data[0]._id,
      field: "certification",
      certification: value,
    };

    axios
      .patch(process.env.REACT_APP_SERVER_DOMAIN + "/editCertiData", editData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          setEdit(false);
          document.body.style.overflowY = "visible";
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCertidelete(value) {
    dispatch(deletecertiRedux(value));
    const editData = {
      _id: data[0]._id,
      field: "certification",
      certification: value,
    };

    axios
      .patch(
        process.env.REACT_APP_SERVER_DOMAIN + "/deleteCertiData",
        editData,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          setEdit(false);
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleExpUpdate(value) {
    const expData = {
      _id: data[0]._id,
      experience: [...data[0].experience, value],
    };

    axios
      .patch(process.env.REACT_APP_SERVER_DOMAIN + "/profileData", expData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          dispatch(AddexpRedux(value));
          setEdit(false);
          document.body.style.overflowY = "visible";
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEduUpdate(value) {
    const eduData = {
      _id: data[0]._id,
      education: [...data[0].education, value],
    };
    axios
      .patch(process.env.REACT_APP_SERVER_DOMAIN + "/profileData", eduData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          dispatch(AddeduRedux(value));
          setEdit(false);
          document.body.style.overflowY = "visible";
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleExpedit(value) {
    dispatch(editExpRedux(value));
    const editData = {
      _id: data[0]._id,
      field: "certification",
      experience: value,
    };

    axios
      .patch(process.env.REACT_APP_SERVER_DOMAIN + "/editExpData", editData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          setEdit(false);
          document.body.style.overflowY = "visible";
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleExpdelete(value) {
    dispatch(deleteExpRedux(value));
    const editData = {
      _id: data[0]._id,
      field: "certification",
      experience: value,
    };

    axios
      .patch(process.env.REACT_APP_SERVER_DOMAIN + "/deleteExpData", editData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          setEdit(false);
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEduedit(value) {
    dispatch(editEduRedux(value));
    const editData = {
      _id: data[0]._id,
      field: "certification",
      education: value,
    };

    axios
      .patch(process.env.REACT_APP_SERVER_DOMAIN + "/editEduData", editData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          setEdit(false);
          document.body.style.overflowY = "visible";
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEdudelete(value) {
    dispatch(deleteEduRedux(value));
    const editData = {
      _id: data[0]._id,
      field: "certification",
      education: value,
    };

    axios
      .patch(process.env.REACT_APP_SERVER_DOMAIN + "/deleteEduData", editData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          setEdit(false);
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleskilldelete(value) {
    dispatch(deleteSkillRedux(value));
    const editData = {
      _id: data[0]._id,
      field: "certification",
      skills: value,
    };

    axios
      .patch(
        process.env.REACT_APP_SERVER_DOMAIN + "/deleteskillData",
        editData,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.data.alert) {
          toast(response.data.message);
          setEdit(false);
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleModal() {
    setAdd(false);
    setEdit(false);
    document.body.style.overflowY = "visible";
  }

  return (
    <>
    <div className=" flex md:flex-row flex-col justify-start items-start p-3 gap-14 bg-white border-[2px] rounded-lg border-[#EBEBEE] absolute  md:w-[70%] w-[90%] md:top-80 top-40 md:right-[9%] ">
        <div className="md:w-1/2 w-full h-full flex flex-col justify-start gap-6  items-start">
          <div className="flex justify-between items-center ">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden">
              <img src={data[0].image} className="bg-cover h-full w-full"></img>
            </div>
            <div className="w-1/2">
              <label htmlFor="image">
                <p className="text-[#373B5C] bg-[#F0EFFA] border-[1px] rounded-2xl px-3 font-body font-medium text-sm  py-2 cursor-pointer">
                {
                  isLoading ?   <div role="status">
    <svg aria-hidden="true" className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#1E2875]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span>Uploading</span>
</div> : <span>Upload photo</span>
                }
                  
                </p>

                <input
                  type={"file"}
                  id="image"
                  accept="image/*"
                  className="invisible w-full"
                  required
                  onChange={handleUpload}
                ></input>
              </label>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between items-start md:p-6 p-3 gap-3 border-[1px] drop-shadow-xl border-[#00000026] rounded-md">
            <div className="flex flex-col w-full justify-between items-start">
              <div className="w-full flex justify-between items-center  font-body font-medium text-xs md:text-lg text-left">
                <p className="text-[#1F1F1FB2]">Your Name</p>
                {edit === "profile" ? (
                  <div className="flex  justify-normal gap-2 items-center">
                    <p
                      className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                      onClick={handleprofile}
                    >
                      Update
                    </p>
                    <p
                      className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                      onClick={(event) => handleEdit(false)}
                    >
                      Cancel
                    </p>
                  </div>
                ) : (
                  <p
                    className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                    onClick={(event) => handleEdit("profile")}
                  >
                    Edit
                  </p>
                )}
              </div>
              <div className="w-full flex justify-between items-center text-[#222222E5] font-body font-medium text-xs md:text-lg text-left">
                {edit === "profile" ? (
                  <div className="flex justify-normal gap-6 bg-transparent items-center w-full">
                    <input
                      type="text"
                      name="firstname"
                      value={user.firstname}
                      onChange={handleChange}
                      className="text-[#222222E5] w-1/3 mt-3 bg-transparent p-1 border-[1px] drop-shadow-sm rounded-md"
                    ></input>
                    <input
                      type="text"
                      name="lastname"
                      value={user.lastname}
                      onChange={handleChange}
                      className="text-[#222222E5] w-1/3 bg-transparent p-1 border-[1px] drop-shadow-sm rounded-md mt-3"
                    ></input>
                  </div>
                ) : (
                  <p>
                    {" "}
                    {`${data[0].firstname
                      .charAt(0)
                      .toUpperCase()}${data[0].firstname.slice(
                      1
                    )} ${data[0].lastname
                      .charAt(0)
                      .toUpperCase()}${data[0].lastname.slice(1)}`}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full justify-between items-start">
              <div className="w-full text-[#1F1F1FB2] font-body font-medium text-xs md:text-lg text-left">
                Email
              </div>
              <div className="w-full flex justify-between items-center text-[#222222E5] font-body font-medium text-xs md:text-lg text-left">
                <p> {data[0].username}</p>
              </div>
            </div>
            <div className="flex flex-col w-full justify-between items-start">
              <div className="w-full text-[#1F1F1FB2] font-body font-medium text-xs md:text-lg text-left">
                Phone Number
              </div>
              <div className="w-full flex justify-between items-center text-[#222222E5] font-body font-medium text-xs md:text-lg text-left">
                {edit ? (
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="text-[#222222E5] p-1 bg-transparent border-[1px] drop-shadow-sm rounded-md "
                  ></input>
                ) : (
                  <p> {data[0].phone}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between items-start md:p-6 p-3 gap-3 border-[1px] drop-shadow-xl border-[#00000026]  rounded-md">
            <div className="w-full flex justify-between items-center">
              <div className="w-full flex gap-1   font-body font-medium  md:text-xl text-lg text-left">
                <p className="text-[#000000] font-body font-medium md:text-lg ">
                  About
                </p>

                <p className="text-[#413B89] font-display font-medium md:text-xl text-lg">
                  {data[0].firstname.charAt(0).toUpperCase() +
                    data[0].firstname.slice(1)}
                </p>
              </div>
              {edit === "bio" ? (
                <div className="flex  justify-normal gap-2 items-center">
                  <p
                    className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                    onClick={handleUpdatebio}
                  >
                    Update
                  </p>
                  <p
                    className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                    onClick={(event) => handleEdit(false)}
                  >
                    Cancel
                  </p>
                </div>
              ) : (
                <p
                  className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                  onClick={(event) => handleEdit("bio")}
                >
                  Edit
                </p>
              )}
            </div>
            {edit === "bio" ? (
              <textarea
                rows={4}
                name="bio"
                value={about.bio}
                onChange={handleAbout}
                className="w-full bg-transparent border-[1px] drop-shadow-sm rounded-md p-2"
              ></textarea>
            ) : (
              <p className="text-[#49454FCC] font-normal text-sm md:text-base font-body w-full text-left">
                {data[0].bio}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full justify-between items-start md:p-6 p-3 gap-3 border-[1px] drop-shadow-xl border-[#00000026] rounded-md">
            <div className="w-full flex justify-between items-center">
              <div className="w-full flex gap-1   font-body font-medium text-xs md:text-lg text-left">
                {edit === "skill" ? (
                  <div className="flex justify-between w-full items-center mr-3">
                    <p className="text-[#222222] font-body font-medium md:text-xl text-base">
                      Skills
                    </p>
                    <IoIosAdd
                      size={30}
                      className="cursor-pointer"
                      onClick={(event) => setAdd("skill")}
                    ></IoIosAdd>
                  </div>
                ) : (
                  <p className="text-[#222222] font-body font-medium md:text-xl text-base">
                    Skills
                  </p>
                )}
              </div>
              {edit === "skill" ? (
                <div className="flex  justify-normal gap-2 items-center">
                  <p
                    className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                    onClick={handleSkill}
                  >
                    Update
                  </p>
                  <p
                    className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                    onClick={(event) => handleEdit(false)}
                  >
                    Cancel
                  </p>
                </div>
              ) : (
                <p
                  className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                  onClick={(event) => handleEdit("skill")}
                >
                  Edit
                </p>
              )}
            </div>

            {add === "skill" && (
              <input
                type="text"
                name="skill"
                value={newskill}
                onChange={handleNewskill}
                className="p-2 bg-transparent w-full border-[1px] drop-shadow-sm rounded-md"
              ></input>
            )}
            <div className="w-full flex justify-normal gap-5 items-start flex-wrap">
              {data[0].skills.map((post, index) => {
                return (
                  <div className="flex justify-between items-center border-[1px] drop-shadow-md bg-white rounded-xl py-2 px-3 gap-3">
                    <p className="text-[#222222] font-body  font-medium md:text-lg text-sm ">
                      {post}
                    </p>
                    {edit === "skill" && (
                      <RiDeleteBinLine
                        size={15}
                        className="cursor-pointer"
                        onClick={(event) => handleskilldelete(post)}
                      ></RiDeleteBinLine>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full h-full flex flex-col justify-start gap-6 items-start">
          <div className="flex w-full justify-between items-start md:p-6 p-3 gap-3 border-[1px] drop-shadow-xl border-[#00000026] rounded-xl">
            <div className="flex flex-col justify-between items-start">
              <p className="text-[#222222E5] font-body font-medium text-base md:text-xl">
                Professional Details
              </p>
              <p className="text-[#49454FCC] text-sm font-body font-normal md:w-3/4 text-left">
                This are the professional details shown to users in the app.
              </p>
            </div>

            <img src={stars} className="w-14 md:w-20"></img>
          </div>
          <div className="flex w-full flex-col justify-between items-start md:p-6 p-3 gap-6 ">
            <div className="w-full flex justify-between items-center">
              {edit === "certi" ? (
                <div className="w-full justify-between flex items-center mr-3">
                  <p className="text-[#222222E5] font-body font-medium text-base md:text-xl text-left ">
                    Certification
                  </p>
                  <IoIosAdd
                    size={30}
                    onClick={(event) => {
                      setAdd("certi");
                      document.body.style.overflowY = "hidden";
                    }}
                    className="cursor-pointer"
                  ></IoIosAdd>
                </div>
              ) : (
                <p className="text-[#222222E5] font-body font-medium text-base md:text-xl text-left ">
                  Certification
                </p>
              )}

              {edit === "certi" ? (
                <div className="flex  justify-normal gap-2 items-center">
                  <p
                    className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                    onClick={(event) => handleEdit(false)}
                  >
                    Cancel
                  </p>
                </div>
              ) : (
                <p
                  className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                  onClick={(event) => handleEdit("certi")}
                >
                  Edit
                </p>
              )}
            </div>

            {add === "certi" && (
              <Addexp
                onmodal={handleModal}
                newData={handleCertiUpdate}
              ></Addexp>
            )}
            {add === "editcerti" && (
              <Addexp
                onmodal={handleModal}
                newData={handleCertiUpdate}
                editData={handleCertiedit}
                userData={change}
                check={true}
              ></Addexp>
            )}
            {data[0].certification.map((post, index) => {
              return (
                <div className="w-full border-[1px] flex  overflow-hidden gap-5 justify-normal items-start border-[#CECECE] drop-shadow-lg rounded-full bg-[#FFFFFF] px-3 py-2">
                  <div className="w-3/4 flex justify-start gap-24 items-center">
                    <img src={vector} className="md:w-10 w-8 ml-4"></img>
                    <div className="flex-col items-center w-1/2 justify-between gap-2 ">
                      <p className="text-[#49454FCC] font-normal font-body text-base md:text-xl">
                        {post.skill}
                      </p>
                      <p className="text-[#49454FCC] font-normal font-body text-sm md:text-lg">
                        {post.provider}
                      </p>
                    </div>
                  </div>
                  {edit === "certi" && (
                    <div className="flex flex-col md:flex-row justify-end gap-3 mr-3 items-end md:items-start w-1/4 ">
                      <FiEdit
                        size={20}
                        className="cursor-pointer"
                        onClick={(event) => {
                          setAdd("editcerti");
                          handleEditData(post);
                        }}
                      ></FiEdit>
                      <RiDeleteBinLine
                        size={20}
                        className="cursor-pointer"
                        onClick={(event) => handleCertidelete(post)}
                      ></RiDeleteBinLine>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex w-full flex-col justify-between items-start md:p-6 p-3 gap-6 ">
            <div className="w-full flex justify-between items-center">
              {edit === "exp" ? (
                <div className="flex w-full justify-between items-center mr-3">
                  <p className="text-[#222222E5] font-body font-medium text-base md:text-xl text-left ">
                    Experience
                  </p>
                  <IoIosAdd
                    size={30}
                    onClick={(event) => {
                      setAdd("exp");
                      document.body.style.overflowY = "hidden";
                    }}
                    className="cursor-pointer"
                  ></IoIosAdd>
                </div>
              ) : (
                <p className="text-[#222222E5] font-body font-medium text-base md:text-xl text-left ">
                  Experience
                </p>
              )}
              {edit === "exp" ? (
                <div className="flex  justify-normal gap-2 items-center">
                  <p
                    className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                    onClick={(event) => handleEdit(false)}
                  >
                    Cancel
                  </p>
                </div>
              ) : (
                <p
                  className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                  onClick={(event) => handleEdit("exp")}
                >
                  Edit
                </p>
              )}
            </div>

            {add === "exp" && (
              <AddExperience
                onmodal={handleModal}
                newData={handleExpUpdate}
              ></AddExperience>
            )}

            {add === "editexp" && (
              <AddExperience
                onmodal={handleModal}
                newData={handleExpUpdate}
                editData={handleExpedit}
                userData={change}
                check={true}
              ></AddExperience>
            )}
            {data[0].experience.map((post) => {
              return (
                <div className="w-full border-[1px] flex justify-normal items-center border-[#000000] border-opacity-25 drop-shadow-md rounded-2xl bg-[#FFFFFF] px-3 py-2">
                  <div className="w-full  flex justify-between  items-center">
                    <div className="flex-col flex items-center justify-between gap-4 w-full">
                      <div className="flex justify-between items-center w-full">
                        <div className="w-3/4 flex justify-normal items-center">
                          {post.year == 0 ? (
                            <p className="text-[#222222E5] font-medium font-body text-sm md:text-lg mr-1">
                              {post.month} months
                            </p>
                          ) : (
                            <p className="text-[#222222E5] font-medium font-body text-sm md:text-lg mr-1">
                              {post.year} Years
                            </p>
                          )}
                          {post.year == 0 ? (
                            <p className="text-[#222222E5] font-medium font-body text-sm md:text-lg ">
                              ({parseInt(post.startDate)})
                            </p>
                          ) : (
                            <p className="text-[#222222E5] font-medium font-body text-sm md:text-lg ">
                              ({parseInt(post.startDate)}-
                              {parseInt(post.endDate)})
                            </p>
                          )}
                        </div>

                        <p className="w-1/2 text-[#222222E5] text-right font-medium font-body text-sm md:text-lg">
                          {post.type.charAt(0).toUpperCase() +
                            post.type.slice(1)}
                        </p>
                      </div>
                      <div className="flex justify-betweem  items-center gap-4 w-full">
                        <p className="text-[#49454FCC] font-normal text-base md:text-xl">
                          {post.cName}
                        </p>
                        <p className="text-[#49454FCC] font-normal text-right w-full text-sm md:text-lg">
                          --{" "}
                          {post.title.charAt(0).toUpperCase() +
                            post.title.slice(1)}
                        </p>
                      </div>
                    </div>
                    {/* <img src={logo} className="md:w-24 w-12 "></img> */}
                  </div>
                  {edit === "exp" && (
                    <div className="flex flex-col md:flex-row justify-end gap-3 pl-2 md:p-0 md:mr-3 items-end md:items-start md:w-1/4 ">
                      <FiEdit
                        size={20}
                        className="cursor-pointer"
                        onClick={(event) => {
                          setAdd("editexp");
                          handleEditData(post);
                        }}
                      ></FiEdit>
                      <RiDeleteBinLine
                        size={20}
                        className="cursor-pointer"
                        onClick={(event) => handleExpdelete(post)}
                      ></RiDeleteBinLine>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex w-full flex-col justify-between items-start md:p-6 p-3 gap-6 ">
            <div className="w-full flex justify-between items-center">
              {edit === "edu" ? (
                <div className="w-full mr-3 flex justify-between items-center">
                  {" "}
                  <p className="text-[#222222E5] font-body font-medium text-base md:text-xl text-left ">
                    Education
                  </p>
                  <IoIosAdd
                    size={30}
                    onClick={(event) => {
                      setAdd("edu");
                      document.body.style.overflowY = "hidden";
                    }}
                  ></IoIosAdd>
                </div>
              ) : (
                <p className="text-[#222222E5] font-body font-medium text-base md:text-xl text-left ">
                  Education
                </p>
              )}

              {edit === "edu" ? (
                <div className="flex  justify-normal gap-2 items-center">
                  <p
                    className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                    onClick={(event) => handleEdit(false)}
                  >
                    Cancel
                  </p>
                </div>
              ) : (
                <p
                  className="bg-[#F0EFFA] text-[#222222E5] px-5 py-1 ont-body font-medium text-sm rounded-xl cursor-pointer"
                  onClick={(event) => handleEdit("edu")}
                >
                  Edit
                </p>
              )}
            </div>

            {add === "edu" && (
              <Addedu onmodal={handleModal} newData={handleEduUpdate}></Addedu>
            )}
            {add === "editedu" && (
              <Addedu
                onmodal={handleModal}
                newData={handleExpUpdate}
                editData={handleEduedit}
                userData={change}
                check={true}
              ></Addedu>
            )}

            {data[0].education.map((post, index) => {
              return (
                <div className="w-full border-[1px] border-[#000000] border-opacity-25 drop-shadow-md rounded-2xl bg-[#FFFFFF] px-3 py-2">
                  <div className="w-full  flex flex-col justify-between  items-center">
                    <div className="flex w-full justify-between items-center">
                      <p className="text-[#413B89] font-medium font-body text-base md:text-lg w-full text-left">
                        {post.institute}
                      </p>
                      {edit === "edu" && (
                        <div className="flex flex-col md:flex-row justify-end gap-3 mr-3 items-end md:items-start w-1/4 ">
                          <FiEdit
                            size={20}
                            className="cursor-pointer"
                            onClick={(event) => {
                              setAdd("editedu");
                              handleEditData(post);
                            }}
                          ></FiEdit>
                          <RiDeleteBinLine
                            size={20}
                            className="cursor-pointer"
                            onClick={(event) => handleEdudelete(post)}
                          ></RiDeleteBinLine>
                        </div>
                      )}
                    </div>

                    <div className="w-full flex justify-between items-center">
                      <p className="text-[#222222E5] font-medium font-body text-base md:text-lg w-full text-left whitespace-nowrap">
                        ({parseInt(post.startDate)}-{parseInt(post.endDate)})
                      </p>
                      <p className="text-[#222222E5] font-medium font-body text-base md:text-lg w-full ">
                        {post.degree.charAt(0).toUpperCase() +
                          post.degree.slice(1)}
                      </p>
                    </div>
                    <p className="text-[#49454FCC] font-medium font-body text-xs md:text-sm w-full text-left">
                      {post.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
 
     
    </>
  );
}

export default User;
