'use client'

import AddCompanyModal from '@/components/admin/company/AddCompanyModal';
import { StateProps } from '@/type/type';

import React from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import DumyInput from '@/components/dummyinput/DumyInput'

export interface companyType{
    id : null | number
    name : string,
    company_code : null | number
}





const Company = () => {

  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)


  const getTodos = async () => {

    const res = await axios.get(`${baseurl}adminpanel/companies`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })

  
    return res.data


  }

  const { data } = useQuery({ queryKey: ['apicompany'], queryFn: getTodos })

  return (
    <div className="text-base-content bg-base-100 h-auto min-h-screen">
    <div className="ml-80 my-6 mr-20">

      <div className="p-2"></div>
      <button className="btn btn-success mr-2 " onClick={() => {
              const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
              
              if (modal) {
                modal.showModal();
              }
            }}>Add Company</button>
            
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box w-11/12 max-w-5xl ">

                <div className="modal-action mt-0">
                </div>
                <AddCompanyModal />
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
            <th scope="col" className="px-6 py-2">Company ID</th>
            <th scope="col">Company Name</th>
            <th scope="col">Comapny Code</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((items: companyType) => (
            <tr key={items.id}>
              <th scope="row">
                <DumyInput indum={items.id !== undefined ? items.id : null} />
              </th>
              <td>
              
                  <DumyInput indum={items.name} />
  
              </td>
              <td>
 
                  <DumyInput indum={items.company_code} />

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

export default Company