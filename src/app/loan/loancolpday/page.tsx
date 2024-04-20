'use client'

import DataTable from '@/components/Rdcoll/DataTable';
import { useLoancolpday } from '@/hooks/loan/useLoancolpday';
import ButtonSave from '@/components/button/ButtonSave';

const App: React.FC = () => {
  const {setDate,date,handleClick,data} = useLoancolpday()    



    return (
        <div className='bg-base-100 text-base-content pt-4 min-h-screen mt-6'>
            <div className='h-3'></div>
            <div className='flex ml-40'>
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

                <div className='flex justify-center mt-10'>
                    <div className="card w-96 bg-primary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title text-4xl">No Data Avilable</h2>
                        <p>Select Date for Check</p>
                    </div>
                </div>

                </div>
        
            )}

        </div>

    )
};

export default App;
