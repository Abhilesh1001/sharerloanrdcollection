import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import { useState } from 'react'
import { soundSsuccess , soundError,soundClick } from '@/sound/sound'
import { toast } from 'react-toastify'
import { format } from 'date-fns'


export interface authGroupType {
    group_id: number | null,
    user: number | null,
    usersf: number | null,
    model_name: 'LoanColl'| 'RDColl'|'',
    auth_type : "checked_by" | "approved_by"|'' ,
    time?: '',
   
  }
  

export const useAuthgroup =()=>{

    const { baseurl, authToken,companyId } = useSelector((state: StateProps) => state.counter)

  

    const [authGroup,setAuthGroup] = useState<authGroupType>({group_id:null,user:null,usersf:null,model_name:'',auth_type:''})
   
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')



    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}loan/authgroup`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data)
            setAuthGroup(authGroup)
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
            user:authGroup.user,
            model_name:authGroup.model_name,
            auth_type:authGroup.auth_type  
        }
        
        console.log(newDatata,'ok')

        mutation.mutate(newDatata)
    }


    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}loan/authgroup/${vid}`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            console.log(data)
            setAuthGroup({group_id:null,user:null,usersf:null,model_name:'',auth_type:''})
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

            user: authGroup.user,   
            model_name: authGroup.model_name,
            auth_type: authGroup.auth_type,
            
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
            return await axios.get(`${baseurl}loan/authgroup/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data, '..........')
            setAuthGroup(prev => {
                return {
                    ...prev,
                    user: data.data.user,   
                    model_name: data.data.model_name,
                    auth_type: data.data.auth_type,
                }
            })
        },
        onError:()=>{
            soundError?.play()
            toast.error('Enter Correct Loand ID No',{position:'top-left'})
        }
    })



    return {DataView,change,handleCreate,handleChange,handleUPdate,mutation,mutationUpdate,handleSubmit,handleKeyDownLoanId,vid,setVid,authGroup,setAuthGroup}
}
