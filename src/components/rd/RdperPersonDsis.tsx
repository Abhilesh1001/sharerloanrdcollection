import React,{useMemo} from 'react'
import DumyInput from '../dummyinput/DumyInput';
import { format,parseISO,addDays } from 'date-fns'
import TextInput from '../dummyinput/TextInput';

interface ProdataType {
    rd_intrest: number|null;
    person_name:string,
    duration:number | null,
    interest:number | null,
    is_active : boolean,
    start_date : string,
    closing_date: string,
    person_id: number | null;
    amount_collected:number|null,
    user :number | null, 
    remarks : string,
    collection_date:string,
}

interface RdperPersonDsisProps {
    prodataitem: ProdataType[];
}

const RdperPersonDis: React.FC<RdperPersonDsisProps>  = (props) => {

    console.log(props.prodataitem,'.......................................')

    const handleChange=(value:string,key:string)=>{
     
    }
  

    const prodataitem = props?.prodataitem;
        if (!prodataitem || prodataitem.length === 0) {
            return null; 
        }
  

   
    const { start_date, duration, amount_collected,person_name,interest, } = prodataitem[0];

    

    const renderTableRows =()=> {
        const prodataitem = props?.prodataitem;
        const rows: any = [];
    
        if (!prodataitem || prodataitem.length === 0) {
            return null; 
        }   
    
        const { start_date, duration, amount_collected } = prodataitem[0];
    
        if (start_date && duration && amount_collected) {
            let currentDate = parseISO(start_date);
    
            for (let i = 1; i <= duration; i++) {
                const rowData = {
                    date: format(currentDate, 'dd-MM-yyyy'),
                    days: i,
                    begningvalue : '',
                    rd_installment :'',
                    intrest :'',
                    endingvalue :''
                };
                rows.push(rowData);
                currentDate = addDays(currentDate, 1); // Increment date by 1 day
            }
        }
    
        return rows;
    }

    
    const newRenswreddata = renderTableRows()

    console.log(newRenswreddata)

    newRenswreddata.map((item:any)=>{
        props?.prodataitem.map((items)=>{
            if(format(parseISO(items.collection_date), 'dd-MM-yyyy') === item.date){
                item.rd_installment = items.amount_collected
            }
        })
    }) 


    function newData() {
        const rows: any = [];
        const { duration: dura, interest: inter } = prodataitem[0];
        let beginningValue = 0; // Initialize beginning value
        let endingValue = 0;
        let interest = 0;
    
        newRenswreddata.forEach((items: any) => {
            // Calculate interest
            interest = beginningValue * Number(inter) * 0.01 / Number(dura);
    
            const data = {
                date: items.date,
                days: items.days,
                begningvalue: beginningValue,
                rd_installment: items.rd_installment,
                intrest: interest.toFixed(9),
                endingvalue: beginningValue + Number(items.rd_installment) + Number(interest)
            };
    
            rows.push(data);
            // Update endingValue with the current row's endingvalue
            endingValue = data.endingvalue;
            // Update beginningValue for the next iteration
            beginningValue = endingValue;
        });
    
        return rows;
    }
    

    const newItem = newData()
    

  return (
    <div>
           <div className='overflow-auto'>
            {props.prodataitem && <>
            <div className='w-full flex'>
                    <div className='w-full text-center'><DumyInput indum={person_name} /></div>    
                </div>
                <div className="flex">
                    <div className='w-full text-center'><DumyInput indum={'RATE OF INTEREST'} /></div>
                    <div className='w-full text-center'> <TextInput  value= {interest} onChange={(e)=>handleChange(e.target.value,'rate')} /></div> 
                </div>
                <div className="flex">
                    <div className='w-full text-center'><DumyInput indum={'DURATION (DAYS)'} /></div>
                    <div className='w-full text-center'> <TextInput  value= {duration} onChange={(e)=>handleChange(e.target.value,'day')} /></div> 
                </div>
                <div className="flex">
                    <div className='w-full text-center'><DumyInput indum={'EFFECTIVE INTERST RATE'} /></div>
                    <div className='w-full text-center'><DumyInput  indum= {interest!==null && duration ? (interest*0.01)/duration :''} /></div> 
                </div>
                <div className="flex">
                    <div className='w-full text-center'><DumyInput indum={'RD PER DAY'} /></div>
                    <div className='w-full text-center'> <DumyInput indum={'50'} /></div> 
                </div>
                </>}
          <table className="w-full text-sm text-left rtl:text-right  bg-base-100 text-base-content">
                        <thead className='sticky top-0 z-1 text-nowrap '>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Date</th>
                                <th scope="col" className='px-6 py-2'>Days</th>
                                <th scope="col" className='px-6 py-2'>Begning Value</th>
                                <th scope="col" className='px-6 py-2'>Rd Installment</th>
                                <th scope="col" className='px-6 py-2'>Interest</th>
                                <th scope="col" className='px-6 py-2'>Ending Vallue</th>
                            </tr>
                        </thead>
                        <tbody className='  text-center text-nowrap'> 
                        {newItem.map((item:any,index:number)=>{
                            return <tr key={index}>
                                <td><DumyInput indum={item.date} /></td>
                                <td><DumyInput indum={item.days} /></td>
                                <td><DumyInput indum={item.begningvalue} /></td>
                                <td><DumyInput indum={item.rd_installment} /></td>
                                <td><DumyInput indum={item.intrest} /></td>
                                <td><DumyInput indum={item.endingvalue} /></td>
                            </tr>
                        })}
                           
                        </tbody>
                    </table>
            </div>
    </div>
  )
}

export default RdperPersonDis 