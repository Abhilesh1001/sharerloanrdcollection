import React from 'react'
import DumyInput from './DumyInput'


const TableHead = (props:any) => {
    
  return (
    <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
    <tr>
                {props?.mainData?.map((data:any) => (
                    <th key={data}><DumyInput indum={data} /></th>
                ))}
            </tr>
        </thead>
  )
}

export default TableHead