'use client'

import DataTable from '@/components/Rdcoll/DataTable';

import TextInput from '@/components/dummyinput/TextInput';
import PrBurron from '@/components/button/PrBurron';
import { useLoancolpday } from '@/hooks/loan/useLoancolpday';
import ButtonSave from '@/components/button/ButtonSave';

const App: React.FC = () => {
  const {setDate,date,handleClick,data} = useLoancolpday()    

    return (
        <div className='bg-base-100 text-base-content pt-4 min-h-screen mt-6'>
            <div className='h-3'></div>
            <div className='flex ml-4'>
                <div className='flex'>
                    <label htmlFor="" className='text-nowrap pt-2  mr-2' >Start Date</label>
                    <input type="date" onChange={(e) => setDate({ ...date, startDate: e.target.value })} className="input input-bordered" />
                </div>
                <div className='flex'>
                    <label htmlFor="" className='text-nowrap mr-2 pt-2 ml-2' >End Date</label>
                    <input type="date" onChange={(e) => setDate({ ...date, endDate: e.target.value })} className="input input-bordered" />
                </div>
                <ButtonSave label={'submit'} onClick={handleClick} />

            </div>

            {Object.keys(data).length > 0 ? (
                <DataTable startDate={date.startDate} endDate={date.endDate} data={data} />
            ) : (
                <div className=' text-gray-50'>No data available</div>
            )}

        </div>

    )
};

export default App;
