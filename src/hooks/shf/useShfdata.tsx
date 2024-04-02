import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import {shareholderName,MyData,sharefund} from '@/type/shareholder/shareholde'
import { format,parseISO } from 'date-fns';
import axios from 'axios'
import React, {useState } from 'react'


export const useShfdata =()=>{

    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)
    const [sharfund,setShareFund] = useState<sharefund>({sh_id :null ,name:'',amount_credit:null,amount_debit:null,particulars:''})
    const [vid,setVid]= useState<string>('')

    // create data 
    const mutation = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:shareholderName) => {
            console.log('new',newTodo)
          return await axios.post(`${baseurl}shar/shfund`, newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: (data,error) => {
            setShareFund({sh_id :null,name:'',amount_credit:null,amount_debit:null,particulars:''})
            console.log(error)
          },  
    })
    const {data}:{data?:MyData} = mutation




    
    const handleSubmit = async( e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        

        const newDatata = {
            user:userId,
            sh_name: sharfund.sh_id,
            amount_credit: sharfund.amount_credit,
            amount_debit: sharfund.amount_debit, 
            particulars: sharfund.particulars
            }
            console.log('new Data',newDatata)
        mutation.mutate(newDatata)
       
    }

    // receive Data 
    const fetchTodoList = async () =>{
        const res = await axios.get(`${baseurl}shar/capialDisview`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})
          return res.data
    }

    const [enabled, setEnabled] = useState(false);
    console.log(enabled)
 
    const {data:newData,error:errors} = useQuery({ queryKey: ['capitalcview',data], queryFn: fetchTodoList,enabled:enabled })
    console.log(newData)


    // for handleChnge received Data 

    const mutationFund = useMutation<any,any,any,unknown>({
        mutationFn: async (newTodo:shareholderName) => {
          return await axios.get(`${baseurl}shar/shname/${newTodo}`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: (data) => {
            console.log(data.data)
            setShareFund((prev)=>{
                return {
                    ...prev,
                    name : data.data.name,
                    sh_id:data.data.Sh_id
                }
            })
          }, 


          
    })
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        console.log(value)
        if (e.key === 'Enter') {
            console.log('ok')
            const vid = parseInt(value)
            e.preventDefault();
            mutationFund.mutate(vid)
        }
    }




    return {setEnabled,mutation,data,handleKeyDown,vid,setVid,handleSubmit,sharfund,setShareFund,newData}
}