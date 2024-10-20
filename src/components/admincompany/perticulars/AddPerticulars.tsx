import React from 'react';
import ButtonChange from '@/components/button/ButtonChange';
import UpdateButton from '@/components/button/UpdateButton';
import Loading from '@/components/loading/Loading';
import { soundClick } from '@/sound/sound';
import ButtonSubmit from '@/components/button/ButtonSubmit';
import { useParticular } from '@/hooks/admin/useParticular';

interface ExpenseType {
    p_id?: null | number;
    particulars: string;
    usersf: null | number;
    amount_Debit: null | number;
    amount_credit: null | number;
    time: string;
}

const AddParticulars = () => {
    const {
        particularData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        setParticularData,
        vid,
        setVid,
        handleKeyDownParticularId
    } = useParticular();

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
                            New Expense Created: {mutationCreate.data?.data?.p_id}
                        </div>
                    )}
                </div>
            )}

            {change === 'create' && (
                <div className='w-full h-4 flex justify-center my-4'>
                    {mutationUpdate.isPending && <Loading />}
                    {mutationUpdate.isSuccess && (
                        <div>
                            Expense ID NO: {mutationUpdate.data?.data?.p_id} updated
                        </div>
                    )}
                </div>
            )}

            <div>
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && (
                            <>
                                <label htmlFor="particularsId" className="form-label text-sm">Particulars ID</label>
                                <input
                                    required
                                    type="number"
                                    className="input input-bordered w-full"
                                    value={vid}
                                    onKeyDown={handleKeyDownParticularId}
                                    onChange={(e) => setVid(e.target.value)}
                                />
                            </>
                        )}

                        <label htmlFor="particulars" className="form-label text-sm">Particulars</label>
                        <input
                            type='text'
                            className='input input-bordered w-full'
                            value={particularData.particulars || ''}
                            onChange={(e) => setParticularData({ ...particularData, particulars: e.target.value })}
                        />

                        <label htmlFor="userID" className="form-label text-sm">User ID</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={particularData.usersf !== null ? particularData.usersf : ''}
                            onChange={(e) => setParticularData({ ...particularData, usersf: Number(e.target.value) })}
                        />

                        <label htmlFor="amountDebit" className="form-label text-sm">Amount Debit</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={particularData.amount_Debit || ''}
                            onChange={(e) => setParticularData({ ...particularData, amount_Debit: Number(e.target.value) })}
                        />

                        <label htmlFor="amountCredit" className="form-label text-sm">Amount Credit</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={particularData.amount_credit || ''}
                            onChange={(e) => setParticularData({ ...particularData, amount_credit: Number(e.target.value) })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddParticulars;
