import React from 'react'

import Loading from '@/components/loading/Loading'

import { format, parseISO } from 'date-fns';
import { useAsset } from '@/hooks/assets/useAssets';
import AddFormButton from '../button/AddFormButton'
import UpdateBotton from '../button/UpdateButton'
import ButtonSave from '../button/ButtonSave'
import ButtonChange from '../button/ButtonChange'
import { soundClick } from '@/sound/sound'


const AssetCreation = () => {

    const { mutation, setVid, handleSubmit, setAsset, asset, vid, handleUPdate, change, handleCreate, handleChange, handleKeyDownLoanId, mutationUpdate } = useAsset()

    // console.log(mutationUpdate?.data, 'mutationupdate')


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

            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation.data !== undefined && mutation.data.data.msg} Loan Id {mutation.data !== undefined && mutation.data.data.data.asset_no}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate !== undefined && mutationUpdate.data.data.msg} Asset Id {mutationUpdate !== undefined && mutationUpdate?.data?.data?.data?.asset_no}</div></div>}</div>}


            {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">Asset ID</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}

            <form onSubmit={handleSubmit}>

                <label htmlFor="Phone" className="form-label text-sm ">Asset Name</label>
                <input className='input input-bordered w-full block' value={asset.asset_name} type={'text'} onChange={(e) => setAsset({ ...asset, asset_name: e.target.value })} />

                <label htmlFor="Phone" className="form-label text-sm ">Asset Amount</label>
                <input className='input input-bordered w-full block' value={asset.amount_Debit !== null ? asset.amount_Debit : ''} type={'number'} onChange={(e) => setAsset({ ...asset, amount_Debit: Number(e.target.value) })} />


                <div>
                    <label htmlFor="Email" className="form-label text-sm">Start Date</label>
                    <input type="date" className='input input-bordered w-full block mb-4' value={asset.debit_date} onChange={(e) => setAsset({ ...asset, debit_date: e.target.value })} />
                </div>

                {change !== 'create' && <ButtonSave label={'Submit'} buttomType={'submit'} />}

            </form>



        </>
    )
}

export default AssetCreation