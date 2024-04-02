'use client'

import PrBurron from '@/components/button/PrBurron'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format, parseISO } from 'date-fns';
import { useLoanamount } from '@/hooks/loan/useLoanamount'
import LoanAmountCreation from '@/components/loan/LoanAmountCreation'
import UpdateBotton from '@/components/button/UpdateButton';




interface loanDetails {
    id: number | null,
    loan_person: string,
    loan_amount: number | null,
    opening_date: string,
    closing_date: string,
    is_active: boolean,
    total_pending_amoount?: number | null,
    balance_amount?: number | null,
    remarks: string,
}




const Vendor = () => {

    const { setEnabled, newData } = useLoanamount()



    return (
        <div className='text-base-content bg-base-100 h-auto   min-h-screen'>
            <div className='container'>
                <div className="row my-4">
                    <div className="mt-4">
                        <div>
                            <button className="btn btn-success mr-2 " onClick={() => {
                                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                                if (modal) {
                                    modal.showModal();
                                }
                            }}>Add Loan Person</button>
                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box ">

                                    <div className="modal-action mt-0">

                                    </div>
                                    <LoanAmountCreation />
                                </div>
                            </dialog>

                            <UpdateBotton onClick={() => setEnabled(true)} label={'View'} />
                        </div>
                        <div>
                        </div>

                    </div>


                    <div className="col-sm-8 relative bg-base-300 text-nowrap overflow-y-auto shadow-md bd-base-300  mt-2  sm:rounded-lg  h-[80vh]">
                        <table className="w-full text-sm text-left rtl:text-right  ">
                            <thead className='sticky top-0 z-1  h-10'>
                                <tr>
                                    <th scope="col" className='px-6 py-2'>Lone No</th>
                                    <th scope="col">Loan Person</th>
                                    <th scope="col">Loan Amount</th>
                                    <th scope="col">Loan Opening Date</th>
                                    <th scope="col">Loan Close Date</th>
                                    <th scope="col">Loan Status</th>
                                    <th scope="col">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {newData?.map((items: loanDetails) => {
                                    return <tr key={items.id}>
                                        <th scope="row"><DumyInput indum={items.id !== undefined ? items.id : null} /></th>
                                        <td><DumyInput indum={items.loan_person} /></td>
                                        <td><DumyInput indum={items.loan_amount} />{ }</td>
                                        <td><DumyInput indum={items.opening_date !== undefined ? format(parseISO(items.opening_date), 'dd.MM.yy') : ''} /></td>
                                        <td><DumyInput indum={items.closing_date !== undefined && items.closing_date !== null ? format(parseISO(items.closing_date), 'dd.MM.yy') : ''} /></td>

                                        <td><DumyInput indum={`${items.is_active ? 'Loan Active' : 'Loan Paid'}`} /></td>
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