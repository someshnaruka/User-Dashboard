import React from 'react'

function RemovedCard(props) {
  
    console.log(props,"card data");

    function handleClick(){
        const data={
            id:props.id,
            name:props.name,
            job:props.job,
            company:props.company,
            img:props.img
        }
 
        props.onadd(data)
    }


  return (
    <>
        <div className='md:w-[30%] w-full flex  justify-between items-center p-2  border-[1px] rounded-lg border-[#00000026] drop-shadow-lg  '>
            <div className='flex flex-col justify-between items-start p-2 w-3/4 gap-3'>
                <p className='text-[#222222] text-sm md:text-base font-body '>{props.name}</p>
                <div className='flex flex-col justify-between items-center '>
                    <p className='text-gray-500 text-xs md:text-sm'>{props.job}</p>
                    <p className='text-gray-500 text-xs md:text-sm'>@ {props.company}</p>
                </div>
                <button className='text-black bg-[#BAB6EB] rounded-2xl px-2 py-1 text-sm' onClick={handleClick}>Connect</button>
            </div>
            <div className='w-24 h-24 rounded-full bg-transparent'>
                <img src={props.img} className='w-full bg-cover h-full'></img>
            </div>
        </div>
    </>
  )
}

export default RemovedCard