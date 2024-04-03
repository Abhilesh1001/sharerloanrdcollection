'use client'
import Loading from '@/components/loading/Loading'

import DumyInput from '@/components/dummyinput/DumyInput'
import { loancollData } from '@/type/shareholder/shareholde'
import { format, parseISO } from 'date-fns';
import { useLoancoldata } from '@/hooks/loan/useLoancoldata'
import RdperPersonDis from '@/components/loan/LoanPersonDisplay'
import { shfStateTypr } from '@/type/shareholder/shareholde'
import { getHideData } from '@/redux/shf/shfslicer'
import AddFormButton from '@/components/button/AddFormButton'
import ButtonSave from '@/components/button/ButtonSave'
import { useEffect } from 'react';


const Vendor = () => {

    const { handleHOderView, handleSubmit, loancollection, handleChange, mutation, handleclickrdcolallview, data, handleChangeDate, collectin_data } = useLoancoldata()
    console.log('rdcoll', collectin_data)

    return (
        <div className='bg-base-100 min-h-screen'>
            <div className='container'>
                <div className="row my-4">
                    <div className="col-sm-4 mt-4">
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <AddFormButton onClick={handleHOderView} label={'New'} />
                                <ButtonSave onClick={handleSubmit} label={'Submit'} />
                                <input type="date" value={collectin_data} className='input input-bordered w-40' onChange={handleChangeDate} />
                            </div>
                            <div className='text-nowrap text-xl ml-4'> <div className='w-full flex justify-center'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation !== undefined && mutation.data.data.msg}</div></div>}</div></div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8 relative text-nowrap overflow-y-auto bg-base-300 shadow-md  sm:rounded-lg  h-[80vh]">
                        <table className="w-full text-sm text-left rtl:text-right ">
                            <thead className='sticky top-0 z-1  h-10'>
                                <tr>
                                    <th scope="col" className='px-6 py-2'>Loan Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Collection Amount</th>
                                    <th scope="col">Remarks</th>
                                    <th scope="col">Check Collection</th>
                                </tr>
                            </thead>
                            <tbody className='  text-center'>
                                {loancollection?.map((items: loancollData, index: number) => {
                                    return <tr key={items.loan_person}>
                                        <th scope="row"><DumyInput indum={items.loan_person !== undefined ? items.loan_person : null} /></th>
                                        <td><DumyInput indum={items.name} /></td>

                                        <td><input type={'number'} value={items.amount_collected !== null ? items.amount_collected : ''} className='input input-bordered input-sm w-full' onChange={(e) => handleChange(Number(e.target.value), 'amount_collected', index)} /></td>

                                        <td><input type='text' className='input input-bordered input-sm w-full' value={items.remarks} onChange={(e) => handleChange(e.target.value, 'remarks', index)} /></td>
                                        <th>
                                            <button className="btn btn-sm btn-primary" onClick={() => {
                                                const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                                                if (modal) {
                                                    modal.showModal();
                                                }
                                                handleclickrdcolallview(items.loan_person);
                                            }}>Check Collection</button>
                                        </th>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>


                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl  mt-0">
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn mb-2">Close</button>
                                </form>
                            </div>
                            <RdperPersonDis prodataitem={data} />
                        </div>
                    </dialog>
                </div>

            </div>
        </div>

    )
}

export default Vendor