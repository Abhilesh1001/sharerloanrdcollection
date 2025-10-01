'use client'
import AddAuthorization from '@/components/admin/authgroup/AddAuthorization'
import { StateProps } from '@/type/type';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import DumyInput from '@/components/dummyinput/DumyInput'




export interface authgroupType{
    group_id?: null | number
    model_name : string,
    auth_type : string,
    user : number | null,
    usersf : number | null,
    user_name ?: string,
    usersf_name ?: string
  }


export default function Page() {

      const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)

  const getTodos = async () => {

    const res = await axios.get(`${baseurl}adminpanel/authgroup`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })

  
    return res.data


  }

  const { data } = useQuery({ queryKey: ['adminauthgroup'], queryFn: getTodos })





  return (
    <div className="text-base-content bg-base-100 h-auto min-h-screen">

        <div className="ml-80 my-6 mr-20">
            <div className="p-2"></div>
               <button className="btn btn-success mr-2 " onClick={() => {
              const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
              
              if (modal) {
                modal.showModal();
              }
            }}>Auth Group Add</button>
            
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box w-11/12 max-w-5xl ">

                <div className="modal-action mt-0">
                </div>
                <AddAuthorization />
              </div>
            </dialog>



            
         <table className="w-full text-sm text-left rtl:text-right">
        <thead className="sticky top-0 z-1 bg-base-200">
          <tr>
            <th scope="col" className="px-6 py-2">Group ID</th>

            <th scope="col">Auth Type</th>
            <th scope="col">User</th>
            <th scope="col">Model Name</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((items: authgroupType) => (
            <tr key={items.group_id}>
              <th scope="row">
                <DumyInput indum={items.group_id !== undefined ? items.group_id : null} />
              </th>
              <td>
              
                  <DumyInput indum={items.auth_type} />
  
              </td>
              <td>
              
                  <DumyInput indum={items.user} />
  
              </td>
              <td>
 
                  <DumyInput indum={items.model_name} />

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

