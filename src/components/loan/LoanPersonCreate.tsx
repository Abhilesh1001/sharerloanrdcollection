import React from 'react'
import PrBurron from '../button/PrBurron';
import { useLoan } from '@/hooks/loan/useLoan'
import Loading from '../loading/Loading';
import TextInput from '../dummyinput/TextInput';
import AddFormButton from '../button/AddFormButton';
import ButtonSave from '../button/ButtonSave';
import UpdateBotton from '../button/UpdateButton';
import ButtonChange from '../button/ButtonChange';
import { soundClick } from '@/sound/sound';

const LoanPersonCreate = () => {

    const { mutation,vid, setVid, loanholder, handleSubmit, setLoanholder, handleKeyDown, handleCreate, handleChange, handleUPdate, change, mutationUpdate, updateData } = useLoan()
    return (
        <>
            <div className='flex justify-between'>
                <div>
                    <AddFormButton onClick={handleCreate} label={'Create'} />
                    <ButtonChange onClick={handleChange} label={'Change'} />
                    {change === 'create' && <UpdateBotton onClick={handleUPdate} label={'Update'} />}
                </div>

                <div>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={() => { soundClick?.play() }} className="btn btn-error">Close</button>
                    </form>

                </div>

            </div>
            <div>
            </div>
            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />}{mutation.isSuccess && <div><div>{mutation.data !== undefined && mutation.data.data.msg} Customer Id {mutation.data !== undefined && mutation.data.data.data.person_id}</div></div>}</div>}


            {/* updata  */}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{updateData !== undefined && updateData.data.msg} Customer Id {updateData !== undefined && updateData.data.data.person_id}</div></div>}</div>}


            <form onSubmit={handleSubmit}>

                <div className="row">
                    <div className="col-sm-6">
                        {change === 'create' && <><label htmlFor="Vendor" className="form-label text-sm">Customer Id</label>
                            <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full  block" /></>}
                        <label htmlFor="Name" className="form-label text-sm">Name</label>
                        <input required value={loanholder.name} type='text' className='input input-bordered w-full  block' onChange={(e) => setLoanholder({ ...loanholder, name: e.target.value })} />
                        <label htmlFor="Phone" className="form-label text-sm ">Phone No</label>
                        <input required value={loanholder.phone_no} type='text' className='input input-bordered w-full  block' onChange={(e) => setLoanholder({ ...loanholder, phone_no: e.target.value })} />

                        <label htmlFor="Email" className="form-label text-sm">Email</label>
                        <input className='input input-bordered w-full  block' type={'email'} value={loanholder.email} onChange={(e) => setLoanholder({ ...loanholder, email: e.target.value })} />
                        <label htmlFor="pan" className="form-label text-sm">Pan</label>
                        <input  type='text' className='input input-bordered w-full  block mb-4' value={loanholder.pan_no} onChange={(e) => setLoanholder({ ...loanholder, pan_no: e.target.value })} />

                    </div>
                    <div className="col-sm-6">
                    <label htmlFor="adhar" className="form-label text-sm">Addhar No</label>
                    <input  type='text' className='input input-bordered w-full  block mb-4' value={loanholder.addhar} onChange={(e) => setLoanholder({ ...loanholder, addhar: e.target.value })} />
                    <label htmlFor="adhar" className="form-label text-sm">Address</label>
                    <textarea className='input input-bordered w-full  block mb-4' style={{height:'178px'}} value={loanholder.address} onChange={(e) => setLoanholder({ ...loanholder, address: e.target.value })} />
                    

                        {change !== 'create' && <ButtonSave label={'Submit'} buttomType={'submit'} />}

                    </div>
                </div>


            </form>
        </>
    )
}

export default LoanPersonCreate