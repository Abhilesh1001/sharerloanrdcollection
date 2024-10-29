import React from 'react';
import ButtonChange from '@/components/button/ButtonChange';
import UpdateButton from '@/components/button/UpdateButton';
import Loading from '@/components/loading/Loading';
import { soundClick } from '@/sound/sound';
import ButtonSubmit from '@/components/button/ButtonSubmit';
import { useLoanIntrest } from '@/hooks/admincompany/useLoanIntrest';

const AddLoanInst = () => {
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
    } = useLoanIntrest();

    console.log(loanCollectionData);

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
                            New Loan Interest Created: {mutationCreate.data?.data?.loan_interest_id}
                        </div>
                    )}
                </div>
            )}

            {change === 'create' && (
                <div className='w-full h-4 flex justify-center my-4'>
                    {mutationUpdate.isPending && <Loading />}
                    {mutationUpdate.isSuccess && (
                        <div>
                            Loan Interest ID NO: {mutationUpdate.data?.data?.loan_interest_id} updated
                        </div>
                    )}
                </div>
            )}

            <div>
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && (
                            <>
                                <label htmlFor="loanInterestId" className="form-label text-sm">Loan Interest ID</label>
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

                        <label htmlFor="interestRate" className="form-label text-sm">Person</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={loanCollectionData.person || ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, person: Number(e.target.value) })}
                        />
                        <label htmlFor="loanamount" className="form-label text-sm">Loan Amount</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={loanCollectionData.loan_amount || ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, loan_amount: Number(e.target.value) })}
                        />
                        <label htmlFor="intrestrate" className="form-label text-sm">Interest Rate (%)</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={loanCollectionData.interest_rate || ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, interest_rate: Number(e.target.value) })}
                        />


                        <label htmlFor="remarks" className="form-label text-sm">Remarks</label>
                        <input
                            type='text'
                            className='input input-bordered w-full'
                            value={loanCollectionData.remarks || ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, remarks: e.target.value })}
                        />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="startDate" className="form-label text-sm">Start Date</label>
                        <input
                            type='date'
                            className='input input-bordered w-full'
                            value={loanCollectionData.start_date ? loanCollectionData.start_date.split('T')[0] : ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, start_date: e.target.value })}
                        />
                        <label htmlFor="closingDate" className="form-label text-sm">Closing Date</label>
                        <input
                            type='date'
                            className='input input-bordered w-full'
                            value={loanCollectionData.closing_date ? loanCollectionData.closing_date.split('T')[0] : ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, closing_date: e.target.value })}
                        />
                        <label htmlFor="userID" className="form-label text-sm">User ID</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={loanCollectionData.usersf !== null ? loanCollectionData.usersf : ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, usersf: Number(e.target.value) })}
                        />
                        <label htmlFor="days" className="form-label text-sm">Days</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={loanCollectionData.days !== null ? loanCollectionData.days : ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, days: Number(e.target.value) })}
                        />
                        <label htmlFor="userID" className="form-label text-sm">Duration</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={loanCollectionData.duration !== null ? loanCollectionData.duration : ''}
                            onChange={(e) => setLoanCollectionData({ ...loanCollectionData, duration: Number(e.target.value) })}
                        />

                        <div className='mt-2'>


                            <input
                                type='checkbox'
                                className='checkbox mr-2'
                                checked={loanCollectionData.is_active || false}
                                onChange={(e) => setLoanCollectionData({ ...loanCollectionData, is_active: e.target.checked })}
                            />
                            <label htmlFor="is_active" className="form-label text-sm">Is Active</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddLoanInst;
