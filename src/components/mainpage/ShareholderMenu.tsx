'use client'
import Link from 'next/link'
import {useSelector,useDispatch} from 'react-redux'
import { getHidden, getMainheader } from '@/redux/slice'
import { getHideData } from '@/redux/shf/shfslicer'
import { soundClick } from '@/sound/sound'
import { StateProps } from '@/type/type'


const ShareholderMenu = () => {
    const  dispatch = useDispatch()
    const {hidden} = useSelector((state:StateProps)=>state.counter)
  
    const handleClick = (value:string)=>{
        soundClick?.play()
        dispatch(getMainheader(value))
        localStorage.setItem('mainHeader',value)
    } 


  return (
    <div className='top-10 relative overflow-auto'>
    <div className='' >RD / Share Fund /Loan Main Page</div>

    <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden,hiddenFundName: `${hidden.hiddenFundName==='hidden'?'flex':'hidden'}`}))}>📁 Add Person</div>    
    <ul className={`ml-8 cursor-pointer ${hidden.hiddenFundName} flex-col`}>
        <Link href={'/loan/'} onClick={()=>handleClick('Add Customer Create/Change')}>⭐ Person Create/Update/Change</Link>
    </ul>

    <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden,capitalDis:`${hidden.capitalDis==='hidden'?'flex':'hidden'}`}))}>📁 CAPITAL DISCLOUSRE </div>  
    <ul className={`ml-8 cursor-pointer ${hidden.capitalDis} flex-col`}>
        <Link href={'/shfndname/shfdata'} onClick={()=>handleClick('Fund Deposite /View Total Deposite')}>⭐ Create Fund Deposite /View Total Deposite</Link>
        <Link href={'/shfndname/cashflow'} onClick={()=>handleClick('Cash Flow Data')}>⭐ Cash Flow View</Link>
        <Link href={'/expense/particular'} onClick={()=>handleClick('Expense')}>⭐ Expense</Link>
        <Link href={'/expense/asset'} onClick={()=>handleClick('Asset')}>⭐ Asset</Link>
        <Link href={'/expense/staffsalary'} onClick={()=>handleClick('Staff Salary')}>⭐ Staff Salary</Link>
        <Link href={'/expense/fixdeposite'} onClick={()=>handleClick('Fixed Deposite')}>⭐ Fixed Deposite</Link>
        <Link href={'/expense/profitloss'} onClick={()=>handleClick('Profit and Loss Statement')}>⭐ Profit Loss</Link>
    </ul>  

    <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden ,rdpername : `${hidden.rdpername==='hidden'?'flex':'hidden'}`}))}>📁 Rd Create</div>  
    <ul className={`ml-8 cursor-pointer ${hidden.rdpername} flex-col`}>
        <Link href={'/rdname'} onClick={()=>handleClick('RD person Create/Change/Update/View')}>⭐ Create Rd /Change/Update</Link>
    </ul>  

    <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden , rdColl : `${hidden.rdColl==='hidden'?'flex':'hidden'}`}))}>📁 Add RD Collection</div>  
    <ul className={`ml-8 cursor-pointer ${hidden.rdColl} flex-col`}>
        <Link href={'/rdname/rdcoldata'} onClick={()=>handleClick(' Rd Collection')}>⭐ Rd Collection</Link>
        <Link href={'/rdname/rdcolpday'} onClick={()=>handleClick('Rd Collection View')}>⭐ Rd Collection View</Link>
    </ul>  

    <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden , loanColl: `${hidden.loanColl==='hidden'?'flex':'hidden'}`}))}>📁 Loan Collection</div>  
    <ul className={`ml-8 cursor-pointer ${hidden.loanColl} flex-col`}>
        <Link href={'/loan/loancoldata'} onClick={()=>handleClick('Loan Collection')}>⭐ Loan Collection</Link>
        <Link href={'/loan/loancolpday'} onClick={()=>handleClick('Loan Colleection View')}>⭐ Loan Colleection View</Link>
        <Link href={'/loan/loanamount'} onClick={()=>handleClick('Loan amount create/change/view')}>⭐ Loan amount create/change/view</Link>
    </ul>  

</div>
  )
}

export default ShareholderMenu