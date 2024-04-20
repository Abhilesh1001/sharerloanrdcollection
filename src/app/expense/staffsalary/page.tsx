'use client'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format, parseISO } from 'date-fns';

import { soundClick } from '@/sound/sound';
import StaffSalaryCreate from '@/components/particular/StaffSalaryCreate';
import { useStaffSalary } from '@/hooks/particular/useStaffSalary';
import { CSVLink } from "react-csv";


interface StaffSalaryType {
    sd_id?: null | number
    person_id?: null | number
    person_name: string,
    usersf: null | number
    amount_Debit: null | number,
    collection_date: string,
    remarks: string
}

const StaffSalary = () => {
    const { newData } = useStaffSalary()

    let csvData: any = []

    if (newData) {
        const newDatanew = newData?.map((item: StaffSalaryType) => {
            return [item.sd_id,item.person_id,item.person_name,item.amount_Debit,format(item.collection_date,'dd-MM-yyyy'),item.remarks]
        })

        csvData = [
            ["Deposite No", "Staff Id", "Staff Name", "Salary Given", "Date", "Remarks"],
            ...newDatanew
        ];
    }


    return (
        <div className='text-base-content bg-base-100 h-auto   min-h-screen'>
            <div className='container'>
                <div className="row my-4">
                    <div className="mt-4">
                        <div>
                            <button className="btn btn-success mr-2 " onClick={() => {
                                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                                soundClick?.play()
                                if (modal) {
                                    modal.showModal();
                                }
                            }}>Add Staff Salay</button>

                            <button className='btn btn-secondary mr-2'><CSVLink filename={'staffsalary-file.csv'} data={csvData}>Export Excel</CSVLink></button>


                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box ">

                                    <div className="modal-action mt-0">

                                    </div>
                                    <StaffSalaryCreate />
                                </div>
                            </dialog>
                        </div>
                        <div>
                        </div>

                    </div>

                    <div className="col-sm-10 relative bg-base-300 text-nowrap overflow-y-auto shadow-md bd-base-300  mt-2  sm:rounded-lg  h-[80vh]">
                        <table className="w-full text-sm text-left rtl:text-right  ">
                            <thead className='sticky top-0 z-1  h-10'>
                                <tr>
                                    <th scope="col" className='px-6 py-2'>Deposite No</th>
                                    <th scope="col">Staff Id</th>
                                    <th scope="col">Staff Name</th>
                                    <th scope="col">Salary Given</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {newData?.map((items: StaffSalaryType) => {
                                    return <tr key={items.sd_id}>
                                        <th scope="row"><DumyInput indum={items.sd_id !== undefined ? items.sd_id : null} /></th>
                                        <td><DumyInput indum={items.person_id !== undefined ? items.person_id : ''} /></td>
                                        <td><DumyInput indum={items.person_name} /></td>
                                        <td><DumyInput indum={items.amount_Debit !== undefined ? items.amount_Debit : ''} /></td>
                                        <td><DumyInput indum={items.collection_date !== undefined ? format(parseISO(items.collection_date), 'dd.MM.yy') : ''} /></td>

                                        <td><DumyInput indum={items.remarks} /></td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default StaffSalary