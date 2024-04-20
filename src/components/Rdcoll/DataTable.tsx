import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import DumyInput from '../dummyinput/DumyInput';
import { useDispatch } from 'react-redux';

interface Entry {
    [rdHolderId: string]: number | null;
}

interface Data {
    [date: string]: Entry;
}

interface TableData {
    [date: string]: { [rdHolderId: string]: number | null };
}

interface DataTableProps {
    startDate: string;
    endDate: string;
    data: Data;
}

const DataTable: React.FC<DataTableProps> = ({ startDate, endDate, data }) => {
    
    const [tableData, setTableData] = useState<TableData>({});
    const dispatch = useDispatch()

    useEffect(() => {
        const transformedData: TableData = {};

        const currentDate = new Date(startDate);
        const lastDate = new Date(endDate);

        while (currentDate <= lastDate) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            transformedData[formattedDate] = {};

            for (const rdHolderId in data) {
                const entries = data[rdHolderId];
                const amount = entries[formattedDate] || null;
                transformedData[formattedDate][rdHolderId] = amount || 0;
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        setTableData(transformedData);
    }, [startDate, endDate, data]);


    // csv file make 
    let csvData: any = []
    if (data) {

        const rdHolderIds = Object.keys(data);

        const rdHolderIData = rdHolderIds?.map((rdHolderId: any) => {
            return rdHolderId
        })


        const rowData = Object.entries(tableData).map(([date, rowData])=>{
            
            
            const totalamount =  Object.entries(rowData).map(([rdHolderId, amount], index) => {
                return amount
            }
        )
         
            return [date,[Object.values(rowData).reduce((acc: number, amount) => acc + (amount ?? 0), 0)],...totalamount]
        })

        csvData = [
           
            ["DATE","TOTAL AMOUNT",...rdHolderIData],
            ...rowData
        ];
    } 


        const renderTableHeader = () => {
            const rdHolderIds = Object.keys(data);
            return (
                <tr>
                    <th className='sticky left-0'><DumyInput indum={'DATE'} /> </th>
                    <th className='sticky left-24'><DumyInput indum={'TOTAL AMOUNT'} /></th>
                    {rdHolderIds.map((rdHolderId) => (
                        <th key={rdHolderId}><DumyInput indum={rdHolderId} />
                        </th>
                    ))}
                </tr>
            );
        };

        const renderTableRows = () => {
            return Object.entries(tableData).map(([date, rowData]) => (
                <tr key={date}>
                    <td className='sticky left-0'><DumyInput indum={date} /></td>
                    <td className='sticky left-24'><DumyInput indum={Object.values(rowData).reduce((acc: number, amount) => acc + (amount ?? 0), 0)} /></td>
                    {Object.entries(rowData).map(([rdHolderId, amount], index) => (
                        <td key={index}><DumyInput indum={amount} /></td>
                    ))}
                </tr>
            ));
        };

        return (
            <>
                <div className='absolute'>
                <button className='btn btn-secondary mr-2 ml-10 relative top-[-50px]'><CSVLink filename={'Collection-file.csv'} data={csvData}>Export Excel</CSVLink></button>
                </div>
               
                <div className=' ml-2 mr-2 h-[550px] overflow-auto text-nowrap bg-base-300 my-2 relative overflow-y-auto shadow-md d mt-2  sm:rounded-lg'>
                    <table className="w-full text-sm text-left rtl:text-right  " >
                        <thead className='sticky top-0 z-1  h-10'>{renderTableHeader()}</thead>
                        <tbody>{renderTableRows()}</tbody>
                    </table>
                </div>
            </>
        );
    };

export default DataTable;
