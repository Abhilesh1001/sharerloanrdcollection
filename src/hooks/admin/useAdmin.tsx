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
    password ?: string,
    password2?:string,
    is_company_admin :boolean,
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

    const [userData,setUserData] = useState<userType>({id:null,email:'',is_superuser:false,name:'',tc:false,is_active:false,is_admin:false,company:null,password :'',password2:'',is_company_admin:false })
   
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')



    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}cus/authreg/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data)
            setUserData({id:null,email:'',is_superuser:false,name:'',tc:false,is_active:false,is_admin:false,company:null,password :'',is_company_admin:false})
        },
        onError:(error)=>{
            soundError?.play()
            console.log(error)
            toast.error('Enter all Required Fields',{position:'top-left'})
        }
    })
        

    const handleSubmit = async () => {
       
        soundClick?.play()
        const newDatata = {
            email:userData.email,
            is_superuser: userData.is_superuser,
            name : userData.name,
            tc : userData.tc,
            is_active : userData.is_active,
            password : userData.password,
            password2:userData.password2,
            company : userData.company,
            is_company_admin :userData.is_company_admin,
            is_admin : userData.is_admin, 
        }
        
        console.log(newDatata,'ok')

        mutation.mutate(newDatata)
    }


    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}adminpanel/users/${vid}/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            console.log(data)
            setUserData({id:null,email:'',is_superuser:false,name:'',tc:false,is_active:false,is_admin:false,company:null,password :'',is_company_admin:false})
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
            id: userData.id,
            email:userData.email,
            is_superuser: userData.is_superuser,
            name : userData.name,
            tc : userData.tc,
            is_active : userData.is_active,
            company : userData.company,
            is_company_admin : userData.is_company_admin,
            is_admin : userData.is_admin,
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
            return await axios.get(`${baseurl}adminpanel/users/${vid}`, {
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
                    email:data.data.email,
                    is_superuser: data.data.is_superuser,
                    name : data.data.name,
                    tc : data.data.tc,
                    is_active : data.data.is_active,
                    company : data.data.company,
                    is_company_admin :data.data.is_company_admin,
                    password : data.data.password,
                    password2 : data.data.password2 
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