import ButtonChange from '@/components/button/ButtonChange'
import ButtonSave from '@/components/button/ButtonSave'
import UpdateBotton from '@/components/button/UpdateButton'
import Loading from '@/components/loading/Loading'
import { useAdmin } from '@/hooks/admincompany/useAdmin'
import { soundClick } from '@/sound/sound'









const AddUserModal = () => {

  const { change,handleChange, handleUPdate, mutation, mutationUpdate, handleSubmit, handleKeyDownLoanId, vid, setVid, userData, setUserData } = useAdmin()



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


      {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>New User Created{mutation.data !== undefined && mutation.data.data.id}</div></div>}</div>}

      {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div> USER Id NO  :  {mutationUpdate !== undefined && mutationUpdate?.data?.data?.id} updated</div></div>}</div>}




      <div>
        <div className="row">
          <div className="col-sm-6">
            {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">User ID</label>
              <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}
            <label htmlFor="name" className="form-label text-sm ">Name</label>
            <input className='input input-bordered w-full block' value={userData.name} type={'text'} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />

            <label htmlFor="email" className="form-label text-sm ">Email</label>
            <input className='input input-bordered w-full block' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              {
                change !== 'create' && 
            <div>
              <div>
              <label htmlFor="Password" className="form-label text-sm">Password</label>
              <input type="password" className='input input-bordered w-full block mb-4' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
            </div>
            <div>
              <label htmlFor="Password" className="form-label text-sm">ReEnter Password</label>
              <input type="password" className='input input-bordered w-full block mb-4' value={userData.password2} onChange={(e) => setUserData({ ...userData, password2: e.target.value })} />
            </div>

              </div>}
           
          </div>

          <div className="col-sm-6">

              <div>
            <input type="checkbox" checked={userData.tc} defaultChecked onChange={(e) => setUserData({ ...userData, tc: e.target.checked })} className="checkbox checkbox-sm checkbox-primary" />
            <label htmlFor="checkboxtc" className="form-label form-label ml-2">TC</label>
              </div>
              <div>
            <input type="checkbox" checked={userData.is_active} onChange={(e) => setUserData({ ...userData, is_active: e.target.checked })} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
            <label htmlFor="checkboxadmin" className="form-label form-label ml-2">IS_ACTIVE</label>

              </div>
              
              <div>
            <input type="checkbox" checked={userData.is_company_admin} onChange={(e) => setUserData({ ...userData, is_company_admin: e.target.checked })} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
            <label htmlFor="checkboxadmin" className="form-label form-label ml-2">IS_COMPANY_ADMIN</label>

              </div>

          </div>





        </div>

        

      </div>


    </div>
  )
}

export default AddUserModal