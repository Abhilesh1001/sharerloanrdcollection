'use client';

import React from 'react';
import DumyInput from '@/components/dummyinput/DumyInput';
import { StateProps } from '@/type/type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AddLoanInst from '@/components/admin/loanint/AddLoanInt';
import { format, parseISO } from 'date-fns';
import AddParticulars from '@/components/admincompany/perticulars/AddPerticulars';





interface ExpenseType {
  p_id?: null | number;
  particulars: string;
  usersf: null | number;
  amount_Debit: null | number;
  amount_credit: null | number;
  time: string;
}

const Users = () => {
  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);

  const fetchExpenses = async () => {
    const response = await axios.get(`${baseurl}adminpanel/partuclarscompany`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`,
      },
    });
    return response.data;
  };

  const { data } = useQuery({ queryKey: ['addExpensecompany'], queryFn: fetchExpenses });

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
          Add Expense
        </button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <AddParticulars />
            <div className="modal-action mt-0"></div>
          </div>
        </dialog>

        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="sticky top-0 z-1 bg-base-200">
            <tr>
              <th scope="col" className="px-6 py-2">Particulars</th>
              <th scope="col">User ID</th>
              <th scope="col">Amount Debit</th>
              <th scope="col">Amount Credit</th>
              <th scope="col">Time</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((item: ExpenseType) => (
              <tr key={item.p_id}>
                <td>
                  <DumyInput indum={item.particulars} />
                </td>
                <td>
                  <DumyInput indum={item.usersf ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.amount_Debit ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.amount_credit ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.time? format(parseISO(item.time), 'dd.MM.yy') : ''} />
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
