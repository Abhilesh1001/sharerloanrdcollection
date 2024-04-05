'use client'

import DataTable from '@/components/Rdcoll/DataTable';

import { useRdcolpday } from '@/hooks/rd/useRdcolpday';
import ButtonSave from '@/components/button/ButtonSave';

interface Entry {
    [rdHolderId: string]: number | null;
}

interface Data {
    [date: string]: Entry;
}


const App: React.FC = () => {
    const { setDate, date, handleClick, data } = useRdcolpday()

    return (
        <div className='bg-base-100 text-base-content min-h-screen mt-6 pt-4'>
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
                <div className='flex justify-center mt-10'>
                    <div className="card w-96 bg-primary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title text-4xl">No Data Avilable</h2>
                        <p>Chose Date for Check</p>
                      
                    </div>
                </div>

                </div>
                

            )}

        </div>

    )
};

export default App;
