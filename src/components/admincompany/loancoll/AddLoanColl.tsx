import React from 'react';
import AddFormButton from '@/components/button/AddFormButton';
import ButtonChange from '@/components/button/ButtonChange';
import ButtonSave from '@/components/button/ButtonSave';
import UpdateButton from '@/components/button/UpdateButton';
import Loading from '@/components/loading/Loading';
import { soundClick } from '@/sound/sound';
import { useLoanCollection } from '@/hooks/admincompany/useLoanCollection';
import ButtonSubmit from '@/components/button/ButtonSubmit';

const AddLoanCollection = () => {
    const {
        loanCollectionData,
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
        setLoanCollectionData,
    } = useLoanCollection();

    console.log(loanCollectionData);

    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <ButtonChange onClick={handleChange} label={'Change'} />
                    {change === 'create' && <UpdateButton onClick={handleUpdate} label={'Update'} />}
                    {change !== 'create' &&<ButtonSubmit label={'Add'} css='my-4' onClick={handleSubmit}/>}
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
                            New Loan Collection Created: {mutationCreate.data?.data?.loan_collection_id}
                        </div>
                    )}
                </div>
            )}

            {change === 'create' && (
                <div className='w-full h-4 flex justify-center my-4'>
                    {mutationUpdate.isPending && <Loading />}
                    {mutationUpdate.isSuccess && (
                        <div>
                            Loan Collection ID NO: {mutationUpdate.data?.data?.loan_collection_id} updated
                        </div>
                    )}
                </div>
            )}

            <div >
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && (
                            <>
                                <label htmlFor="loanCollectionId" className="form-label text-sm">Loan Collection ID</label>
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

                        <label htmlFor="loanInterest" className="form-label text-sm">Loan Interest ID</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={loanCollectionData.loan_intrest || ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, loan_intrest: Number(e.target.value) })}
                        />
                        <label htmlFor="amountCollected" className="form-label text-sm">Amount Collected</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={loanCollectionData.amount_collected || ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, amount_collected: Number(e.target.value) })}
                        />

                        <label htmlFor="collectionDate" className="form-label text-sm">Collection Date</label>
                        <input
                            type='date'
                            className='input input-bordered w-full'
                            value={loanCollectionData.collection_date ? loanCollectionData.collection_date.split('T')[0] : ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, collection_date: e.target.value })}
                        />

                       
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="remarks" className="form-label text-sm">Remarks</label>
                        <input
                            type='text'
                            className='input input-bordered w-full'
                            value={loanCollectionData.remarks || ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, remarks: e.target.value })}
                        />
                        <label htmlFor="userID" className="form-label text-sm">User ID</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={loanCollectionData.usersf !== null ? loanCollectionData.usersf : ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, usersf: Number(e.target.value) })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddLoanCollection;
