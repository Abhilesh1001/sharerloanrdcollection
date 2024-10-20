import React from 'react';
import ButtonChange from '@/components/button/ButtonChange';
import UpdateButton from '@/components/button/UpdateButton';
import Loading from '@/components/loading/Loading';
import { soundClick } from '@/sound/sound';

import ButtonSubmit from '@/components/button/ButtonSubmit';
import { useRdCollection } from '@/hooks/admin/useRdCollection';

export interface RDCollType {
    rd_collection_id?: null | number,
    rd_interest: null | number,
    collection_date: string,
    amount_collected: null | number,
    remarks: string,
    usersf: null | number
}

const AddRdCollection = () => {
    const {
        rdCollectionData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownLoanCollectionId,
        vid,
        setVid,
        setRdCollectionData,
    } = useRdCollection();

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
                            New RD Collection Created: {mutationCreate.data?.data?.rd_collection_id}
                        </div>
                    )}
                </div>
            )}

            {change === 'create' && (
                <div className='w-full h-4 flex justify-center my-4'>
                    {mutationUpdate.isPending && <Loading />}
                    {mutationUpdate.isSuccess && (
                        <div>
                            RD Collection ID NO: {mutationUpdate.data?.data?.rd_collection_id} updated
                        </div>
                    )}
                </div>
            )}

            <div>
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && (
                            <>
                                <label htmlFor="rdCollectionId" className="form-label text-sm">RD Collection ID</label>
                                <input
                                    required
                                    type="number"
                                    className="input input-bordered w-full"
                                    value={vid}
                                    onKeyDown={handleKeyDownLoanCollectionId}
                                    onChange={(e) => setVid(e.target.value)}
                                />
                            </>
                        )}

                        <label htmlFor="loanInterest" className="form-label text-sm">Rd Interest ID</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={rdCollectionData.rd_interest || ''}
                            onChange={(e) => setRdCollectionData({ ...rdCollectionData, rd_interest: Number(e.target.value) })}
                        />
                        <label htmlFor="amountCollected" className="form-label text-sm">Amount Collected</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={rdCollectionData.amount_collected || ''}
                            onChange={(e) => setRdCollectionData({ ...rdCollectionData, amount_collected: Number(e.target.value) })}
                        />

                        <label htmlFor="collectionDate" className="form-label text-sm">Collection Date</label>
                        <input
                            type='date'
                            className='input input-bordered w-full'
                            value={rdCollectionData.collection_date ? rdCollectionData.collection_date.split('T')[0] : ''}
                            onChange={(e) => setRdCollectionData({ ...rdCollectionData, collection_date: e.target.value })}
                        />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="remarks" className="form-label text-sm">Remarks</label>
                        <input
                            type='text'
                            className='input input-bordered w-full'
                            value={rdCollectionData.remarks || ''}
                            onChange={(e) => setRdCollectionData({ ...rdCollectionData, remarks: e.target.value })}
                        />
                        <label htmlFor="userID" className="form-label text-sm">User ID</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={rdCollectionData.usersf !== null ? rdCollectionData.usersf : ''}
                            onChange={(e) => setRdCollectionData({ ...rdCollectionData, usersf: Number(e.target.value) })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRdCollection;
