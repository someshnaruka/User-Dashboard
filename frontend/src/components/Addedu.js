import React, { useState } from 'react'

function Addedu(props) {
    const [newEdu, setNewEdu] = useState(
        props.check ? {
        id:props.userData[0].id,
        institute: props.userData[0].institute,
        degree: props.userData[0].degree,
        startDate:props.userData[0].startDate,
        endDate:props.userData[0].endDate,
       desc:props.userData[0].desc,
      }
      : {
      id:Math.floor(100000000 + Math.random() * 900000000),
      institute: "",
      degree: "",
      startDate:"",
      endDate:"",
     desc:"",
    } );

      

      function handledata() {
        if(props.check)
        {
            props.editData(newEdu)
        }
      else{
        props.newData(newEdu)
        }
      }
    
      function handleChange(event) {
        const { name, value } = event.target;
    
        setNewEdu((prevalue) => {
          return {
            ...prevalue,
            [name]: value,
          };
        });
        console.log(newEdu);
      }
  return (
   <>
    <div className="fixed top-0 bottom-0 left-0 right-0   backdrop-blur-sm flex justify-center items-center  z-40 cursor-pointer">
        <div className="animate__animated animate__bounceIn bg-[#1F2937]  text-white border-2 border-transparent shadow-lg shadow-black rounded-xl flex flex-col items-start justify-normal gap-6 md:p-10 p-3 cursor-pointer md:w-1/2 w-full m-2">
          <h1 className="w-full text-xl md:text-3xl font-body font-medium text-left">
            Add Education
          </h1>
          <div className="flex flex-col justify-between items-start w-full  md:p-3 gap-3">
            <label className="md:text-2xl text-lg  font-body font-medium">
              Institute Name
            </label>
            <input
              type="text"
              name="institute"
              value={newEdu.institute}
              className="text-black  md:w-3/4 w-full p-2 rounded-md"
              onChange={handleChange}
            ></input>
            <label className="md:text-2xl text-lg font-body font-medium">
              Degree
            </label>
            <input
              type="text"
              name="degree"
              value={newEdu.degree}
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
                  value={newEdu.startDate}
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
                  value={newEdu.endDate}
                  placeholder=""
                  className="text-black  w-full p-2 rounded-md"
                  onChange={handleChange}
                ></input>
              </div>
              
            </div>
            <label className="md:text-2xl text-lg font-body font-medium">
              Additional Details
            </label>
            <textarea
             rows={4}
              name="desc"
              value={newEdu.desc}
              className="text-black md:w-3/4 w-full p-2 rounded-md"
              onChange={handleChange}
            ></textarea>
            <div className="w-full flex items-center justify-normal gap-6 mt-4">
            {
                props.check ?<button
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
  )
}

export default Addedu