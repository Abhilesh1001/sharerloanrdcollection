'use client'

import React from 'react';
import DumyInput from '@/components/dummyinput/DumyInput';
import { StateProps, loanCollType } from '@/type/type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import AddLoanCollection from '@/components/admin/loancoll/AddLoanColl';



const Users = () => {
  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);

  const fetchLoanCollections = async () => {
    const response = await axios.get(`${baseurl}adminpanel/loancolls`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    });
    return response.data;
  };

  const { data } = useQuery({ queryKey: ['loanCollections'], queryFn: fetchLoanCollections });
  console.log(data);

  return (
    <div className="text-base-content bg-base-100 h-auto min-h-screen">
      <div className="ml-80 my-6 mr-20">
        <div className="p-4"></div>
        <button className="btn btn-success mr-2" onClick={() => {
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}>
          Add Loan Collection
        </button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <AddLoanCollection />
            <div className="modal-action mt-0"></div>
          </div>
        </dialog>

        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="sticky top-0 z-1 bg-base-200">
            <tr>
              <th scope="col" className="px-6 py-2">Loan Collection ID</th>
              <th scope="col">Loan Interest</th>
              <th scope="col">Collection Date</th>
              <th scope="col">Amount Collected</th>
              <th scope="col">Remarks</th>
              <th scope="col">User ID</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((item: loanCollType) => (
              <tr key={item.loan_collection_id}>
                <th scope="row">
                  <DumyInput indum={item.loan_collection_id ?? null} />
                </th>
                <td>
                  <DumyInput indum={item.loan_intrest ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.collection_date ? format(parseISO(item.collection_date), 'dd.MM.yy') : ''} />
                </td>
                <td>
                  <DumyInput indum={item.amount_collected ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.remarks ?? ''} />
                </td>
                <td>
                  <DumyInput indum={item.usersf ?? null} />
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
  );
}

export default Users;
