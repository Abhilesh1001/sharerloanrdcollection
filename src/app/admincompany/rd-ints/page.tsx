'use client'

import DumyInput from '@/components/dummyinput/DumyInput';
import { StateProps,RDIntType } from '@/type/type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import AddRdInst from '@/components/admincompany/rdint/AddRdInst';



const Users = () => {
  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);

  const fetchLoanIntervals = async () => {
    const response = await axios.get(`${baseurl}adminpanel/rdintscompany`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    });
    return response.data;
  };

  const { data } = useQuery({ queryKey: ['addRdintcompany'], queryFn: fetchLoanIntervals });

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
          Add Rd Intrest
        </button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <AddRdInst />
            <div className="modal-action mt-0"></div>
          </div>
        </dialog>

        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="sticky top-0 z-1 bg-base-200">
            <tr>
              <th scope="col" className="px-6 py-2">RD ID</th>
              <th scope="col">Person</th>
              <th scope="col">User ID</th>
              <th scope="col">Start Date</th>
              <th scope="col">Closing Date</th>
              <th scope="col">Is Active</th>
              <th scope="col">Duration</th>
              <th scope="col">Interest Rate</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((item: RDIntType) => (
              <tr key={item.rd_id}>
                <th scope="row">
                  <DumyInput indum={item.rd_id ?? null} />
                </th>
                <td>
                  <DumyInput indum={item.person ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.usersf ?? null} />
                </td>
                <td>
                  <DumyInput indum={item.start_date ? format(parseISO(item.start_date), 'dd.MM.yy') : ''} />
                </td>
                <td>
                  <DumyInput indum={item.closing_date ? format(parseISO(item.closing_date), 'dd.MM.yy') : ''} />
                </td>
                <td>
                  <DumyInput indum={item.is_active == true ? 'Active' : 'Inactive'} />
                </td>
                <td>
                  <DumyInput indum={item.duration ?? null} />
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
  );
}

export default Users;
