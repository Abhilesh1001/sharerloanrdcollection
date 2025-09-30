import { useCompany } from '@/hooks/admin/useCompany'
import AddFormButton from '@/components/button/AddFormButton'
import ButtonChange from '@/components/button/ButtonChange'
import ButtonSave from '@/components/button/ButtonSave'
import UpdateBotton from '@/components/button/UpdateButton'
import Loading from '@/components/loading/Loading'

import { soundClick } from '@/sound/sound'
import { useAddAuthorization } from '@/hooks/admin/useAddAuthorization'




const AddAuthorization = () => {

    const { change, handleCreate, handleChange, handleUPdate, mutation, mutationUpdate, handleSubmit, handleKeyDownLoanId, vid, setVid, authData, setAuthData } = useAddAuthorization()


    return (
        <div>


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


            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>New Group ID Created ID No :  {mutation.data !== undefined && mutation.data.data.data.group_id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div> Group Id NO  :  {mutationUpdate !== undefined && mutationUpdate?.data?.data?.data?.group_id} updated</div></div>}</div>}




            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">Group ID</label>
                            <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}
                        <label htmlFor="name" className="form-label text-sm ">User ID</label>
                        <input className='input input-bordered w-full block' value={authData.user !== null ? authData.user : ''} type={'text'} onChange={(e) => setAuthData({ ...authData, user: Number(e.target.value) })} />

                        <label htmlFor="name" className="form-label text-sm ">Auth Type </label>
                        <select
                            id="user"
                            className="select select-bordered w-full block"
                            value={authData.auth_type ?? ''}
                            onChange={(e) =>
                                setAuthData({ ...authData, auth_type: e.target.value })
                            }
                        >
                            <option value="" disabled>
                                -- Select Authorization --
                            </option>
                            <option value={'checked_by'}>Checked By</option>
                            <option value={'approved_by'}>Approved By</option>
                        </select>

                        <label htmlFor="name" className="form-label text-sm ">Model Type </label>
                        <select
                            id="user"
                            className="select select-bordered w-full block"
                            value={authData.model_name ?? ''}
                            onChange={(e) =>
                                setAuthData({ ...authData, model_name: e.target.value })
                            }
                        >
                            <option value="" disabled>
                                -- Select Model --
                            </option>
                            <option value={'RDColl'}>RD COllection</option>
                            <option value={'LoanColl'}>Loan Collection</option>
                        </select>
                    </div>

                    <div className="col-sm-6">


                    </div>

                </div>

                {change !== 'create' && <ButtonSave label={'Submit'} css='my-4' buttomType={'submit'} />}

            </form>


        </div>
    )
}

export default AddAuthorization