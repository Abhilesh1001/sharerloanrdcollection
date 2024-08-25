import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import { useState } from 'react'
import { soundSsuccess , soundError,soundClick } from '@/sound/sound'
import { toast } from 'react-toastify'
import { format } from 'date-fns'


export interface companyType{
    id?: null | number
    name : string,
    company_code : null | number
  }
  
  



export const useCompany =()=>{

    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)

    const [companyData,setCompanyData] = useState<companyType>({id:null,name:'',company_code:null})
   
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')


    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}adminpanel/companies/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data)
            setCompanyData(companyData)
        },
        onError:(error)=>{
            soundError?.play()
            console.log(error)
            toast.error('Enter all Required Fields',{position:'top-left'})
        }
    })
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        soundClick?.play()
        const newDatata = {
            name : companyData.name,
            company_code : companyData.company_code
            
        }
        
        console.log(newDatata,'ok')

        mutation.mutate(newDatata)
    }


    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}adminpanel/companies/${vid}/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            console.log(data)
            setCompanyData({id:null,name:'',company_code:null})
            soundSsuccess?.play()
        },      
        onError: (error) => {
            console.log(error)
            soundError?.play()
            toast.error('Enter all Required Fields',{position:'top-left'})
        }
    })


  

    // get initilal Data 


 


    async function handleUPdate() {
        soundClick?.play()

        const newDatata = {
            id: companyData.id,
            name:companyData.name,
            company_code :companyData.company_code
        }
        
     
        mutationUpdate.mutate(newDatata)

    }


    const handleCreate = () => {
       
        setChange('')
        soundClick?.play()
    }

    const handleChange = () => {
        setChange(`${change !== 'create' ? 'create' : null}`)
        soundClick?.play()
    }


    function handleKeyDownLoanId(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        console.log('Enter user ID')
        if (e.key === 'Enter') {
            soundClick?.play()  
            console.log('ok')
            const vid = parseInt(value)
            e.preventDefault();
            mutationUserInsert.mutate(vid)
        }
    }

    const mutationUserInsert = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.get(`${baseurl}adminpanel/companies/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data, '..........')
            setCompanyData(prev => {
                return {
                    ...prev,
                    name:data.data.name,
                    company_code :data.data.company_code
                }
            })
        },
        onError:()=>{
            soundError?.play()
            toast.error('Enter Correct Loand ID No',{position:'top-left'})
        }
    })







    return {DataView,change,handleCreate,handleChange,handleUPdate,mutation,mutationUpdate,handleSubmit,handleKeyDownLoanId,vid,setVid,companyData,setCompanyData}
}