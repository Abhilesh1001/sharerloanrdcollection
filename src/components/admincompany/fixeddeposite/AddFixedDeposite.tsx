import React from 'react';
import AddFormButton from '@/components/button/AddFormButton';
import ButtonChange from '@/components/button/ButtonChange';
import ButtonSave from '@/components/button/ButtonSave';
import UpdateButton from '@/components/button/UpdateButton';
import Loading from '@/components/loading/Loading';

import { soundClick } from '@/sound/sound';
import { useFixedDeposit } from '@/hooks/admin/useFixedDeposit';
const AddFixedDeposit = () => {
    const {
        fixedDepositData,
        change,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownFDId,
        vid,
        setVid,
        setFixedDepositData,
    } = useFixedDeposit();

    console.log(fixedDepositData)

    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <ButtonChange onClick={handleChange} label={'Change'} />
                    {change === 'create' && <UpdateButton onClick={handleUpdate} label={'Update'} />}
                    {change !== 'create' && <ButtonSave label={'Add'} css='my-4' buttomType={'button'} onClick={handleSubmit} />}
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
                            New Fixed Deposit Created: {mutationCreate.data?.data?.fd_id}
                        </div>
                    )}
                </div>
            )}

            {change === 'create' && (
                <div className='w-full h-4 flex justify-center my-4'>
                    {mutationUpdate.isPending && <Loading />}
                    {mutationUpdate.isSuccess && (
                        <div>
                            Fixed Deposit ID NO: {mutationUpdate.data?.data?.fd_id} updated
                        </div>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && (
                            <>
                                <label htmlFor="FDID" className="form-label text-sm">FD ID</label>
                                <input
                                    required
                                    value={vid}
                                    type="number"
                                    onKeyDown={handleKeyDownFDId}
                                    onChange={(e) => setVid(e.target.value)}
                                    className="input input-bordered w-full block"
                                />
                            </>
                        )}

                        <label htmlFor="amountDebit" className="form-label text-sm">Amount Debit</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={fixedDepositData.amount_Debit || ''}
                            onChange={(e) => setFixedDepositData({ ...fixedDepositData, amount_Debit: Number(e.target.value) })}
                        />
                        <label htmlFor="amountDebit" className="form-label text-sm">Amount Credit</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={fixedDepositData.amount_credit || ''}
                            onChange={(e) => setFixedDepositData({ ...fixedDepositData, amount_credit: Number(e.target.value) })}
                        />

                        <label htmlFor="startDate" className="form-label text-sm">Collection Date</label>
                        <input
                            type='date'
                            className='input input-bordered w-full'
                            value={fixedDepositData.collection_date ? fixedDepositData.collection_date.split('T')[0] : ''}
                            onChange={(e) => setFixedDepositData({ ...fixedDepositData, collection_date: e.target.value })}
                        />
                        <label htmlFor="startDate" className="form-label text-sm">Start Date</label>
                        <input
                            type='date'
                            className='input input-bordered w-full'
                            value={fixedDepositData.start_date ? fixedDepositData.start_date.split('T')[0] : ''}
                            onChange={(e) => setFixedDepositData({ ...fixedDepositData, start_date: e.target.value })}
                        />

                       

                       
                    </div>

                    <div className="col-sm-6">

                    <label htmlFor="closingDate" className="form-label text-sm">Closing Date</label>
                        <input
                            type='date'
                            className='input input-bordered w-full'
                            value={fixedDepositData.closing_date ? fixedDepositData.closing_date.split('T')[0] : ''}
                            onChange={(e) => setFixedDepositData({ ...fixedDepositData, closing_date: e.target.value })}
                        />
                        <label htmlFor="userID" className="form-label text-sm">User ID</label>
                        <input
                            type='number'
                            className='input input-bordered w-full block'
                            value={fixedDepositData.usersf !== null ? fixedDepositData.usersf : ''}
                            onChange={(e) => setFixedDepositData({ ...fixedDepositData, usersf: Number(e.target.value) })}
                        />

                        <label htmlFor="interestRate" className="form-label text-sm">Interest Rate</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={fixedDepositData.interest_rate || ''}
                            onChange={(e) => setFixedDepositData({ ...fixedDepositData, interest_rate: Number(e.target.value) })}
                        />
                        <label htmlFor="interestRate" className="form-label text-sm">Duration</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={fixedDepositData.duration || ''}
                            onChange={(e) => setFixedDepositData({ ...fixedDepositData, duration: Number(e.target.value) })}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddFixedDeposit;
