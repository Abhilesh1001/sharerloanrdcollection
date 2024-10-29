import React from 'react';
import ButtonChange from '@/components/button/ButtonChange';
import UpdateButton from '@/components/button/UpdateButton';
import Loading from '@/components/loading/Loading';
import { soundClick } from '@/sound/sound';
import ButtonSubmit from '@/components/button/ButtonSubmit';
import { useStaffSalary } from '@/hooks/admincompany/useStaffSalary';




const AddStaffSalary = () => {
    const {
        staffSalaryData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownstaffSalaryId,
        vid,
        setVid,
        setStaffSalaryData,
    } = useStaffSalary();

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
                            New Shareholder Created: {mutationCreate.data?.data?.sd_id}
                        </div>
                    )}
                </div>
            )}

            {change === 'create' && (
                <div className='w-full h-4 flex justify-center my-4'>
                    {mutationUpdate.isPending && <Loading />}
                    {mutationUpdate.isSuccess && (
                        <div>
                            Shareholder ID NO: {mutationUpdate.data?.data?.sd_id} updated
                        </div>
                    )}
                </div>
            )}

            <div>
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && (
                            <>
                                <label htmlFor="staffSalaryId" className="form-label text-sm">Staff Salary ID</label>
                                <input
                                    required
                                    type="number"
                                    className="input input-bordered w-full"
                                    value={vid}
                                    onKeyDown={handleKeyDownstaffSalaryId}
                                    onChange={(e) => setVid(e.target.value)}
                                />
                            </>
                        )}

                        <label htmlFor="person" className="form-label text-sm">Person</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={staffSalaryData.person || ''}
                            onChange={(e) => setStaffSalaryData({ ...staffSalaryData, person: Number(e.target.value) })}
                        />

                        <label htmlFor="amountDebit" className="form-label text-sm">Amount Debit</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={staffSalaryData.amount_Debit || ''}
                            onChange={(e) => setStaffSalaryData({ ...staffSalaryData, amount_Debit: Number(e.target.value) })}
                        />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="collectionDate" className="form-label text-sm">Collection Date</label>
                        <input
                            type='date'
                            className='input input-bordered w-full'
                            value={staffSalaryData.collection_date ?staffSalaryData.collection_date.split('T')[0] : ''}
                            onChange={(e) => setStaffSalaryData({ ...staffSalaryData, collection_date: e.target.value })}
                        />
                        
                        <label htmlFor="remarks" className="form-label text-sm">Remarks</label>
                        <input
                            type='text'
                            className='input input-bordered w-full'
                            value={staffSalaryData.remarks || ''}
                            onChange={(e) => setStaffSalaryData({ ...staffSalaryData, remarks: e.target.value })}
                        />
                        
                        <label htmlFor="userID" className="form-label text-sm">User ID</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={staffSalaryData.usersf !== null ? staffSalaryData.usersf : ''}
                            onChange={(e) => setStaffSalaryData({ ...staffSalaryData, usersf: Number(e.target.value) })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStaffSalary;
