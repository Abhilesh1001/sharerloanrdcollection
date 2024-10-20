import React from 'react';
import ButtonChange from '@/components/button/ButtonChange';
import UpdateButton from '@/components/button/UpdateButton';
import Loading from '@/components/loading/Loading';
import { soundClick } from '@/sound/sound';
import ButtonSubmit from '@/components/button/ButtonSubmit';
import { useRdIntrest } from '@/hooks/admin/useRdIntrest';


const AddRdInst = () => {
    const {
        RdInstData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownRdCollectionId,
        vid,
        setVid,
        setRdInstData,
    } = useRdIntrest();

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
                            New Loan Interest Created: {mutationCreate.data?.data?.rd_id}
                        </div>
                    )}
                </div>
            )}

            {change === 'create' && (
                <div className='w-full h-4 flex justify-center my-4'>
                    {mutationUpdate.isPending && <Loading />}
                    {mutationUpdate.isSuccess && (
                        <div>
                            Loan Interest ID NO: {mutationUpdate.data?.data?.rd_id} updated
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
                                    onKeyDown={handleKeyDownRdCollectionId}
                                    onChange={(e) => setVid(e.target.value)}
                                />
                            </>
                        )}

                        <label htmlFor="person" className="form-label text-sm">Person</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={RdInstData.person || ''}
                            onChange={(e) => setRdInstData({ ...RdInstData, person: Number(e.target.value) })}
                        />
                        <label htmlFor="interestRate" className="form-label text-sm">Interest Rate (%)</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={RdInstData.interest_rate || ''}
                            onChange={(e) => setRdInstData({ ...RdInstData, interest_rate: e.target.value })}
                        />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="startDate" className="form-label text-sm">Start Date</label>
                        <input
                            type='date'
                            className='input input-bordered w-full'
                            value={RdInstData.start_date ? RdInstData.start_date.split('T')[0] : ''}
                            onChange={(e) => setRdInstData({ ...RdInstData, start_date: e.target.value })}
                        />
                        <label htmlFor="closingDate" className="form-label text-sm">Closing Date</label>
                        <input
                            type='date'
                            className='input input-bordered w-full'
                            value={RdInstData.closing_date ? RdInstData.closing_date.split('T')[0] : ''}
                            onChange={(e) => setRdInstData({ ...RdInstData, closing_date: e.target.value })}
                        />
                        <label htmlFor="userID" className="form-label text-sm">User ID</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={RdInstData.usersf !== null ? RdInstData.usersf : ''}
                            onChange={(e) => setRdInstData({ ...RdInstData, usersf: Number(e.target.value) })}
                        />
                        <label htmlFor="duration" className="form-label text-sm">Duration</label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            value={RdInstData.duration || ''}
                            onChange={(e) => setRdInstData({ ...RdInstData, duration: e.target.value })}
                        />
                        <input
                                type='checkbox'
                                className='checkbox mr-2'
                                checked={RdInstData.is_active || false}
                                onChange={(e) => setRdInstData({ ...RdInstData, is_active: e.target.checked })}
                            />
                            <label htmlFor="is_active" className="form-label text-sm">Is Active</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRdInst;
