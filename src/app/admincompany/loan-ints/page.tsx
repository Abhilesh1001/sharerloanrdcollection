'use client'

import DumyInput from '@/components/dummyinput/DumyInput';
import { StateProps, loanType } from '@/type/type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import AddLoanInst from '@/components/admincompany/loanint/AddLoanInt';




const Users = () => {
  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);

  const fetchLoanCollections = async () => {
    const response = await axios.get(`${baseurl}adminpanel/loanintscompany`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    });
    return response.data;
  };

  const { data } = useQuery({ queryKey: ['addloanintcompany'], queryFn: fetchLoanCollections });
 

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
          Add Loan Intrest
        </button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <AddLoanInst />
            <div className="modal-action mt-0"></div>
          </div>
        </dialog>

        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="sticky top-0 z-1 bg-base-200">
            <tr>
              <th scope="col" className="px-6 py-2">Loan ID</th>
              <th scope="col">Person</th>
              <th scope="col">Loan Amount</th>
              <th scope="col">User ID</th>
              <th scope="col">Remarks</th>
              <th scope="col">Is Active</th>
              <th scope="col">Start Date</th>
              <th scope="col">Days</th>
              <th scope="col">Duration</th>
              <th scope="col">Closing Date</th>
              <th scope="col">Interest Rate</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((item: loanType) => (
              <tr key={item.loan_id}>
                <th scope="row">
                  <DumyInput indum={item.loan_id ?? null} />
                </th>
                <td>
                  <DumyInput indum={item.person ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.loan_amount} />
                </td>
                <td>
                  <DumyInput indum={item.usersf ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.remarks ?? ''} />
                </td>
                <td>
                  <DumyInput indum={item.is_active ? 'Active':'Inactive'} />
                </td>
                <td>
                  <DumyInput indum={item.start_date? format(parseISO(item.start_date), 'dd.MM.yy') : ''} />
                </td>
                <td>
                  <DumyInput indum={item.days ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.duration ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.closing_date? format(parseISO(item.closing_date), 'dd.MM.yy') : ''} />
                </td>
                <td>
                  <DumyInput indum={item.interest_rate ?? null} />
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

export default Users;
