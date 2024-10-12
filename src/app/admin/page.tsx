"use client"
import React from 'react'

import DumyInput from '@/components/dummyinput/DumyInput'
import AddPermission from '@/components/admin/AddPermission'
import ViewPermisson from '@/components/admin/ViewPermisson'
import { useAdmin } from '@/hooks/admin/useAdmin'


const Admin = () => {

    const {data }:any = useAdmin()

     

    return (
        <div className='text-base-content bg-base-100 h-auto   min-h-screen'>



            <div className="container mt-6">
                <div className='h-6'></div>



                <button className="btn btn-success mr-2 " onClick={() => {
                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                
                if (modal) {
                  modal.showModal();
                }
              }}>Add Permission</button>
              
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">

                  <div className="modal-action mt-0">
                  </div>
                  <AddPermission />
                 
                </div>
              </dialog>



              <button className="btn btn-success mr-2 " onClick={() => {
                const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                
                if (modal) {
                  modal.showModal();
                }
              }}>Avilable Permission</button>
              
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">

                  <div className="modal-action mt-0">
                  </div>
                  <ViewPermisson />
                 
                 
                </div>
              </dialog>

                <div className=' ml-2 mr-2 mt-4 h-[70vh] bg-base-300 overflow-auto w-[50vw] text-nowrap my-2 relative overflow-y-auto shadow-md  sm:rounded-lg'>

                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className='sticky top-0 z-1  h-10 bg-base-200'>
                            <tr >
                                <th><div className='ml-2'>id</div></th>
                                <th>Name</th>
                                <th>Code Name</th>
                                <th>Content Type Model</th>
                            </tr>
                        </thead>
                        <tbody >

                            {
                                data?.length > 0 && data?.map((item: {
                                    id: number,
                                    name: string,
                                    codename: string,
                                    content_type__model: string
                                }) => {

                                    return (
                                        <tr key={item.id}>
                                            <td><DumyInput indum={item.id} /></td>
                                            <td><DumyInput indum={item.name} /></td>
                                            <td><DumyInput indum={item.codename} /></td>
                                            <td><DumyInput indum={item.content_type__model} /></td>
                                        </tr>
                                    )

                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div> 



        </div>

    )
}

export default Admin