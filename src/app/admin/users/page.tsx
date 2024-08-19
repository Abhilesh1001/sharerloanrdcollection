'use client'
import AddUserModal from '@/components/admin/users/AddUserModal'
import DumyInput from '@/components/dummyinput/DumyInput'
import { StateProps } from '@/type/type'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export interface userType{
  id :number|null,
  email : string,
  is_superuser : boolean,
  name : string,
  tc : boolean,
  is_active : boolean,
  is_admin : boolean,
  company : number|null,
}






const Users = () => {


  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
  const [view,setView] = useState<null | number>(null) 

  const [userData,setUserData] = useState<[userType]>([{id:null,email:'',is_superuser:false,name:'',tc:false,is_active:false,is_admin:false,company:null}])

  console.log(userData)




  const getTodos = async () => {

    const res = await axios.get(`${baseurl}adminpanel/users`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })

    const newData = res.data.map((item:any)=>{

      const element ={
        id : item.id,
        email : item.email,
        is_superuser : item.is_superuser,
        name : item.name,
        tc: item.tc,
        is_active : item.is_active,
        is_admin :item.is_admin,
        company : item.company

      }

      return element



    })




    setUserData(newData)


    return res.data


  }

  const { data } = useQuery({ queryKey: ['apiuser'], queryFn: getTodos })


  
  const handleChange = (id: any) => {
    setView(view === id ? null : id);
  };
 
  const handleChangeUserData = ()=>{

  }




  return (
    <div className="text-base-content bg-base-100 h-auto min-h-screen">
      <div className="ml-80 my-6 mr-20">


     

        

        <div className="p-2"></div>
        <button className="btn btn-success mr-2 " onClick={() => {
                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                
                if (modal) {
                  modal.showModal();
                }
              }}>Add Users</button>
              
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box w-11/12 max-w-5xl ">

                  <div className="modal-action mt-0">
                  </div>
                  <AddUserModal />
                </div>
              </dialog>


              <div className='row'>
                <div className="col-sm-6">

                </div>
                <div className="col-sm-6">
                  
                </div>
              </div>
        
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="sticky top-0 z-1 bg-base-200">
            <tr>
              <th scope="col" className="px-6 py-2">USER ID</th>
              <th scope="col">USER NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">Active</th>
              <th scope="col">Admin</th>
              <th scope="col">Superuser</th>
              <th scope="col">TC</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {userData?.map((items: userType) => (
              <tr key={items.id}>
                <th scope="row">
                  <DumyInput indum={items.id !== undefined ? items.id : null} />
                </th>
                <td>
                  {view === items.id ? (
                    <input type="text" className="input input-bordered input-sm max-w-xs w-40" value={items.name} onChange={handleChangeUserData} />
                  ) : (
                    <DumyInput indum={items.name} />
                  )}
                </td>
                <td>
                {view === items.id ? (
                    <input type="text" className="input input-bordered input-sm max-w-xs w-40" value={items.email} onChange={handleChangeUserData} />
                  ) : (
                    <DumyInput indum={items.email} />
                  )}
                  
                </td>
                <td>
                {view === items.id ? (
                    <input type="text" className="input input-bordered input-sm max-w-xs w-20" value={items.is_active ?'Active':'Inactive'} onChange={handleChangeUserData} />
                  ) : ( 
                    <DumyInput indum={items.is_active ? 'Active' : 'Inactive'} />
                  )}
                  
                </td>
                <td>
                {view === items.id ? (
                    <input type="text" className="input input-bordered input-sm max-w-xs w-20" value={items.is_admin ? 'Active':'Inactive'} onChange={handleChangeUserData} />
                  ) : (
                    <DumyInput indum={items.is_admin ? 'Active' : 'Inactive'} />
                  )}
                  
                </td>
                <td>
                {view === items.id ? (
                    <input type="text" className="input input-bordered input-sm max-w-xs w-20" value={items.is_superuser?'Active':'Inactive'}  onChange={handleChangeUserData} />
                  ) : (
                    <DumyInput indum={items.is_superuser ? 'Active' : 'Inactive'} />
                  )}
                 
                </td>
                <td>
                {view === items.id ? (
                    <input type="text" className="input input-bordered input-sm max-w-xs w-20" value={items.tc?'Active':'Inactive'} onChange={handleChangeUserData} />
                  ) : (
                    <DumyInput indum={items.tc ? 'Active' : 'Inactive'} />
                  )}
                </td>
                <td>
                  <button className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users

