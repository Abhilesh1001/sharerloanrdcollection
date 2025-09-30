import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import { useState } from 'react'
import { soundSsuccess , soundError,soundClick } from '@/sound/sound'
import { toast } from 'react-toastify'
import { format } from 'date-fns'


export interface authgroupType{
    group_id?: null | number
    model_name : string,
    auth_type : string,
    user : number | null,
    usersf : number | null,
    user_name ?: string,
    usersf_name ?: string
  }
  
  



export const useAddAuthorization =()=>{

    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)

    const [authData,setAuthData] = useState<authgroupType>({group_id:null,model_name:'',auth_type:'',user:null,usersf:userId,user_name:'',usersf_name:''})
   
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')


    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}adminpanel/authgroup/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            // console.log(data)
            setAuthData(authData)
        },
        onError:(error)=>{
            soundError?.play()
            // console.log(error)
            toast.error('Enter all Required Fields',{position:'top-left'})
        }
    })
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        soundClick?.play()
        // console.log('ok')
        const newDatata = {
            user:authData.user,
            usersf:userId,
            model_name:authData.model_name,
            auth_type:authData.auth_type,
        }
        
        // console.log(newDatata,'ok')

        mutation.mutate(newDatata)
    }


    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}adminpanel/authgroup/${vid}`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            console.log(data)
            setAuthData({group_id:null,model_name:'',auth_type:'',user:null,usersf:null,user_name:'',usersf_name:''})
            soundSsuccess?.play()
        },      
        onError: (error) => {
            // console.log(error)
            soundError?.play()
            toast.error('Enter all Required Fields',{position:'top-left'})
        }
    })


  

    // get initilal Data 


 


    async function handleUPdate() {
        soundClick?.play()

        const newDatata = {
            user:authData.user,
            usersf:userId,
            model_name:authData.model_name,
            auth_type:authData.auth_type, 
        }
        // console.log('new',newDatata)
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
        // console.log('Enter user ID')
        if (e.key === 'Enter') {
            soundClick?.play()  
            // console.log('ok')
            const vid = parseInt(value)
            e.preventDefault();
            mutationUserInsert.mutate(vid)
        }
    }

    const mutationUserInsert = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.get(`${baseurl}adminpanel/authgroup/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            // console.log(data.data, '..........')
            setAuthData(prev => {
                return {
                    ...prev,
                    group_id:data.data.group_id,
                    user:data.data.user,
                    usersf:data.data.usersf,
                    model_name:data.data.model_name,
                    auth_type:data.data.auth_type,
                }
            })
        },
        onError:()=>{
            soundError?.play()
            toast.error('Enter Correct Loand ID No',{position:'top-left'})
        }
    })







    return {DataView,change,handleCreate,handleChange,handleUPdate,mutation,mutationUpdate,handleSubmit,handleKeyDownLoanId,vid,setVid,authData,setAuthData}
}