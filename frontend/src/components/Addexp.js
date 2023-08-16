import React, { useState } from "react";

function Addexp(props) {
    console.log(props.userData,"certficate data");
  const [newCerti, setNewcerti] = useState(props.check ?{
    id:props.userData[0].id,
    skill: props.userData[0].skill,
    provider: props.userData[0].provider,
   
  } :{
    id:Math.floor(100000000 + Math.random() * 900000000),
    skill: "",
    provider: "",
  });



  function handledata() {
    if(props.check)
    {
        props.editData(newCerti);
    }
    else{
        props.newData(newCerti);
    }
    }
    

  function handleChange(event) {
    const { name, value } = event.target;

        setNewcerti((prevalue) => {
            return {
              ...prevalue,
              [name]: value,
            };
          });
          console.log(newCerti);
    

    
  }
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0   backdrop-blur-sm flex justify-center items-center  z-50 cursor-pointer">
        <div className="animate__animated animate__bounceIn bg-[#1F2937]  text-white border-2 border-transparent shadow-lg shadow-black rounded-xl flex flex-col items-start justify-normal gap-6 p-10 cursor-pointer md:w-1/2 w-full m-2">
          <h1 className="w-full text-xl md:text-3xl font-body font-medium text-left">
            Add Certification
          </h1>
          <div className="flex flex-col justify-between items-start w-full p-3 gap-3">
            <label className="md:text-2xl text-lg  font-body font-medium">
              Skill
            </label>
            <input
              type="text"
              name="skill"
              value={newCerti.skill}
              className="text-black  md:w-3/4 w-full p-2 rounded-md"
              onChange={handleChange}
            ></input>
            <label className="md:text-2xl text-lg font-body font-medium">
              Certification Provider
            </label>
            <input
              type="text"
              name="provider"
              value={newCerti.provider}
              className="text-black md:w-3/4 w-full p-2 rounded-md"
              onChange={handleChange}
            ></input>
            <div className="w-full flex items-center justify-normal gap-6 mt-4">
            {
                props.check ? <button
                className="px-5 py-2 rounded-lg border-[1px] drop-shadow-md text-white"
                onClick={handledata}
              >
                Update
              </button> :  <button
                className="px-5 py-2 rounded-lg border-[1px] drop-shadow-md text-white"
                onClick={handledata}
              >
                Add
              </button>
            }
            
              <button
                className="px-3 py-2 rounded-lg border-[1px] drop-shadow-md text-white"
                onClick={props.onmodal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addexp;
