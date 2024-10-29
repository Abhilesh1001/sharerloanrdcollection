'use client'
import AddAssets from '@/components/admin/assets/AddAssets';
import React from 'react';
import DumyInput from '@/components/dummyinput/DumyInput';
import { StateProps, FixedDepositeType } from '@/type/type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import AddFixedDeposit from '@/components/admincompany/fixeddeposite/AddFixedDeposite';


const Users = () => {
  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);

  const fetchFixedDeposits = async () => {
    const response = await axios.get(`${baseurl}adminpanel/fixeddepositscompany`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    });
    return response.data;
  };
  const { data } = useQuery({ queryKey: ['addfixeddepositecompany'], queryFn: fetchFixedDeposits })
  console.log(data)

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
          Add FixedDeposite
        </button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <AddFixedDeposit />
            <div className="modal-action mt-0"></div>
          </div>
        </dialog>

        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="sticky top-0 z-1 bg-base-200">
            <tr>
              <th scope="col" className="px-6 py-2">FD ID</th>
              <th scope="col">Person ID</th>
              <th scope="col">Amount Debit</th>
              <th scope="col">Amount Credit</th>
              <th scope="col">Collection Date</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Created By</th>
              <th scope="col">Duration</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((item: FixedDepositeType) => (
              <tr key={item.fd_id}>
                <th scope="row">
                  <DumyInput indum={item.fd_id ?? null} />
                </th>
                <td>
                  <DumyInput indum={item.person??null} />
                </td>
                <td>
                  <DumyInput indum={item.amount_Debit} />
                </td>
                <td>
                  <DumyInput indum={item.amount_credit} />
                </td>
                <td>
                  <DumyInput indum={item.collection_date ? format(parseISO(item.collection_date), 'dd.MM.yy') : ''} />
                </td>
                <td>
                  <DumyInput indum={item.start_date ? format(parseISO(item.start_date), 'dd.MM.yy') : ''} />
                </td>
                <td>
                  <DumyInput indum={item.closing_date ? format(parseISO(item.closing_date), 'dd.MM.yy') : ''} />
                </td>
                <td>
                  <DumyInput indum={item.usersf ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.duration} />
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
};

export default Users;
