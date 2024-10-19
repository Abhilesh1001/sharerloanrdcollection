import { useProfileUpdate } from '@/hooks/admin/useProfileUpdate'
import React from 'react'
import AddFormButton from '@/components/button/AddFormButton'
import ButtonChange from '@/components/button/ButtonChange'
import ButtonSave from '@/components/button/ButtonSave'
import UpdateBotton from '@/components/button/UpdateButton'
import Loading from '@/components/loading/Loading'
import { soundClick } from '@/sound/sound'






const AddProfileUpdate = () => {


    const { change, handleCreate, handleChange, handleUPdate, mutation, mutationUpdate, handleSubmit, handleKeyDownLoanId, vid, setVid, profileData, setProfileData } = useProfileUpdate()



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


            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>New User Created{mutation.data !== undefined && mutation.data.data.id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div> USER Id NO  :  {mutationUpdate !== undefined && mutationUpdate?.data?.data?.id} updated</div></div>}</div>}




            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">Company ID</label>
                            <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}
                        <label htmlFor="userid" className="form-label text-sm ">User ID</label>
                        <input className='input input-bordered w-full block' value={profileData.user !== null ? profileData.user : ''} type={'number'} onChange={(e) => setProfileData({ ...profileData, user: Number(e.target.value) })} />

                        <label htmlFor="pannumber" className="form-label text-sm ">PAN NO</label>
                        <input type='number' className='input input-bordered w-full block' value={profileData.pan_number} onChange={(e) => setProfileData({ ...profileData, pan_number: e.target.value })} />

                        <label htmlFor="dateofbirth" className="form-label text-sm ">Date of Birth</label>
                        <input type='text' className='input input-bordered w-full block' value={profileData.Date_of_Birth} onChange={(e) => setProfileData({ ...profileData, Date_of_Birth: e.target.value })} />



                    </div>

                    <div className="col-sm-6">

                        <label htmlFor="profilepicture" className="form-label text-sm">Profile Picture</label>
                        <input
                            type="file"
                            className="input input-bordered w-full block"
                            id="profilepicture"
                            onChange={(e) => {
                                // Check if files are selected
                                if (e.target.files && e.target.files.length > 0) {
                                    // Set the selected file in the state
                                    setProfileData({
                                        ...profileData,
                                        profile_picture: e.target.files[0], // Update state with the selected file
                                    });
                                }
                            }}
                        />

                        <label htmlFor="panpicture" className="form-label text-sm">Pan Picture</label>
                        <input
                            type="file"
                            className="input input-bordered w-full block"
                            id="panpicture"
                            onChange={(e) => {
                                // Check if files are selected
                                if (e.target.files && e.target.files.length > 0) {
                                    // Set the selected file in the state
                                    setProfileData({
                                        ...profileData,
                                        pan_picture: e.target.files[0], // Update state with the selected file
                                    });
                                }
                            }}
                        />


                    </div>

                </div>

                {change !== 'create' && <ButtonSave label={'Submit'} css='my-4' buttomType={'submit'} />}

            </form>


        </div>
    )
}

export default AddProfileUpdate