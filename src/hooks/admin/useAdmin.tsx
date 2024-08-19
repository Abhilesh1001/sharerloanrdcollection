import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import { useState } from 'react'
import { soundSsuccess , soundError,soundClick } from '@/sound/sound'
import { toast } from 'react-toastify'
import { format } from 'date-fns'


export interface userType{
    id ?:number|null,
    email : string,
    is_superuser : boolean,
    name : string,
    tc : boolean,
    is_active : boolean,
    is_admin : boolean,
    company : number|null,
    password ?: string
  }
  
  



export const useAdmin =()=>{

    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)

    const getTodos = async () => {

        const res = await axios.get(`${baseurl}cus/api/permissions/`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        return res.data


    }

    const { data } = useQuery({ queryKey: ['apipermission'], queryFn: getTodos })

    const [userData,setUserData] = useState<userType>({id:null,email:'',is_superuser:false,name:'',tc:false,is_active:false,is_admin:false,company:null,password :''})
   
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')


    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}adminpanel/users/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data)
            setUserData(userData)
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
            email:userData.email,
            is_superuser: userData.is_superuser,
            name : userData.name,
            tc : userData.tc,
            is_active : userData.is_active,
            password : userData.password
        }
        
        console.log(newDatata,'ok')

        mutation.mutate(newDatata)
    }


    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}adminpanel/users/${vid}`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            setUserData(userData)
            soundSsuccess?.play()
        },      
        onError: (error) => {
            console.log(error)
            soundError?.play()
            toast.error('Enter all Required Fields',{position:'top-left'})
        }
    })


    // receive Data 
    const fetchTodoList = async () => {
        const res = await axios.get(`${baseurl}loan/asset`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        console.log(res.data)
        return res.data
    }
   
    const { data: newData, error: errors } = useQuery({ queryKey: ['assets', mutation.data,mutationUpdate.data], queryFn: fetchTodoList })


    // get initilal Data 


 


    async function handleUPdate() {
        soundClick?.play()

        const newDatata = {
            id: userData.id,
            email:userData.email,
            is_superuser: userData.is_superuser,
            asset_name : userData.name,
            tc : userData.tc,
            is_active : userData.is_active 
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
        console.log('Entewr rdintrest')
        if (e.key === 'Enter') {
            soundClick?.play()  
            console.log('ok')
            const vid = parseInt(value)
            e.preventDefault();
            mutationIntrest.mutate(vid)
        }
    }

    const mutationIntrest = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.get(`${baseurl}loan/asset/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data, '..........')
            setUserData(prev => {
                return {
                    ...prev,
                    amount_Debit: data.data.amount_Debit,
                    asset_name: data.data.asset_name,
                    asset_no: data.data.asset_no,
                    debit_date: format(data.data.debit_date, 'yyyy-MM-dd'),
                }
            })
        },
        onError:()=>{
            soundError?.play()
            toast.error('Enter Correct Loand ID No',{position:'top-left'})
        }
    })







    return {DataView,change,handleCreate,handleChange,handleUPdate,mutation,mutationUpdate,handleSubmit,handleKeyDownLoanId,vid,setVid,userData,setUserData,data}
}