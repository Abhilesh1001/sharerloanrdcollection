import ButtonChange from '@/components/button/ButtonChange'
import ButtonSave from '@/components/button/ButtonSave'
import UpdateBotton from '@/components/button/UpdateButton'
import Loading from '@/components/loading/Loading'
import { useAuthgroup } from '@/hooks/admincompany/useAuthgroup'
import { soundClick } from '@/sound/sound'
import React from 'react'


const AddAuthModal = () => {

    const { change,handleChange, handleUPdate, mutation, mutationUpdate, handleSubmit, handleKeyDownLoanId, vid, setVid, authGroup,setAuthGroup} = useAuthgroup()


    return (
        <div>

            <div className='flex justify-between'>
                <div>
                    <ButtonChange onClick={handleChange} label={'Change'} />
                    {change === 'create' && <UpdateBotton onClick={handleUPdate} label={'Update'} />}
                    {change !== 'create' && <ButtonSave label={'Submit'} buttomType={'button'} onClick={handleSubmit} />}
                </div>

                <div>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-error" onClick={() => soundClick?.play()}>Close</button>
                    </form>
                </div>
            </div>


            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>New Group Crated{mutation.data !== undefined && mutation.data.data.group_id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div> Group Id NO  :  {mutationUpdate !== undefined && mutationUpdate?.data?.data?.group_id} updated</div></div>}</div>}




            <div>
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">Group Id</label>
                            <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}
                        <label htmlFor="name" className="form-label text-sm ">Modal Name</label>
                        <select
                            className="input input-bordered w-full block"
                            value={authGroup.model_name}
                            onChange={(e) =>
                                setAuthGroup({ ...authGroup, model_name: e.target.value as 'LoanColl' | 'RDColl' })
                            }
                            required
                        >
                            <option value="">Select Model</option>
                            <option value="LoanColl">Loan Collection</option>
                            <option value="RDColl">RD Collection</option>
                        </select>

                        <label htmlFor="email" className="form-label text-sm ">User</label>
                        <input type='number' className='input input-bordered w-full block' value={authGroup.user|| ''} onChange={(e) => setAuthGroup({ ...authGroup, user: Number(e.target.value) })} />
                        
                    </div>

                    <div className="col-sm-6">

                    <label htmlFor="name" className="form-label text-sm ">Auth  Type</label>
                        <select
                            className="input input-bordered w-full block"
                            value={authGroup.auth_type}
                            onChange={(e) =>
                                setAuthGroup({ ...authGroup, auth_type: e.target.value as 'checked_by' | 'approved_by' })
                            }
                            required
                        >
                            <option value="">Select Model</option>
                            <option value="c    hecked_by">Checked By</option>
                            <option value="approved_by">Approved By</option>
                        </select>
                        

                    

                    </div>





                </div>



            </div>


        </div>
    )
}

export default AddAuthModal