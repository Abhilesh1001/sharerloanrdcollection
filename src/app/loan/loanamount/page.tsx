'use client'

import DumyInput from '@/components/dummyinput/DumyInput'
import { format, parseISO } from 'date-fns';
import { useLoanamount } from '@/hooks/loan/useLoanamount'
import LoanAmountCreation from '@/components/loan/LoanAmountCreation'
import { soundClick } from '@/sound/sound';
import { CSVLink } from "react-csv";



interface loanDetails {
    closing_date: string,
    duration: null | number,
    interest_rate: null | number,
    is_active: boolean,
    loan_amount: null | number
    loan_id: null | number
    person_id: null | number
    person_name: string
    remarks: string
    start_date: string
    time: string
    usersf: null | number

}

const Vendor = () => {

    const { newData:data } = useLoanamount()


    
  let csvData: any = []

  if (data) {
    const newData = data?.map((items: loanDetails) => {
      return [items.loan_id,items.person_id, items.person_name,items.loan_amount,items.interest_rate,format(items.start_date,'dd-MM-yyyy'),items.is_active===true?'active':format(items.closing_date,'dd-MM-yyyy'),items.is_active===true?'active':'close',items.remarks]
    })

    csvData = [
      ["Lone No", "Customer Id", "Customer Name", "Loan Amount", "Loan Intrest","Loan Opening Date", "Loan Close Date", "Loan Status",'Remarks'],
      ...newData
    ];
  }


    return (
        <div className='text-base-content bg-base-100 h-auto   min-h-screen'>
            <div className='container'>
                <div className="row my-4">
                    <div className="mt-4">

                        <div className='flex'>
                        <button className='btn btn-secondary mr-2'><CSVLink filename={'LoanInt-file.csv'} data={csvData}>Export Excel</CSVLink></button>
                        <div>
                            <button className="btn btn-success mr-2 " onClick={() => {
                                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                                soundClick?.play()
                                if (modal) {
                                    modal.showModal();
                                }
                            }}>Add Loan Intrest</button>
                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box w-11/12 max-w-5xl ">

                                    <div className="modal-action mt-0">

                                    </div>
                                    <LoanAmountCreation />
                                </div>
                            </dialog>
                        </div>

                        </div>
                  
                        
                        <div>
                        </div>

                    </div>

                    <div className="col-sm-10 relative bg-base-300 text-nowrap overflow-y-auto shadow-md bd-base-300  mt-2  sm:rounded-lg  h-[80vh]">
                        <table className="w-full text-sm text-left rtl:text-right  ">
                            <thead className='sticky top-0 z-1  h-10'>
                                <tr>
                                    <th scope="col" className='px-6 py-2'>Lone No</th>
                                    <th scope="col">Customer Id</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Loan Amount</th>
                                    <th scope="col">Loan Intrest</th>
                                    <th scope="col">Loan Opening Date</th>
                                    <th scope="col">Loan Close Date</th>
                                    <th scope="col">Loan Status</th>
                                    <th scope="col">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {data?.map((items: loanDetails) => {
                                    return <tr key={items.loan_id}>
                                        <th scope="row"><DumyInput indum={items.loan_id !== undefined ? items.loan_id : null} /></th>
                                        <td><DumyInput indum={items.person_id} /></td>
                                        <td><DumyInput indum={items.person_name} /></td>
                                        <td><DumyInput indum={items.loan_amount} />{ }</td>
                                        <td><DumyInput indum={items.interest_rate} />{ }</td>
                                        <td><DumyInput indum={items.start_date !== undefined ? format(parseISO(items.start_date), 'dd.MM.yy') : ''} /></td>
                                        <td><DumyInput indum={items.closing_date !== undefined && items.closing_date !== null ? !items.is_active && format(parseISO(items.closing_date), 'dd.MM.yy') : ''} /></td>

                                        <td><DumyInput indum={`${items.is_active ? 'Active' : 'Close'}`} /></td>
                                        <td><DumyInput indum={items.remarks} /></td>
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

export default Vendor