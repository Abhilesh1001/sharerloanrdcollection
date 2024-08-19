import Company from '@/app/admin/company/page'
import AddFormButton from '@/components/button/AddFormButton'
import ButtonChange from '@/components/button/ButtonChange'
import ButtonSave from '@/components/button/ButtonSave'
import UpdateBotton from '@/components/button/UpdateButton'
import Loading from '@/components/loading/Loading'
import { useAdmin } from '@/hooks/admin/useAdmin'
import { soundClick } from '@/sound/sound'
import React, { useState } from 'react'








const AddUserModal = () => {

  const {change,handleCreate,handleChange,handleUPdate,mutation,mutationUpdate,handleSubmit,handleKeyDownLoanId,vid,setVid,userData, setUserData} = useAdmin()

  

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


          {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>New User Created{mutation.data !== undefined && mutation.data.id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate !== undefined && mutationUpdate.data.data.msg} Asset Id {mutationUpdate !== undefined && mutationUpdate?.data?.data?.data?.asset_no}</div></div>}</div>}


           

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6">
                {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">User ID</label>
                  <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}
                <label htmlFor="name" className="form-label text-sm ">Name</label>
                <input className='input input-bordered w-full block' value={userData.name} type={'text'} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />

                <label htmlFor="email" className="form-label text-sm ">Email</label>
                <input className='input input-bordered w-full block' value={userData.email}  onChange={(e) => setUserData({ ...userData, email: e.target.value })} />


                <div>
                    <label htmlFor="Password" className="form-label text-sm">Password</label>
                    <input type="password" className='input input-bordered w-full block mb-4' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                </div>
                </div>

                <div className="col-sm-6">

                <label htmlFor="company" className="form-label text-sm">Company</label>
                <input type="number" className='input input-bordered w-full block mb-4' value={userData.company===null?'':userData.company} onChange={(e) => setUserData({ ...userData, company: Number(e.target.value) })} />

                </div>
              </div>

                {change !== 'create' && <ButtonSave label={'Submit'} buttomType={'submit'} />}

            </form>


    </div>
  )
}

export default AddUserModal