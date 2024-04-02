'use client'

import DataTable from '@/components/Rdcoll/DataTable';

import TextInput from '@/components/dummyinput/TextInput';
import PrBurron from '@/components/button/PrBurron';

import axios from 'axios';
import { useRdcolpday } from '@/hooks/rd/useRdcolpday';
import ButtonSave from '@/components/button/ButtonSave';

interface Entry {
    [rdHolderId: string]: number | null;
}

interface Data {
    [date: string]: Entry;
}


const App: React.FC = () => {
    const {setDate,date,handleClick,data} = useRdcolpday()

    return (
        <div className='bg-base-100 text-base-content min-h-screen mt-6'>
            <div className='h-3'></div>
            <div className='flex ml-4'>
                <div className='flex'>
                    <label htmlFor="" className='text-nowrap  pt-2 mr-2' >Start Date</label>
                    <input type="date" onChange={(e) => setDate({ ...date, startDate: e.target.value })} className="input input-bordered" />
                </div>
                <div className='flex'>
                    <label htmlFor="" className='text-nowrap pt-2 mr-2 ml-2' >End Date</label>
                    <input type="date" onChange={(e) => setDate({ ...date, endDate: e.target.value })} className="input input-bordered" />
                </div>
                <ButtonSave label={'submit'} onClick={handleClick} />

            </div>

            {Object.keys(data).length > 0 ? (
                <DataTable startDate={date.startDate} endDate={date.endDate} data={data} />
            ) : (
                <div className=''>No data available</div>
            )}

        </div>

    )
};

export default App;
