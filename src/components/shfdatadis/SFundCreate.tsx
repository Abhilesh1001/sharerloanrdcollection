import React from 'react'

import Loading from '@/components/loading/Loading'

import DumyInput from '@/components/dummyinput/DumyInput'

import { useShfdata } from '@/hooks/shf/useShfdata'
import AddFormButton from '../button/AddFormButton'
import UpdateBotton from '../button/UpdateButton'
import ButtonChange from '../button/ButtonChange'
import ButtonSave from '../button/ButtonSave'
import { soundClick } from '@/sound/sound'


const SFundCreate = () => {
    const { mutation, data, handleKeyDown, vid, setVid, handleUPdate, handleCreate, handleChange, change, handleSubmit, sharfund, setShareFund, handleKeyDownId, mutationUpdate } = useShfdata()

    return (
        <>
            <div className='flex justify-between'>
                <div>
                    {/* toDo List  */}
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


            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation.data !== undefined && mutation.data.data.msg} Fund ID {mutation.data !== undefined && mutation.data.data.data.shf_id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate !== undefined && mutationUpdate.data.data.msg} Fund Id {mutationUpdate !== undefined && mutationUpdate?.data?.data?.data?.shf_id}</div></div>}</div>}




            {change !== 'create' && <><label htmlFor="Vendor" className="form-label text-sm">Customer Id</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}

            {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">Fund Deposite ID</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="Name" className="form-label text-sm">Name</label>
                <DumyInput indum={sharfund.name} />
                <label htmlFor="Phone" className="form-label text-sm ">Credit</label>
                <input required className='input input-bordered w-full block' value={sharfund.amount_credit === null ? '' : sharfund.amount_credit} type={'number'} onChange={(e) => setShareFund({ ...sharfund, amount_credit: Number(e.target.value) })} />

                <label htmlFor="Email" className="form-label text-sm">Debit</label>
                <input required type={'number'} className='input input-bordered w-full block' value={sharfund.amount_debit === null ? '' : sharfund.amount_debit} onChange={(e) => setShareFund({ ...sharfund, amount_debit: Number(e.target.value) })} />
                <label htmlFor="pan" className="form-label text-sm">Particulars</label>
                <input required className='input input-bordered w-full block mb-4' value={sharfund.particulars} onChange={(e) => setShareFund({ ...sharfund, particulars: e.target.value })} />
                {change !== 'create' && <ButtonSave label={'Submit'} buttomType={'submit'} />}
            </form>


        </>
    )
}

export default SFundCreate