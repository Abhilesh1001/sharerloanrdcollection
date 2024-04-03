import React from 'react'


import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format, parseISO } from 'date-fns';
import { useLoanamount } from '@/hooks/loan/useLoanamount'
import AddFormButton from '../button/AddFormButton'
import UpdateBotton from '../button/UpdateButton'
import ButtonSave from '../button/ButtonSave'
import ButtonChange from '../button/ButtonChange'


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



const LoanAmountCreation = () => {

    const {  mutation,setVid, handleSubmit, setLoan, handleKeyDown, loan, vid,handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDownLoanId, mutationUpdate } = useLoanamount()

    console.log(mutationUpdate?.data, 'mutationupdate')


    return (
        <>
            <div className='flex justify-between'>
                <div>
                    <AddFormButton onClick={handleCreate} label={'Create'} />
                    <ButtonChange onClick={handleChange} label={'Change'} />
                    {change === 'create' && <UpdateBotton onClick={handleUPdate} label={'Update'} />}
                </div>

                <div>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-error">Close</button>
                    </form>
                </div>

            </div>
            <div>
            </div>

            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation.data !== undefined && mutation.data.data.msg} Loan Id {mutation.data !== undefined && mutation.data.data.data.loan_id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate !== undefined && mutationUpdate.data.data.msg} Loan Id {mutationUpdate !== undefined && mutationUpdate?.data?.data?.data?.loan_id}</div></div>}</div>}



            {change !== 'create' && <><label htmlFor="Name" className="form-label text-sm">Person ID</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}

            {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">Loan ID</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}


            {sfcreate === 'create' && <form onSubmit={handleSubmit}>

                <label htmlFor="Name" className="form-label text-sm">Name</label>
                <DumyInput indum={loan.name} />
                <label htmlFor="Phone" className="form-label text-sm ">Loan Amount</label>
                <input className='input input-bordered w-full block' value={loan.amount !== null ? loan.amount : ''} type={'number'} onChange={(e) => setLoan({ ...loan, amount: Number(e.target.value) })} />

                <div>
                    <input type="checkbox" className='my-2' checked={loan.is_active} onChange={(e) => setLoan({ ...loan, is_active: e.target.checked })} />
                    <label htmlFor="" className="form-label text-sm">{loan.is_active ? 'Loan Open' : 'Loan Close'}</label>
                </div>
                <div className='flex'>
                    <div>
                        <label htmlFor="Phone" className="form-label text-sm">Duration</label>
                        <input type={'number'} className='input input-bordered w-full block' value={loan.duration == null ? '' : loan.duration} onChange={(e) => setLoan({ ...loan, duration: Number(e.target.value) })} />
                    </div>

                    <div>
                        <label htmlFor="Phone" className="form-label text-sm ">Interest</label>
                        <input type={'number'} className='input input-bordered w-full block ml-1' value={loan.interest_rate === null ? '' : loan.interest_rate} onChange={(e) => setLoan({ ...loan, interest_rate: Number(e.target.value) })} />
                    </div>
                    <div>
                        <label htmlFor="Phone" className="form-label text-sm ">Days</label>
                        <input type={'number'} className='input input-bordered w-full block ml-4' value={loan.days === null ? '' : loan.days} onChange={(e) => setLoan({ ...loan, days: Number(e.target.value) })} />
                    </div>

                </div>

                <label htmlFor="Phone" className="form-label text-sm ">Remarks</label>
                <input className='input input-bordered w-full block' value={loan.remarks} onChange={(e) => setLoan({ ...loan, remarks: e.target.value })} />


                <div className='flex'>
                    <div>
                        <label htmlFor="Email" className="form-label text-sm">Start Date</label>
                        <input type="date" className='input input-bordered w-full block' value={loan.start_date} onChange={(e) => setLoan({ ...loan, start_date: e.target.value })}/>
                    </div>

                    <div>
                        <label htmlFor="Email" className="form-label text-sm">Closing Date</label>

                        <input type="date" className='input input-bordered w-full block mb-2 ml-2' value={loan.closing_date === null ? '' : loan.closing_date} onChange={(e) => setLoan({ ...loan, closing_date: e.target.value })} />
                    </div>
                </div>

                {change !== 'create' && <ButtonSave label={'Submit'} buttomType={'submit'} />}

            </form>}



        </>
    )
}

export default LoanAmountCreation