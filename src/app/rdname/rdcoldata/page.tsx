'use client'
import Loading from '@/components/loading/Loading'
import { collData } from '@/type/shareholder/shareholde'
import DumyInput from '@/components/dummyinput/DumyInput'
import { useRdcoldata } from '@/hooks/rd/useRdcoldata'
import RdperPersonDis from '@/components/rd/RdperPersonDsis'
import ButtonSave from '@/components/button/ButtonSave'
import AddFormButton from '@/components/button/AddFormButton'
import { useMemo,memo, useState, useEffect } from 'react'



const Vendor = () => {
    const { handleHOderView, handleSubmit, rdcollection, handleChange, mutation, handleclickrdcolallview, data,handleChangeDate,collectin_data } = useRdcoldata()


    return (
        <div className=' bg-base-100 text-base-content h-auto  min-h-screen'>
            <div className='container'>
                <div className="row my-4">
                    <div className="col-sm-4 mt-4">
                        <div>
                            <AddFormButton onClick={handleHOderView} label={'New'} />
                            <ButtonSave onClick={handleSubmit} label={'Submit'} />
                            <input type="date" value={collectin_data} className='input input-bordered' onChange={handleChangeDate} />
                        </div>
                       
                        <div>
                        </div>
                    </div>
                    {mutation && <div className='w-full flex justify-center my-1'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation.data !== undefined && mutation.data.data.msg}</div></div>}</div>}

                </div>
                    <div className="col-sm-7 relative text-nowrap overflow-y-auto  bg-base-300 text-base-content shadow-md sm:rounded-lg  h-[80vh]">
                        <table className="w-full text-sm text-left rtl:text-right">
                            <thead className='sticky top-0 z-1  h-10'>
                                <tr>
                                    <th scope="col" className='px-6 py-2'>RD No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Collection Amount</th>
                                    <th scope="col">Remarks</th>
                                    <th scope="col">RD Collection</th>
                                </tr>
                            </thead>
                            <tbody className='  text-center'>
                                {rdcollection?.map((items: collData, index: number) => {
                                    return <tr key={items.person}>
                                        <th scope="row"><DumyInput indum={items.person !== undefined ? items.person : null} /></th>
                                        
                                        <td><DumyInput indum={items.name} /></td>
                                        <td><input className='input input-bordered input-sm ' type={'number'} value={items.amount_collected==null?'':items.amount_collected} onChange={(e) => handleChange(Number(e.target.value), 'amount_collected', index)} /></td>

                                        <td><input className='input input-bordered input-sm' type='text' value={items.remarks} onChange={(e) => handleChange(e.target.value, 'remarks', index)} /></td>
                                        <th>
                                            <button className="btn btn-sm btn-primary" onClick={() => {
                                                const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                                                if (modal) {
                                                    modal.showModal();
                                                }
                                                handleclickrdcolallview(items.person);
                                            }}>Check Collection</button>
                                        </th>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl bg-base-100 text-base-content mt-0">
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

export default memo(Vendor)