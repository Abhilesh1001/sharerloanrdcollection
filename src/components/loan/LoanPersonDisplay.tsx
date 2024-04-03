
import DumyInput from '../dummyinput/DumyInput';
import {useSelector,useDispatch} from 'react-redux'
import TextInput from '../dummyinput/TextInput';
import { format,parseISO,addDays } from 'date-fns'

interface ProdataType {
    person_name:string,
    loan_intrest: number|null;
    loan_amount : number |null,
    is_active : boolean,
    duration : number | null,
    start_date : string,
    closing_date : string,
    interest : string,
    collection_date:string,
    amount_collected:number|null, 
    person_id: number | null;
    remarks : string,
    days : null | number
}

interface RdperPersonDsisProps {
    prodataitem: ProdataType[];
}
const RdperPersonDis: React.FC<RdperPersonDsisProps>  = (props) => {
    
    console.log(props.prodataitem,'.......................................')

    const prodataitem = props?.prodataitem;
        if (!prodataitem || prodataitem.length === 0) {
            return null; 
        }
  
    const { start_date, duration, amount_collected,person_name,interest,loan_amount } = prodataitem[0];

    const handleChange=(value:string,key:string)=>{
     
    }


    const renderTableRows =() => {
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
                    balanceamount : '',
                    emi :'',
                    intrest :'',
                    Principle:'',
                    Endingbalance :''
                };
                rows.push(rowData);
                currentDate = addDays(currentDate, 1); // Increment date by 1 day
            }
        }
    
        return rows;
    }


    const newRenswreddata = renderTableRows()


    newRenswreddata.map((item:any)=>{
        props?.prodataitem.map((items)=>{
            if(format(parseISO(items.collection_date), 'dd-MM-yyyy') === item.date){
                item.emi = items.amount_collected
            }
        })
    }) 


     function newData() {
        const rows: any = [];
        const { duration: dura, interest: inter,loan_amount } = prodataitem[0];
        let beginningValue = loan_amount; // Initialize beginning value
        let endingValue:Number = 0;
        let interest = 0;
        let principle = 0
    
        newRenswreddata.forEach((items: any) => {
            // Calculate interest
            interest = Number(beginningValue) * Number(inter) * 0.01 / Number(dura);
            principle =  Number(items.emi) - Number(interest.toFixed(2))
            
            const data = {
                date: items.date,
                days: items.days,
                balanceamount: beginningValue?.toFixed(2),
                emi: items.emi,
                intrest: interest.toFixed(2),
                principle : principle.toFixed(2),
                endingvalue: (Number(beginningValue) - Number(principle)).toFixed(2)
            };
    
            rows.push(data);
            // Update endingValue with the current row's endingvalue
            endingValue = Number(data.endingvalue);
            // Update beginningValue for the next iteration
            beginningValue = Number(endingValue);
        });
    
        return rows;
    }
    

    const newItem = newData()

    console.log(newItem)
    

















    function calculatePerDayEMI(rate:any, nper:any, pv:any) {
     
        const dailyRate = rate / 100 / 365;
    
        //  EMI using PMT formula
        const emi = (pv * dailyRate) / (1 - Math.pow(1 + dailyRate, -nper));
    
        return emi.toFixed(2); 
    } 
    const perDayEMI = calculatePerDayEMI(interest, duration, loan_amount);
   
    
  
  return (
    <div>

           <div className='overflow-auto'>
           {props.prodataitem && <>
            <div className='w-full flex'>
                    <div className='w-full text-center'><DumyInput indum={person_name} /></div>    
                </div>
                <div className="flex">
                    <div className='w-full text-center'><DumyInput indum={'PRINCIPAL AMOUNT '} /></div>
                    <div className='w-full text-center'> <TextInput  value= {loan_amount} onChange={(e)=>handleChange(e.target.value,'rate')} /></div> 
                </div>
                <div className="flex">
                    <div className='w-full text-center'><DumyInput indum={'RATE OF INTEREST'} /></div>
                    <div className='w-full text-center'> <TextInput  value= {interest} onChange={(e)=>handleChange(e.target.value,'rate')} /></div> 
                </div>
                <div className="flex">
                    <div className='w-full text-center'><DumyInput indum={'LOAN PERIOD (DAYS)'} /></div>
                    <div className='w-full text-center'> <TextInput  value= {duration} onChange={(e)=>handleChange(e.target.value,'day')} /></div> 
                </div>
                <div className="flex">
                    <div className='w-full text-center'><DumyInput indum={'EFFECTIVE RATE'} /></div>
                    <div className='w-full text-center'><DumyInput  indum= {interest!==null && duration ? ((parseFloat(interest)*0.01)/duration) :''} /></div> 
                </div>
                <div className="flex">
                    <div className='w-full text-center'><DumyInput indum={'EMI'} /></div>
                    <div className='w-full text-center'> <DumyInput indum={perDayEMI} /></div> 
                </div>
                </>}
          
          <table className="w-full text-sm text-left rtl:text-right bg-base-300 text-base-content">

                        <thead className='sticky top-0 z-1 text-nowrap  h-10'>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Date</th>
                                <th scope="col" className='px-6 py-2'>Days</th>
                                <th scope="col" className='px-6 py-2'>Balance Amount</th>
                                <th scope="col" className='px-6 py-2'>EMI</th>
                                <th scope="col" className='px-6 py-2'>Interest</th>
                                <th scope="col" className='px-6 py-2'>Principle</th>
                                <th scope="col" className='px-6 py-2'>Ending Balance</th>
                            </tr>
                        </thead>
                        <tbody className='text-center text-nowrap'> 
                            {newItem.map((item:any,index:number)=>{ 
                                return  <tr key={index}>
                                <th scope="row"><DumyInput indum={item.date}/></th>
                                <td><DumyInput indum={item.days}/></td>
                                <td><DumyInput indum={item.balanceamount}/></td>
                                <td><DumyInput indum={item.emi}/></td>
                                <td><DumyInput indum={item.intrest}/></td>
                                <td><DumyInput indum={item.principle}/></td>
                                <td><DumyInput indum={item.endingvalue}/></td>
                            </tr>
                            })}
                           
                        </tbody>
                    </table>
                    </div>
    </div>
  )
}

export default RdperPersonDis