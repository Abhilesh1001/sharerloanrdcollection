import React, { useState } from 'react'

import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '../Navbar'
import DumyInput from '../dummyinput/DumyInput'
import { useAdmin } from '@/hooks/admin/useAdmin'

export default function AddPermission() {


  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
  const { data } = useAdmin()
  
  if (data){
    
  }

  const [userId, setUserId] = useState<number | string>('');
  const [permissionId, setPermissionId] = useState<number | string>('');

  const handleSubmit = () => {
    console.log(userId, permissionId)
    const data = {
      permission_id: permissionId,
      user_id: userId
    }




  }

  const handleuserID =()=>{
    console.log('ok')
  }


  const handlePermission=()=>{
    console.log('ok')
  }


  return (
    <div>
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-error" >Cancel</button>
      </form>

      <form onSubmit={handleSubmit}>

        <div>
        <label htmlFor="User Id " className='block'>User ID</label>
        <input type="number" value={userId !== '' ? userId : ''} required name='user_id' onChange={(e) => setUserId(e.target.value)} placeholder="User ID" className="input input-bordered w-80 my-2" />
        <button className='btn btn-success ml-2' type='button'  onClick={handleuserID} >Check</button>

        </div>
        

        <div>
          <label htmlFor="User Id " className='block'>Permission ID</label>
          <input type="number" value={permissionId !== '' ? permissionId : ''} required name='user_id' onChange={(e) => setPermissionId(e.target.value)} placeholder="Permission ID" className="input input-bordered w-80 my-2" />
          <button className='btn btn-success ml-2' type='button' onClick={handlePermission} >Check</button>
        </div>
        <div>

          <button className='btn btn-success ml-2' type='submit'>Submit</button>

        </div>
      </form>


    </div>
  )
}
