
import AddFormButton from '@/components/button/AddFormButton'
import ButtonChange from '@/components/button/ButtonChange'
import ButtonSave from '@/components/button/ButtonSave'
import UpdateBotton from '@/components/button/UpdateButton'
import Loading from '@/components/loading/Loading'
import { usePerson } from '@/hooks/admincompany/usePersoon'
import { soundClick } from '@/sound/sound'





const AddPerson = () => {



    const { change, handleCreate, handleChange, handleUPdate, mutation, mutationUpdate, handleSubmit, handleKeyDownLoanId, vid, setVid,personData, setPersonData } = usePerson()

  return (
    <div>
            <div className='flex justify-between'>
                <div>
                    {/* <AddFormButton onClick={handleCreate} label={'Create'} /> */}
                    <ButtonChange onClick={handleChange} label={'Change'} />
                    {change === 'create' && <UpdateBotton onClick={handleUPdate} label={'Update'} />}
                    {change !== 'create' && <ButtonSave label={'Submit'} css='my-4' buttomType={'button'} onClick={handleSubmit}/>}
                </div>

                <div>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-error" onClick={() => soundClick?.play()}>Close</button>
                    </form>
                </div>
            </div>


            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>New Person Created{mutation.data !== undefined && mutation.data.data.person_id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div> Customer Id NO  :  {mutationUpdate !== undefined && mutationUpdate?.data?.data?.person_id} updated</div></div>}</div>}




            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">Customer ID</label>
                            <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}
                        
                        <label htmlFor="pannumber" className="form-label text-sm ">Name</label>
                        <input type='text' className='input input-bordered w-full block' value={personData.name} onChange={(e) => setPersonData({ ...personData, name: e.target.value })} />


                        <label htmlFor="dateofbirth" className="form-label text-sm ">Email</label>
                        <input type='email' className='input input-bordered w-full' value={personData.email} onChange={(e) => setPersonData({ ...personData, email: e.target.value })} />


                        <label htmlFor="dateofbirth" className="form-label text-sm ">User ID</label>
                        <input type='number' className='input input-bordered w-full' value={personData.usersf!==null ? personData.usersf : ''} onChange={(e) => setPersonData({ ...personData, usersf: Number(e.target.value) })} />

                        <label htmlFor="dateofbirth" className="form-label text-sm ">Adhar No</label>
                        <input type='text' className='input input-bordered w-full block' value={personData.adharcard} onChange={(e) => setPersonData({ ...personData, adharcard: e.target.value })} />
                       

                    </div>

                    <div className="col-sm-6">
                    <label htmlFor="dateofbirth" className="form-label text-sm ">Phone No</label>
                    <input type='text' className='input input-bordered w-full block' value={personData.phone_no} onChange={(e) => setPersonData({ ...personData, phone_no: e.target.value })} />

                    <label htmlFor="dateofbirth" className="form-label text-sm ">Pan No</label>
                    <input type='text' className='input input-bordered w-full block' value={personData.pan_no} onChange={(e) => setPersonData({ ...personData, pan_no: e.target.value })} />

                    <label htmlFor="dateofbirth" className="form-label text-sm ">Address </label>
                    <textarea  className='input input-bordered w-full block h-40 mb-10'  value={personData.address} onChange={(e) => setPersonData({ ...personData, address: e.target.value })} />


                    </div>

                </div>

                

            </form>


        </div>
  )
}

export default AddPerson