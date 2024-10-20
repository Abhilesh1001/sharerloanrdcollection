'use client'
import DumyInput from '@/components/dummyinput/DumyInput'
import { StateProps } from '@/type/type'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSelector } from 'react-redux'

import AddPerson from '@/components/admin/person/AddPerson'



export interface personType {
    person_id?: null|number,
    name: string,
    usersf : null | number,
    phone_no: string,
    email: string,
    time?: string,
    pan_no: string,
    address : string,
    adharcard : string
}


const Users = () => {

  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
  const getTodos = async () => {

    const res = await axios.get(`${baseurl}adminpanel/persons`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })


    return res.data


  }

  const { data } = useQuery({ queryKey: ['addperson'], queryFn: getTodos })
  



  return (
    <div className="text-base-content bg-base-100 h-auto min-h-screen">
    <div className="ml-80 my-6 mr-20">



      <div className="p-4"></div>
      <button className="btn btn-success mr-2 "
       onClick={() => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;

        if (modal) {
          modal.showModal();
        }
      }}>Add Person</button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-5xl ">

          <div className="modal-action mt-0">
          </div>

          <AddPerson />

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
            <th scope="col" className="px-6 py-2">C ID</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Email</th>
            <th scope="col">User Reference</th>
            <th scope="col">Pan No</th>
            <th scope="col">Address</th>
            <th scope="col">Adharcard No</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((items: personType) => (
            <tr key={items.person_id}>
              <th scope="row">
                <DumyInput indum={items.person_id !== undefined ? items.person_id : null} />
              </th>
              <td>
                <DumyInput indum={items.name} />
              </td>
              <td>

                <DumyInput indum={items.email} />
              </td>
              <td>

                <DumyInput indum={items.usersf} />
              </td>
              <td>

                <DumyInput indum={items.pan_no} />
              </td>
              <td>

                <DumyInput indum={items.address} />
              </td>
              <td>

                <DumyInput indum={items.adharcard} />
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