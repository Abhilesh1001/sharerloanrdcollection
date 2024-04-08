import React from 'react'

import Loading from '@/components/loading/Loading'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format, parseISO } from 'date-fns';
import { useStaffSalary } from '@/hooks/particular/useStaffSalary';
import AddFormButton from '../button/AddFormButton'
import UpdateBotton from '../button/UpdateButton'
import ButtonSave from '../button/ButtonSave'
import ButtonChange from '../button/ButtonChange'
import { soundClick } from '@/sound/sound'

const StaffSalaryCreate = () => {

    const { mutation, setVid, handleSubmit, setStaffSal, handleKeyDown, staffsal, vid, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDownLoanId, mutationUpdate } = useStaffSalary()
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
                        <button className="btn btn-error" onClick={() => soundClick?.play()}>Close</button>
                    </form>
                </div>

            </div>
            <div>
            </div>

            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation.data !== undefined && mutation.data.data.msg} Salay Deposite Id {mutation.data !== undefined && mutation.data.data.data.sd_id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate !== undefined && mutationUpdate.data.data.msg} Salay Deposite Id {mutationUpdate !== undefined && mutationUpdate?.data?.data?.data?.sd_id}</div></div>}</div>}

            {change !== 'create' && <><label htmlFor="Name" className="form-label text-sm">Customer ID</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}

            {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">Salay Deposite Id</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}


            {sfcreate === 'create' && <form onSubmit={handleSubmit}>

                <label htmlFor="Name" className="form-label text-sm">Name</label>
                <DumyInput indum={staffsal.person_name} />
                <label htmlFor="Phone" className="form-label text-sm ">Salay Amount</label>
                <input className='input input-bordered w-full block' value={staffsal.amount_Debit !== null ? staffsal.amount_Debit : ''} type={'number'} onChange={(e) => setStaffSal({ ...staffsal, amount_Debit: Number(e.target.value) })} />




                <label htmlFor="Email" className="form-label text-sm">Closing Date</label>

                <input type="date" className='input input-bordered w-full block mb-2 ml-2' value={staffsal.collection_date === null ? '' : staffsal.collection_date} onChange={(e) => setStaffSal({ ...staffsal, collection_date: e.target.value })} />



                <label htmlFor="Phone" className="form-label text-sm ">Remarks</label>
                <input className='input input-bordered w-full block mb-4' value={staffsal.remarks} onChange={(e) => setStaffSal({ ...staffsal, remarks: e.target.value })} />


                {change !== 'create' && <ButtonSave label={'Submit'} buttomType={'submit'} />}

            </form>}



        </>
    )
}

export default StaffSalaryCreate