import Loading from '@/components/loading/Loading'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format, parseISO } from 'date-fns';
import AddFormButton from '../button/AddFormButton'
import UpdateBotton from '../button/UpdateButton'
import ButtonSave from '../button/ButtonSave'
import ButtonChange from '../button/ButtonChange'
import { soundClick } from '@/sound/sound'
import { useFixedDeposite } from '@/hooks/particular/useFixedDeposite';


const FixedDepositeCreations = () => {


    const {  mutation,setVid, handleSubmit, setFixDeposite, handleKeyDown, fixdeposite, vid,handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDownLoanId, mutationUpdate } = useFixedDeposite()
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
                <button className="btn btn-error" onClick={()=>soundClick?.play()}>Close</button>
            </form>
        </div>

    </div>
    <div>
    </div>

    {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation.data !== undefined && mutation.data.data.msg} FD Id {mutation.data !== undefined && mutation.data.data.data.fd_id}</div></div>}</div>}

    {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate !== undefined && mutationUpdate.data.data.msg} FD Id {mutationUpdate !== undefined && mutationUpdate?.data?.data?.data?.fd_id}</div></div>}</div>}



    {change !== 'create' && <><label htmlFor="Name" className="form-label text-sm">Customer ID</label>
        <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}

    {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">FD ID</label>
        <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full block" /></>}


 <form onSubmit={handleSubmit}>

        <label htmlFor="Name" className="form-label text-sm">Customer Name</label>
        <DumyInput indum={fixdeposite.person_name} />
        <label htmlFor="Phone" className="form-label text-sm ">FD Amount Credit</label>
        <input className='input input-bordered w-full block' value={fixdeposite.amount_credit !== null ? fixdeposite.amount_credit : ''} type={'number'} onChange={(e) => setFixDeposite({ ...fixdeposite, amount_credit: Number(e.target.value) })} />

        <label htmlFor="Phone" className="form-label text-sm ">FD Amount Debit</label>
        <input className='input input-bordered w-full block' value={fixdeposite.amount_Debit !== null ? fixdeposite.amount_Debit : ''} type={'number'} onChange={(e) => setFixDeposite({ ...fixdeposite, amount_Debit: Number(e.target.value) })} />

        <div>
            <input type="checkbox" className='my-2' checked={fixdeposite.is_active} onChange={(e) => setFixDeposite({ ...fixdeposite,is_active: e.target.checked })} />
            <label htmlFor="" className="form-label text-sm">{fixdeposite.is_active ? 'Fixed Open' : 'Fixed Close'}</label>
        </div>
        <div className='flex'>
            <div>
                <label htmlFor="Phone" className="form-label text-sm">Duration</label>
                <input type={'number'} className='input input-bordered w-full block' value={fixdeposite.duration == null ? '' : fixdeposite.duration} onChange={(e) => setFixDeposite({ ...fixdeposite, duration: Number(e.target.value) })} />
            </div>

            <div>
                <label htmlFor="Phone" className="form-label text-sm ">Interest</label>
                <input type={'number'} className='input input-bordered w-full block ml-1' value={fixdeposite.interest_rate === null ? '' : fixdeposite.interest_rate} onChange={(e) => setFixDeposite({ ...fixdeposite, interest_rate: Number(e.target.value) })} />
            </div>
        </div>

        <div className='flex'>
            <div>
                <label htmlFor="Email" className="form-label text-sm">Start Date</label>
                <input type="date" className='input input-bordered w-full block' value={fixdeposite.start_date} onChange={(e) => setFixDeposite({ ...fixdeposite, start_date: e.target.value })}/>
            </div>

            <div>
                <label htmlFor="Email" className="form-label text-sm">Closing Date</label>
                <input type="date" className='input input-bordered w-full block mb-2 ml-2' value={fixdeposite.closing_date === null ? '' : fixdeposite.closing_date} onChange={(e) => setFixDeposite({ ...fixdeposite, closing_date: e.target.value })} />
            </div>
        </div>

        {change !== 'create' && <ButtonSave label={'Submit'} buttomType={'submit'} />}

    </form>



</>
  )
}

export default FixedDepositeCreations