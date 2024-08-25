import { useCompany } from '@/hooks/admin/useCompany'
import AddFormButton from '@/components/button/AddFormButton'
import ButtonChange from '@/components/button/ButtonChange'
import ButtonSave from '@/components/button/ButtonSave'
import UpdateBotton from '@/components/button/UpdateButton'
import Loading from '@/components/loading/Loading'

import { soundClick } from '@/sound/sound'



const AddCompanyModal = () => {

    const { change, handleCreate, handleChange, handleUPdate, mutation, mutationUpdate, handleSubmit, handleKeyDownLoanId, vid, setVid, companyData, setCompanyData } = useCompany()

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
                        <label htmlFor="name" className="form-label text-sm ">Name</label>
                        <input className='input input-bordered w-full block' value={companyData.name} type={'text'} onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })} />

                        <label htmlFor="email" className="form-label text-sm ">Company Code</label>
                        <input type='number' className='input input-bordered w-full block' value={companyData.company_code !== null ? companyData.company_code : ''} onChange={(e) => setCompanyData({ ...companyData, company_code: Number(e.target.value) })} />



                    </div>

                    <div className="col-sm-6">


                    </div>

                </div>

                {change !== 'create' && <ButtonSave label={'Submit'} css='my-4' buttomType={'submit'} />}

            </form>


        </div>
    )
}

export default AddCompanyModal