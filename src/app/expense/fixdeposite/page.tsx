'use client'

import DumyInput from '@/components/dummyinput/DumyInput'
import { format, parseISO } from 'date-fns';
import { useFixedDeposite } from '@/hooks/particular/useFixedDeposite';
import { soundClick } from '@/sound/sound';
import FixedDepositeCreations from '@/components/particular/FixedDepositeCreations';
import { CSVLink } from "react-csv";

interface FixedDepositeType {
  fd_id?: null | number
  person_id: null|number,
  person_name : string,
  usersf?: null |  number,
  amount_Debit: null | number,
  amount_credit: null | number,
  start_date :string,
  closing_date: string,
  duration: null | number,
  interest_rate : null | number,
  is_active: boolean

}

const FixedDeposite = () => {
  const {newData} = useFixedDeposite()

  let csvData: any = []

  if (newData) {
      const newDataNew = newData?.map((item: FixedDepositeType) => {
          return [item.fd_id,item.person_id,item.person_name,item.amount_credit,item.amount_Debit,item.interest_rate,format(item.start_date,'dd-MM-yyyy'),item.is_active===true?'active':format(item.closing_date,'dd-MM-yyyy'),item.is_active===true?'active':'close']
      })

      csvData = [
          ["FD No","Customer Id","Customer Name","FD Deposite Amount","FD Debit","FD Intrest","Start Date","Close Date","Status"],
          ...newDataNew
      ];
  }



  return (
    <div className='text-base-content bg-base-100 h-auto   min-h-screen'>
            <div className='container'>
                <div className="row my-4">
                    <div className="mt-4">
                        <div>
                        <button className='btn btn-secondary mr-2'><CSVLink filename={'FixedDeposite-file.csv'} data={csvData}>Export Excel</CSVLink></button>
                            <button className="btn btn-success mr-2 " onClick={() => {
                                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                                soundClick?.play()
                                if (modal) {
                                    modal.showModal();
                                }
                            }}>Fixed Deposite</button>
                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box ">

                                    <div className="modal-action mt-0">

                                    </div>
                                    <FixedDepositeCreations />
                                </div>
                            </dialog>
                        </div>
                        <div>
                        </div>

                    </div>

                    <div className="col-sm-10 relative bg-base-300 text-nowrap overflow-y-auto shadow-md bd-base-300  mt-2  sm:rounded-lg  h-[80vh]">
                        <table className="w-full text-sm text-left rtl:text-right  ">
                            <thead className='sticky top-0 z-1  h-10'>
                                <tr>
                                    <th scope="col" className='px-6 py-2'>FD No</th>
                                    <th scope="col">Customer Id</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">FD Deposite Amount</th>
                                    <th scope="col">FD Debit</th>
                                    <th scope="col">FD Intrest</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">Close Date</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                             <tbody className='text-center'>
                                {newData?.map((items:FixedDepositeType ) => {
                                    return <tr key={items.fd_id}>
                                        <th scope="row"><DumyInput indum={items.fd_id !== undefined ? items.fd_id: null} /></th>
                                        <td><DumyInput indum={items.person_id} /></td>
                                        <td><DumyInput indum={items.person_name} /></td>
                                        <td><DumyInput indum={items.amount_Debit} />{ }</td>
                                        <td><DumyInput indum={items.amount_credit} />{ }</td>
                                        <td><DumyInput indum={items.interest_rate} />{ }</td>
                                        <td><DumyInput indum={(items.start_date !== undefined )? format(parseISO(items.start_date), 'dd-MM-yyyy') : ''} /></td>
                                        <td><DumyInput indum={items.closing_date !== undefined && items.closing_date !== null ? !items.is_active && format(parseISO(items.closing_date), 'dd-MM-yyyy') : 'active'} /></td>
                                        
                                        <td><DumyInput indum={`${items.is_active ? 'Active' : 'Close'}`} /></td>
                                    </tr>
                                })}

                            </tbody> 
                        </table>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default FixedDeposite