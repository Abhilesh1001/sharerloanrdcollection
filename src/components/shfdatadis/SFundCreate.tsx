import React from 'react'

import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'

import DumyInput from '@/components/dummyinput/DumyInput'

import { useShfdata } from '@/hooks/shf/useShfdata'
import AddFormButton from '../button/AddFormButton'
import UpdateBotton from '../button/UpdateButton'
import ButtonChange from '../button/ButtonChange'
import ButtonSave from '../button/ButtonSave'


const SFundCreate = () => {
    const { setEnabled, mutation, data, handleKeyDown, vid, setVid, handleSubmit, sharfund, setShareFund } = useShfdata()


    return (
        <>
            <div className='flex justify-between'>

                <div>
                    <AddFormButton label={'Create'} />
                    <ButtonChange label={'Change'} />
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
            <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{data !== undefined && data.data.msg}</div></div>}</div>
            <label htmlFor="Vendor" className="form-label text-sm">Holder Id</label>
            <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" />


            <form onSubmit={handleSubmit}>
                <label htmlFor="Name" className="form-label text-sm">Name</label>
                <DumyInput indum={sharfund.name} />
                <label htmlFor="Phone" className="form-label text-sm ">Credit</label>
                <input className='input input-bordered w-full block' value={sharfund.amount_credit===null?'':sharfund.amount_credit} type={'number'} onChange={(e) => setShareFund({ ...sharfund, amount_credit: Number(e.target.value) })} />

                <label htmlFor="Email" className="form-label text-sm">Debit</label>
                <input type={'number'} className='input input-bordered w-full block'   value={sharfund.amount_debit===null ?'':sharfund.amount_debit} onChange={(e) => setShareFund({ ...sharfund, amount_debit: Number(e.target.value) })} />
                <label htmlFor="pan" className="form-label text-sm">Particulars</label>
                <input  className = 'input input-bordered w-full block mb-4' value={sharfund.particulars} onChange={(e) => setShareFund({ ...sharfund, particulars: e.target.value })} />


                <ButtonSave label={'Submit'} buttomType={'submit'} />
            </form>


        </>
    )
}

export default SFundCreate