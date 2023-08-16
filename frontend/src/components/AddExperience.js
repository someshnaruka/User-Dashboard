import React, { useState } from "react";

function AddExperience(props) {
  const [newExp, setNewExp] = useState(
    props.check ?{
        id:props.userData[0].id,
        cName:props.userData[0].cName,
        title:props.userData[0].title,
        type:props.userData[0].type,
        startDate:props.userData[0].startDate,
        endDate:props.userData[0].endDate,
        month:props.userData[0].month,
        year:props.userData[0].year,
    
      }:{
    id:Math.floor(100000000 + Math.random() * 900000000),
    cName: "",
    title: "",
    type:"",
    startDate:"",
    endDate:"",
    month:"",
    year:"",

  });

  function handledata() {
    const a = new Date(newExp.startDate)
    const b = new Date(newExp.endDate)
   
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  var diffDays = parseInt((b - a) / (24 * 3600 * 1000)); 
   const months=Math.floor(diffDays/30);
   const years=Math.floor(months/12);

newExp.month=months;
newExp.year=years;
if(props.check)
{
    props.editData(newExp);
}
else{
    props.newData(newExp);
}
   
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNewExp((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });

  }
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0   backdrop-blur-sm flex justify-center items-center  z-40 cursor-pointer">
        <div className="animate__animated animate__bounceIn bg-[#1F2937]  text-white border-2 border-transparent shadow-lg shadow-black rounded-xl flex flex-col items-start justify-normal gap-6 p-10 cursor-pointer md:w-1/2 w-full m-2">
          <h1 className="w-full text-xl md:text-3xl font-body font-medium text-left">
            Add Experience
          </h1>
          <div className="flex flex-col justify-between items-start w-full p-3 gap-3">
            <label className="md:text-2xl text-lg  font-body font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="cName"
              required
              value={newExp.cName}
              className="text-black  md:w-3/4 w-full p-2 rounded-md"
              onChange={handleChange}
            ></input>
            <label className="md:text-2xl text-lg font-body font-medium">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={newExp.title}
              className="text-black md:w-3/4 w-full p-2 rounded-md"
              onChange={handleChange}
            ></input>
            <label className="md:text-2xl text-lg font-body font-medium">
              Job Type <span>(Full Time or Internship)</span>
            </label>
            <input
              type="text"
              name="type"
              required
              value={newExp.type}
              placeholder=""
              className="text-black md:w-3/4 w-full p-2 rounded-md"
              onChange={handleChange}
            ></input>
            <div className="flex justify-between items-center gap-3 md:w-3/4 w-full">
              <div className="flex justify-between flex-col items-start gap-3 w-full">
                {" "}
                <label className="md:text-2xl text-lg font-body font-medium">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  required
                  value={newExp.startDate}
                  placeholder=""
                  className="text-black  w-full p-2 rounded-md"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="flex justify-between flex-col items-start gap-3 w-full">
                {" "}
                <label className="md:text-2xl text-lg font-body font-medium">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  required
                  value={newExp.endDate}
                  placeholder=""
                  className="text-black  w-full p-2 rounded-md"
                  onChange={handleChange}
                ></input>
              </div>
            </div>



            <div className="w-full flex items-center justify-normal gap-6 mt-4">
            {
    props.check ? <button
                className="px-5 py-2 rounded-lg border-[1px] drop-shadow-md text-white"
                onClick={handledata}
              >
               Update
              </button>: <button
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

export default AddExperience;
