
import React from 'react'
import Loading from '@/components/loading/Loading'
import { useRdintrest } from '@/hooks/rd/useRdintrest';
import DumyInput from '../dummyinput/DumyInput';
import AddFormButton from '../button/AddFormButton';
import ButtonChange from '../button/ButtonChange';
import UpdateBotton from '../button/UpdateButton';
import ButtonSave from '../button/ButtonSave';
import { soundClick } from '@/sound/sound';


const Rdintrest = () => {

    const { mutation, setVid, vid, handleSubmit, rdintrest, setrdintrest, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDown, updateData, mutationUpdate, handleKeyDownIntrest } = useRdintrest()

    // console.log(rdintrest.closing_date)

    return (
        <div className='bg-base-100 text-base-content'>
            <div className='flex justify-between'>
                <div>
                    <AddFormButton css={''} onClick={handleCreate} label={'Create'} />
                    <ButtonChange onClick={handleChange} label={'Change'} />
                    {change === 'create' && <UpdateBotton onClick={handleUPdate} label={'Update'} />}
                </div>
                <div>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-error" onClick={()=>soundClick?.play()}>Close</button>
                    </form>
                </div>
            </div>
            <div>
            </div>
            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation.data !== undefined && mutation.data.data.msg} RD Holder Id {mutation.data !== undefined && mutation.data.data.data.rd_id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{updateData !== undefined && updateData.data.msg} RD Holder Id {mutationUpdate !== undefined && mutationUpdate.data.data.data.rd_id}</div></div>}</div>}

            {change !== 'create' && <><label htmlFor="Vendor" className="form-label text-sm">Customer Id</label>

                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className=" w-full input input-bordered block" /></>}

            {change === 'create' && <><label htmlFor="Vendor" className="form-label text-sm">RD Holder Plan</label>

                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownIntrest(e)} onChange={(e) => setVid(e.target.value)} className=" w-full input input-bordered block" /></>}


            {sfcreate === 'create' && <form onSubmit={handleSubmit}>
                <label htmlFor="Name" className="form-label text-sm text-base-content">Name</label>
                <DumyInput indum={rdintrest.name} />

                <div className='flex'>
                    <div>

                        <label htmlFor="duration" className="form-label text-sm ">Duration Day</label>
                        <input value={rdintrest.duration === null ? '' : rdintrest.duration} type={'number'} className='input input-bordered w-full  block' onChange={(e) => setrdintrest({ ...rdintrest, duration: Number(e.target.value) })} />
                    </div>


                    <div>
                        <label htmlFor="intrestrate" className="form-label text-sm">Intrest Rate</label>
                        <input value={rdintrest.intrestrate === null ? '' : rdintrest.intrestrate} type={'number'} className='input input-bordered w-full  block ml-2' onChange={(e) => setrdintrest({ ...rdintrest, intrestrate: Number(e.target.value) })} />
                    </div>

                </div>

                <div className='flex'>
                    <input type="checkbox" checked={rdintrest.isactive} defaultChecked onChange={(e) => setrdintrest({ ...rdintrest, isactive: e.target.checked })} className="checkbox checkbox-info my-2" />

                    <label htmlFor="pan" className="form-label text-sm flex justify-center items-center mx-2 my-2">{rdintrest.isactive ? "Open" : "Close"}</label>
                </div>

                <div className='flex'>
                    <div >
                        <label htmlFor="pan" className="form-label text-sm">Open Date</label>

                        <input value={rdintrest.start_date} type={'date'} className='input input-bordered w-full  block' onChange={(e) => setrdintrest({ ...rdintrest, start_date: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="pan" className="form-label text-sm">Close Date</label>
                        <input type={'date'} value={rdintrest.closing_date} className='input input-bordered w-full mb-2 ml-2' onChange={(e) => setrdintrest({ ...rdintrest, closing_date: e.target.value })} />
                    </div>
                </div>

                {change !== 'create' && <ButtonSave label={'Submit'} buttomType={'submit'} />}
            </form>}
        </div>
    )
}

export default Rdintrest