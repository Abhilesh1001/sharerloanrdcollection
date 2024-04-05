import React from 'react'
import DumyInput from '../dummyinput/DumyInput';
import { format, parseISO } from 'date-fns';
import { soundClick } from '@/sound/sound';

interface ProdataType {
    Sh_id: string;
    amount_Debit: number | null;
    amount_credit: number | null;
    sh_name: string;
    shf_id: number | null;
    time: string;
}

interface SfperPersonDsisProps {
    prodataitem: ProdataType[];
}

const SfperPersonDsis: React.FC<SfperPersonDsisProps> = (props) => {

    return (
        <div>
            <div className='flex bg-base-300 justify-between'>
                <div className='flex ml-4'>
                    <div className='mr-4'>
                        <label htmlFor="name" className='form-label ml-4'>Name</label>
                        <DumyInput indum={props.prodataitem[0].sh_name} />
                    </div>
                    <div>
                        <label htmlFor="name" className='form-label'>Person Id</label>
                        <DumyInput indum={props.prodataitem[0].shf_id} />
                    </div>

                </div>

                <div>
                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn btn-error" onClick={() => soundClick?.play()}>Close</button>
                    </form>
                </div>
            </div>

            <table className="w-full text-sm text-left rtl:text-right bg-base-300">
                <thead className='sticky top-0 z-1  h-10'>
                    <tr>
                        <th scope="col" className='px-6 py-2'>Fund Deposite Id</th>
                        <th scope="col" className='px-6 py-2'>Amount Credited</th>
                        <th scope="col" className='px-6 py-2'>Amount Debit</th>
                        <th scope="col" className='px-6 py-2'>Date</th>
                    </tr>
                </thead>
                <tbody className='  text-center'>
                    {props.prodataitem[0].shf_id !== null && props.prodataitem[0].shf_id !== undefined && props?.prodataitem?.map(({ Sh_id, amount_Debit, amount_credit, sh_name, shf_id, time }) => {
                        return <tr key={shf_id}>
                            <td><DumyInput indum={shf_id} /></td>
                            <td><DumyInput indum={amount_credit} /></td>
                            <td><DumyInput indum={amount_Debit} /></td>
                            <td><DumyInput indum={format(parseISO(time), 'dd-MM-yyyy')} /></td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default SfperPersonDsis