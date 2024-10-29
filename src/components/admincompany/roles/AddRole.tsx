import { useProfileUpdate } from '@/hooks/admin/useProfileUpdate'
import AddFormButton from '@/components/button/AddFormButton'
import ButtonChange from '@/components/button/ButtonChange'
import ButtonSave from '@/components/button/ButtonSave'
import UpdateBotton from '@/components/button/UpdateButton'
import Loading from '@/components/loading/Loading'
import { soundClick } from '@/sound/sound'
import { useRole } from '@/hooks/admincompany/useRole'
import axios from 'axios'
import { StateProps } from '@/type/type'
import { useSelector } from 'react-redux'
import { useQuery, useMutation } from '@tanstack/react-query'


export interface roleType {
    id?: null | number,
    company: null | number,
    name: string
    permissions: any,

}



const AddRole = () => {

    const { change, handleCreate, handleChange, handleUPdate, mutation, mutationUpdate, handleSubmit, handleKeyDownLoanId, vid, setVid, roleData, setRoleData } = useRole()
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)


    const getTodos = async () => {

        const res = await axios.get(`${baseurl}cus/api/permissions/company`, {
            headers: { 
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        return res.data


    }

    const { data } = useQuery({ queryKey: ['apipermission'], queryFn: getTodos })



  const handleCheckboxChange = (permissionId :any) => {
    setRoleData((prevData) => {
      const newPermissions = prevData.permissions.includes(permissionId)
        ? prevData.permissions.filter((id:number) => id !== permissionId)
        : [...prevData.permissions, permissionId];
      return { ...prevData, permissions: newPermissions };
    });
  };




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
                        <label htmlFor="userid" className="form-label text-sm ">Name</label>
                        <input className='input input-bordered w-full block' value={roleData.name !== null ? roleData.name : ''} type={'text'} onChange={(e) => setRoleData({ ...roleData, name: e.target.value })} />
                    </div>

                    <div className="col-sm-6">

                        <label htmlFor="profilepicture" className="form-label text-sm">Permissions</label>



                        <div className='h-80 overflow-auto'>
                            {data?.map((permission:any) => (
                                <label key={permission.id} className='block'>
                                    <input
                                        type='checkbox'
                                        checked={roleData.permissions.includes(permission.id)}
                                        onChange={() => handleCheckboxChange(permission.id)}
                                    />
                                    {permission.name}
                                </label>
                            ))}
                        </div>



                    </div>

                </div>

                {change !== 'create' && <ButtonSave label={'Submit'} css='my-4' buttomType={'submit'} />}

            </form>


        </div>
    )
}

export default AddRole