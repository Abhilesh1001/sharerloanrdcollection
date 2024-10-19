import React from 'react';
import ButtonChange from '@/components/button/ButtonChange';
import UpdateButton from '@/components/button/UpdateButton';
import Loading from '@/components/loading/Loading';
import { soundClick } from '@/sound/sound';
import ButtonSubmit from '@/components/button/ButtonSubmit';
import { useShareHolder } from '@/hooks/admin/useShareHolder';

const AddShareHolder = () => {
    const {
        shareHolderData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownShareholderId,
        vid,
        setVid,
        setShareHolderData,
    } = useShareHolder();

    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <ButtonChange onClick={handleChange} label={'Change'} />
                    {change === 'create' && <UpdateButton onClick={handleUpdate} label={'Update'} />}
                    {change !== 'create' && <ButtonSubmit label={'Add'} css='my-4' onClick={handleSubmit} />}
                </div>
                <div>
                    <form method="dialog">
                        <button className="btn btn-error" onClick={() => soundClick?.play()}>Close</button>
                    </form>
                </div>
            </div>

            {change !== 'create' && (
                <div className='w-full h-4 flex justify-center my-4'>
                    {mutationCreate.isPending && <Loading />}
                    {mutationCreate.isSuccess && (
                        <div>
                            New Shareholder Created: {mutationCreate.data?.data?.shf_id}
                        </div>
                    )}
                </div>
            )}

            {change === 'create' && (
                <div className='w-full h-4 flex justify-center my-4'>
                    {mutationUpdate.isPending && <Loading />}
                    {mutationUpdate.isSuccess && (
                        <div>
                            Shareholder ID NO: {mutationUpdate.data?.data?.shf_id} updated
                        </div>
                    )}
                </div>
            )}

            <div>
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && (
                            <>
                                <label htmlFor="loanInterestId" className="form-label text-sm">Shareholder ID</label>
                                <input
                                    required
                                    type="number"
                                    className="input input-bordered w-full"
                                    value={vid}
                                    onKeyDown={handleKeyDownShareholderId}
                                    onChange={(e) => setVid(e.target.value)}
                                />
                            </>
                        )}

                        <label htmlFor="person" className="form-label text-sm">Person</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={shareHolderData.person || ''}
                            onChange={(e) => setShareHolderData({ ...shareHolderData, person: Number(e.target.value) })}
                        />
                        <label htmlFor="amountCredit" className="form-label text-sm">Amount Credit</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={shareHolderData.amount_credit || ''}
                            onChange={(e) => setShareHolderData({ ...shareHolderData, amount_credit: Number(e.target.value) })}
                        />
                        <label htmlFor="amountDebit" className="form-label text-sm">Amount Debit</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={shareHolderData.amount_Debit || ''}
                            onChange={(e) => setShareHolderData({ ...shareHolderData, amount_Debit: Number(e.target.value) })}
                        />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="collectionDate" className="form-label text-sm">Collection Date</label>
                        <input
                            type='date'
                            className='input input-bordered w-full'
                            value={shareHolderData.collection_date? shareHolderData.collection_date.split('T')[0] : ''}
                            onChange={(e) => setShareHolderData({ ...shareHolderData, collection_date: e.target.value })}
                        />
                        <label htmlFor="particulars" className="form-label text-sm">Particulars</label>
                        <input
                            type='text'
                            className='input input-bordered w-full'
                            value={shareHolderData.particulars}
                            onChange={(e) => setShareHolderData({ ...shareHolderData, particulars: e.target.value })}
                        />
                        <label htmlFor="userID" className="form-label text-sm">User ID</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={shareHolderData.uusersf !== null ? shareHolderData.uusersf : ''}
                            onChange={(e) => setShareHolderData({ ...shareHolderData, uusersf: Number(e.target.value) })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddShareHolder;
