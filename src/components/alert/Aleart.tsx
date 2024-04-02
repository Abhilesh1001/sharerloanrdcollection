import React,{useState} from 'react'
import { ImCross } from "react-icons/im";


interface propsType {
    newMat: null | number,
    alertname: string
    label? : string, 
    onClose? : ()=>void
}


const Aleart = (props: propsType) => {

 
  
    return (
        <div>
              <div className="flex items-center p-2 ml-10 mr-10 mb-4 w-[90%] bg-sky-500 h-8 text-sm  rounded-lg dark:bg-gray-700 dark:text-gray-50 text-gray-50 ">
            <div className='flex w-full justify-between'>
                <div className='flex'>
                    <div>{props.alertname} {props.label} {props.alertname} no :  </div>
                    <div className='text-green-400' > {props.newMat}</div>
                </div>
                <div className=''>
                    <button onClick={props.onClose} ><ImCross /></button>
                </div>

            </div>
        </div>      
        </div>
    )
}

export default Aleart