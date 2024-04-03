import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import React, { useState } from 'react'
import {loanholderName} from '@/type/shareholder/shareholde'
import {getLoanNameData, getRdDataName} from '@/redux/shf/shfslicer'

interface MyData {
    data:{
        msg : string,
        data:loanholderName
    },
    isPending :boolean,
}

export const useLoan=()=>{

    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)
    const dispatch = useDispatch()
    const [loanholder,setLoanholder] = useState<loanholderName>({name:'',email:'', pan_no:'',phone_no:''})
    const [vid,setVid]= useState<string>('')
    const [sfcreate, setSfcreate] = useState('create')
    const [change, setChange] = useState('change')

    // create data 
    const mutation = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:loanholderName) => {
          return await axios.post(`${baseurl}loan/person`, newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {    
            setLoanholder({name:'',email:'', pan_no:'',phone_no:''})
          },  
    })
    const {data}:{data?:MyData} = mutation
    
    const handleSubmit = async( e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
       
        const newDatata = {
            "usersf":userId,
            "name": loanholder.name,
            "email": loanholder.email,
            "pan_no": loanholder.pan_no, 
            "phone_no": loanholder.phone_no
            }
            console.log(newDatata,'newDAta')

        mutation.mutate(newDatata)
    }

    // receive Data 
    const fetchTodoList = async () =>{
        const res = await axios.get(`${baseurl}loan/person`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})
          dispatch(getLoanNameData(res.data))
          return res.data
    }
      
    const mutationUpdate = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:loanholderName) => {
          return await axios.patch(`${baseurl}loan/person/${vid}/`,newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: (data) => {
           
            setLoanholder({name:'',email:'', pan_no:'',phone_no:''})

            },   
        onError:(error)=>{
            console.log(error)
        }           
    })
    const {data:updateData}:{data?:MyData} = mutationUpdate

    const {data:newData,error:errors} = useQuery({ queryKey: ['loanname',data,mutationUpdate,mutation], queryFn: fetchTodoList })


    const handleChange = ()=>{
        setChange(`${change!=='create'?'create':null}`)
    }

    

    const handleCreate =()=>{
        setLoanholder({name:'',email:'', pan_no:'',phone_no:''})
        setSfcreate('create')
        setChange('')
    }
  
    async function handleUPdate(){
        const newData = {
            usersf : userId,
            name:loanholder.name ,
            phone_no:loanholder.phone_no, 
            email: loanholder.email,
            pan_no: loanholder.pan_no,
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
            mutationLoan.mutate(vid)
        }
    }

    const mutationLoan = useMutation<any,any,any,unknown>({
        mutationFn: async (newTodo:loanholderName) => {
          return await axios.get(`${baseurl}loan/person/${vid}`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: (data) => {
               console.log(data)
            setLoanholder(prev=>{ 
                return {
                    ...prev,
                    name:data.data.name,
                    email: data.data.email,
                    pan_no:data.data.pan_no,
                    phone_no:data.data.phone_no
                }
              })}              
    })
  

    return {mutation,data,vid,setVid,loanholder,handleSubmit,setLoanholder,handleKeyDown,handleCreate,handleChange,handleUPdate,change,sfcreate,mutationUpdate,updateData}
}