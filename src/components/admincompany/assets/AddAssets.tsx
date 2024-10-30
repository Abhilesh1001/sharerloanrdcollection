import React from 'react'
import AddFormButton from '@/components/button/AddFormButton'
import ButtonChange from '@/components/button/ButtonChange'
import ButtonSave from '@/components/button/ButtonSave'
import UpdateBotton from '@/components/button/UpdateButton'
import Loading from '@/components/loading/Loading'

import { soundClick } from '@/sound/sound'
import { useAsset } from '@/hooks/admincompany/useAsset'



const AddAssets = () => {
    const {  assetData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownAssetId,
        vid,
        setVid,
        setAssetData,} = useAsset()


  return (
    <div>
    <div className='flex justify-between'>
        <div>
            {/* <AddFormButton onClick={handleCreate} label={'Create'} /> */}
            <ButtonChange onClick={handleChange} label={'Change'} />
            {change === 'create' && <UpdateBotton onClick={handleUpdate} label={'Update'} />}
            {change !== 'create' && <ButtonSave label={'Submit'} css='my-4' buttomType={'button'} onClick={handleSubmit} />}
        </div>

        <div>
            <form method="dialog">
                {/* If there is a button in form, it will close the modal */}
                <button className="btn btn-error" onClick={() => soundClick?.play()}>Close</button>
            </form>
        </div>
    </div>

    {change !== 'create' && (
        <div className='w-full h-4 flex justify-center my-4'>
            {mutationCreate.isPending && <Loading />}
            {mutationCreate.isSuccess && (
                <div>
                    New Asset Created: {mutationCreate.data?.data?.asset_no}
                </div>
            )}
        </div>
    )}

    {change === 'create' && (
        <div className='w-full h-4 flex justify-center my-4'>
            {mutationUpdate.isPending && <Loading />}
            {mutationUpdate.isSuccess && (
                <div>
                    Asset ID NO: {mutationUpdate.data?.data?.asset_no} updated
                </div>
            )}
        </div>
    )}

    <div>
        <div className="row">
            <div className="col-sm-6">
                {change === 'create' && (
                    <>
                        <label htmlFor="AssetID" className="form-label text-sm">Asset ID</label>
                        <input
                            required
                            value={vid}
                            type="number"
                            onKeyDown={(e) => handleKeyDownAssetId(e)}
                            onChange={(e) => setVid(e.target.value)}
                            className="input input-bordered w-full block"
                        />
                    </>
                )}

                <label htmlFor="assetName" className="form-label text-sm">Asset Name</label>
                <input
                    type='text'
                    className='input input-bordered w-full block'
                    value={assetData.asset_name}
                    onChange={(e) => setAssetData({ ...assetData, asset_name: e.target.value })}
                />

                <label htmlFor="amountDebit" className="form-label text-sm">Amount Debit</label>
                <input
                    type='number'
                    className='input input-bordered w-full'
                    value={assetData.amount_Debit || ''}
                    onChange={(e) => setAssetData({ ...assetData, amount_Debit: Number(e.target.value) })}
                />

                <label htmlFor="debitDate" className="form-label text-sm">Debit Date</label>
                <input
                    type='date'
                    className='input input-bordered w-full'
                    value={assetData.debit_date}
                    onChange={(e) => setAssetData({ ...assetData, debit_date: e.target.value })}
                />
            </div>

            <div className="col-sm-6">
                <label htmlFor="userID" className="form-label text-sm">User ID</label>
                <input
                    type='number'
                    className='input input-bordered w-full block'
                    value={assetData.usersf !== null ? assetData.usersf : ''}
                    onChange={(e) => setAssetData({ ...assetData, usersf: Number(e.target.value) })}
                />
            </div>
        </div>
    </div>
</div>

  )
}

export default AddAssets