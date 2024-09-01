'use client'
import AddFormButton from '@/components/button/AddFormButton'
import ButtonChange from '@/components/button/ButtonChange'
import ButtonSave from '@/components/button/ButtonSave'
import UpdateBotton from '@/components/button/UpdateButton'
import Loading from '@/components/loading/Loading'
import { soundClick } from '@/sound/sound'
import { useRole } from '@/hooks/admin/useRole'
import axios from 'axios'
import { StateProps } from '@/type/type'
import { useSelector } from 'react-redux'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useAddUserRole } from '@/hooks/admin/useAddUserRole'



export interface roleUserType {
    id?: null | number
    user: number,
    role: number,
    can_authenticate: boolean
}



const AddUserRole = () => {
    const { change, handleCreate, handleChange, handleUPdate, mutation, mutationUpdate, handleSubmit, handleKeyDownLoanId, vid, setVid, roleData, setRoleData } = useAddUserRole()




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


            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>New Role Created{mutation.data !== undefined && mutation.data.data.id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div> Role Id NO  :  {mutationUpdate !== undefined && mutationUpdate?.data?.data?.id} updated</div></div>}</div>}




            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">Role ID</label>
                            <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}
                        <label htmlFor="userid" className="form-label text-sm ">Role</label>
                        <input className='input input-bordered w-full block' value={roleData.role !== null ? roleData.role : ''} type={'number'} onChange={(e) => setRoleData({ ...roleData, role: Number(e.target.value) })} />

                        <label htmlFor="company" className="form-label text-sm ">User</label>
                        <input type='number' className='input input-bordered w-full block' value={roleData.user !== null ? roleData.user : ''} onChange={(e) => setRoleData({ ...roleData, user: Number(e.target.value) })} />


                        <div className='flex'>
                            <input type="checkbox" checked={roleData.can_authenticate} defaultChecked className="checkbox checkbox-primary my-2 ml-2" onChange={(e) => setRoleData({ ...roleData, can_authenticate: e.target.checked })} />

                            <label htmlFor="company" className="form-label text-sm ml-2 mt-2">Can Aunthicated</label>
                        </div>





                    </div>

                    <div className="col-sm-6">

                      







                    </div>

                </div>

                {change !== 'create' && <ButtonSave label={'Submit'} css='my-4' buttomType={'submit'} />}

            </form>


        </div>
    )
}

export default AddUserRole