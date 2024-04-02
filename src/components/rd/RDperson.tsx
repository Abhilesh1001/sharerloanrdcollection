import React from 'react'
import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import { useRdname } from '@/hooks/rd/useRdname'


const RDperson = () => {


    const { setEnabled, mutation, data, setVid, vid, handleSubmit, rdholder, setrdholder, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDown, updateData, mutationUpdate } = useRdname()
  return (
         <>
          <div>

            <PrBurron onClick={handleCreate} label={'Create'} />
            <PrBurron onClick={handleChange} label={'Change'} />
            {change === 'create' && <PrBurron onClick={handleUPdate} label={'Update'} />}
          </div>
          <div>
          </div>
          {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{data !== undefined && data.data.msg} RD Holder Id {data !== undefined && data.data.data.rdp_id}</div></div>}</div>}


          {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{updateData !== undefined && updateData.data.msg} RD Holder Id {updateData !== undefined && updateData.data.data.rdp_id}</div></div>}</div>}

          {change === 'create' && <><label htmlFor="Vendor" className="form-label text-sm">RD Holder Id</label>

            <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="form-control  text-sm  w-full" /></>}

          {sfcreate === 'create' && <form onSubmit={handleSubmit}>
            <label htmlFor="Name" className="form-label text-sm">Name</label>
            <TextInput value={rdholder.name} onChange={(e) => setrdholder({ ...rdholder, name: e.target.value })} />
            <label htmlFor="Phone" className="form-label text-sm ">Phone No</label>
            <TextInput value={rdholder.phone_no} onChange={(e) => setrdholder({ ...rdholder, phone_no: e.target.value })} />

            <label htmlFor="Email" className="form-label text-sm">Email</label>
            <TextInput type={'email'} value={rdholder.email} onChange={(e) => setrdholder({ ...rdholder, email: e.target.value })} />
            <label htmlFor="pan" className="form-label text-sm">Pan</label>
            <TextInput css={'mb-4'} value={rdholder.pan_no} onChange={(e) => setrdholder({ ...rdholder, pan_no: e.target.value })} />
            {change !== 'create' && <PrBurron label={'Submit'} buttomType={'submit'} />}
          </form>}
          </>

  )
}

export default RDperson