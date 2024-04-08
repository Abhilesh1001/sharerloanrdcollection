import React from 'react'

import { format, parseISO } from 'date-fns';
import { useAsset } from '@/hooks/assets/useAssets';
import AddFormButton from '../button/AddFormButton'
import UpdateBotton from '../button/UpdateButton'
import ButtonSave from '../button/ButtonSave'
import ButtonChange from '../button/ButtonChange'
import { soundClick } from '@/sound/sound'
import Loading from '../loading/Loading';
import { useParticular } from '@/hooks/particular/useParticular';




const ParticularCreation = () => {

    const { mutation, setVid, handleSubmit, setExpense, expense, vid, handleUPdate, change, handleCreate, handleChange, handleKeyDownLoanId, mutationUpdate } = useParticular()



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

            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation.data !== undefined && mutation.data.data.msg} Expense Id {mutation.data !== undefined && mutation.data.data.data.p_id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate !== undefined && mutationUpdate.data.data.msg} Asset Id {mutationUpdate !== undefined && mutationUpdate?.data?.data?.data?.p_id}</div></div>}</div>}


            {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">Expense Id</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}

            <form onSubmit={handleSubmit}>

                <label htmlFor="Phone" className="form-label text-sm ">Expense Name</label>
                <input className='input input-bordered w-full block' value={expense.particulars} type={'text'} onChange={(e) => setExpense({ ...expense,particulars: e.target.value })} />

                <label htmlFor="Phone" className="form-label text-sm ">Cedit Amount</label>
                <input className='input input-bordered w-full block' value={expense.amount_credit !== null ? expense.amount_credit : ''} type={'number'} onChange={(e) => setExpense({ ...expense, amount_credit: Number(e.target.value) })} />

                <label htmlFor="Phone" className="form-label text-sm ">Debit Amount</label>
                <input className='input input-bordered w-full block mb-4' value={expense.amount_Debit!== null ? expense.amount_Debit : ''} type={'number'} onChange={(e) => setExpense({ ...expense, amount_Debit: Number(e.target.value) })} />


                {change !== 'create' && <ButtonSave label={'Submit'} buttomType={'submit'} />}

            </form>



        </>
  )
}

export default ParticularCreation