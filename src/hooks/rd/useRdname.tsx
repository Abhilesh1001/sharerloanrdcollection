import axios from 'axios'
import {vendorType} from '@/type/type'
import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import {rdholderName} from '@/type/shareholder/shareholde'
import {getRdDataName} from '@/redux/shf/shfslicer'

interface MyData {
    data:{
        msg : string,
        data:rdholderName
    },
    isPending :boolean,
    
}

export const useRdname=()=>{
    

    const dispatch = useDispatch()
    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)
    const [rdholder,setrdholder] = useState<rdholderName>({name:'',email:'', pan_no:'',phone_no:''})

    const [vid,setVid]= useState<string>('')
    const [sfcreate, setSfcreate] = useState('create')
    const [change, setChange] = useState('change')


    const mutationUpdate = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:rdholderName) => {
          return await axios.patch(`${baseurl}shar/rdname/${vid}`,newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {
            setrdholder({name:'',email:'', pan_no:'',phone_no:''})
            
            },   
        onError:(error)=>{
            console.log(error)
        }           
    })
    const {data:updateData}:{data?:MyData} = mutationUpdate


    // create data 
    const mutation = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:rdholderName) => {
          return await axios.post(`${baseurl}shar/rdname`, newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {
            setrdholder({name:'',email:'', pan_no:'',phone_no:''})
          },  
    })
    const {data}:{data?:MyData} = mutation
    
    const handleSubmit = async( e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
       
        const newDatata = {
            "user":userId,
            "name": rdholder.name,
            "email": rdholder.email,
            "pan_no": rdholder.pan_no, 
            "phone_no": rdholder.phone_no
            }
            console.log(newDatata,'newDAta')

        mutation.mutate(newDatata)
    }

    // receive Data 
    const [enabled, setEnabled] = useState(false);
    const fetchTodoList = async () =>{
        const res = await axios.get(`${baseurl}shar/rdname`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})
          dispatch(getRdDataName(res.data))
          return res.data
    }
    
    const {data:newData,error:errors} = useQuery({ queryKey: ['rdname',data,mutationUpdate], queryFn: fetchTodoList,enabled:enabled })

    // hndleUpdata
   

    
    const handleChange = ()=>{
        setChange(`${change!=='create'?'create':null}`)
    }

    

    const handleCreate =()=>{
        setrdholder({name:'',email:'', pan_no:'',phone_no:''})
        setSfcreate('create')
        setChange('')
    }
  
    async function handleUPdate(){
        const newData = {
            user : userId,
            name:rdholder.name ,
            phone_no:rdholder.phone_no, 
            email: rdholder.email,
            pan_no: rdholder.pan_no,
        }
        mutationUpdate.mutate(newData)

    }


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

    const mutationFund = useMutation<any,any,any,unknown>({
        mutationFn: async (newTodo:rdholderName) => {
          return await axios.get(`${baseurl}shar/rdname/${vid}`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: (data) => {
               console.log(data)
            setrdholder(prev=>{ 
                return {
                    ...prev,
                    name:data.data.name,
                    email: data.data.email,
                    pan_no:data.data.pan_no,
                    phone_no:data.data.phone_no
                }
              })}              
    })

    
    



    return {setEnabled,mutation,data,setVid,vid,handleSubmit,rdholder,setrdholder,handleUPdate,change,handleCreate,handleChange,sfcreate,handleKeyDown,updateData,mutationUpdate}
}