
import React, { useState } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '../Navbar'


export default function ViewPermisson() {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
    const [id,setId] =useState<Number>()

    const handleSubmit = ()=>{

    }

  return (
    <div>


<form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-error" >Cancel</button>
                    </form>
   
    <form onSubmit={handleSubmit}>
    <label htmlFor="User Id " className='block'>User ID</label>
    <input type="number" value={id!==undefined?'':id} required name='email'  onChange={(e)=>setId(Number(e.target.value))} placeholder="User ID" className="input input-bordered w-80 my-2" />
    
    </form>

 
      
    </div>




  )
}
