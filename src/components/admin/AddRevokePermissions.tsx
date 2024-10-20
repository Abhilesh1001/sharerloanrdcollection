import React, { useState } from 'react'

import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '../Navbar'
import DumyInput from '../dummyinput/DumyInput'
import { useAdmin } from '@/hooks/admin/useAdmin'


export default function AddRevokePermissions() {


  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
  const { data }:any = useAdmin()



  const [userId, setUserId] = useState<number | string>('');
  const [permissionId, setPermissionId] = useState<number | string>('');
  const [userData, setUserData] = useState({ id: null, company: null, email: '', name: '' })
  const [permissionData, setPermissionData] = useState([{ id: null, name: '', codename: '', content_type__model: '' }])

  const [permissionAssignStatus, setPermissionAssignStatus] = useState({ status: '' })

  const mutation = useMutation<any, any, any, unknown>({
    mutationFn: async (data) => {
      return await axios.post(`${baseurl}cus/api/permissions/revoke/`, data, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: (data) => {
      setPermissionId('')
      setUserId('')
      setPermissionAssignStatus(data.data)
    },
    onError: (error) => {
      console.log(error)
    }
  })


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(userId, permissionId)
    e.preventDefault()
    const data = {
      permission_id: Number(permissionId),
      user_id: Number(userId)
    }

    mutation.mutate(data)



  }

  const handleuserID = async () => {

    try {
      const data = await axios.get(`${baseurl}adminpanel/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })

      const newData = {
        id: data.data.id,
        company: data.data.company,
        email: data.data.email,
        name: data.data.name
      }
      setUserData(newData)
    } catch (error){
      console.log(error)

    }

  }

  const handlePermission = () => {


    const orignalData = data.filter((item: any) => {

      if (item.id === Number(permissionId))
        return item
    })
    setPermissionData(orignalData)
  }

  return (
    <div>
      <div className='flex'>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-error" >Cancel</button>
        </form>

        <div className='ml-20 capitalize text-green-900'>
          {permissionAssignStatus.status}
        </div>

      </div>




      <div className="row">
        <div className="col-sm-6">
          <form onSubmit={handleSubmit}>

            <div>
              <label htmlFor="User Id " className='block'>User ID</label>
              <input type="number" value={userId !== '' ? userId : ''} required name='user_id' onChange={(e) => setUserId(e.target.value)} placeholder="User ID" className="input input-bordered w-80 my-2" />
              <button className='btn btn-success ml-2' type='button' onClick={handleuserID} >Check</button>

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
        <div className="col-sm-6">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className='sticky top-0 z-1  h-10 bg-base-200'>
              <tr >
                <th><div className='ml-2'>id</div></th>
                <th>Name</th>
                <th>Email</th>
                <th>Comapny Id</th>
              </tr>
            </thead>
            <tbody >


              <tr >
                <td><DumyInput indum={userData.id} /></td>
                <td><DumyInput indum={userData.name} /></td>
                <td><DumyInput indum={userData.email} /></td>
                <td><DumyInput indum={userData.company} /></td>
              </tr>


            </tbody>
          </table>
          <table className="w-full text-sm text-left rtl:text-right my-4">
            <thead className='sticky top-0 z-1  h-10 bg-base-200'>
              <tr >
                <th><div className='ml-2'>id</div></th>
                <th>Name</th>
                <th>Code Name</th>
                <th>Content Type Model</th>
              </tr>
            </thead>
            <tbody >


              <tr >
                <td><DumyInput indum={permissionData[0].id} /></td>
                <td><DumyInput indum={permissionData[0].name} /></td>
                <td><DumyInput indum={permissionData[0].codename} /></td>
                <td><DumyInput indum={permissionData[0].content_type__model} /></td>
              </tr>


            </tbody>
          </table>

        </div>
      </div>





    </div>
  )
}
