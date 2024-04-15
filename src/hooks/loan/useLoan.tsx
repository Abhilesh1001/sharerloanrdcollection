import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import React, { useState } from 'react'
import {loanholderName} from '@/type/shareholder/shareholde'
import {getLoanNameData, getRdDataName} from '@/redux/shf/shfslicer'
import { toast } from 'react-toastify'
import { soundClick,soundError,soundSsuccess } from '@/sound/sound'
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
    const [loanholder,setLoanholder] = useState<loanholderName>({name:'',email:'', pan_no:'',phone_no:'',addhar:'',address:''})
    const [vid,setVid]= useState<string>('')
    const [change, setChange] = useState('change')

    // create data 
    const mutation = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:loanholderName) => {
          return await axios.post(`${baseurl}loan/person`, newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {    
            setLoanholder({name:'',email:'', pan_no:'',phone_no:'',addhar:'',address:''})
            soundSsuccess?.play()
          },  
          onError:(error)=>{
            console.log(error)
            soundError?.play()
            toast.error('Fill all Required Fields',{position:'top-left'})
          }
    })
    console.log(mutation.data)
    
    const handleSubmit = async( e: React.FormEvent<HTMLFormElement>) =>{
        soundClick?.play()
        e.preventDefault()
        const newDatata = {
            "usersf":userId,
            "name": loanholder.name,
            "email": loanholder.email===''?'na@gmail.com':loanholder.email,
            "pan_no": loanholder.pan_no===''?'na':loanholder.pan_no, 
            "phone_no": loanholder.phone_no,
            "address": loanholder.address,
            "adharcard": loanholder.addhar===''?'na':loanholder.addhar
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
            setLoanholder({name:'',email:'', pan_no:'',phone_no:'',addhar:'',address:''})
            soundSsuccess?.play()

            },   
        onError:(error)=>{
            soundError?.play()
            console.log(error)
            toast.error('Fill All the required Fields',{position:'top-left'})
        }           
    })
    const {data:updateData}:{data?:MyData} = mutationUpdate

    const {data:newData,error:errors} = useQuery({ queryKey: ['loanname',mutationUpdate.data,mutation.data], queryFn: fetchTodoList })


    const handleChange = ()=>{
        setChange(`${change!=='create'?'create':null}`)
        soundClick?.play()
    }

    

    const handleCreate =()=>{
        soundClick?.play()
        setLoanholder({name:'',email:'', pan_no:'',phone_no:'',addhar:'',address:''})
        setChange('')
    }
  
    async function handleUPdate(){
        soundClick?.play()
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

            soundSsuccess?.play()
               console.log(data)
            setLoanholder(prev=>{ 
                return {
                    ...prev,
                    name:data.data.name,
                    email: data.data.email,
                    pan_no:data.data.pan_no,
                    phone_no:data.data.phone_no,
                    addhar:data.data.adharcard,
                    address :data.data.address
                }

              })},
              onError:(error)=>{
                toast.error('Enter Correct Customer Id',{position:'top-left'})
                soundError?.play()

              }           
    })
  
    return {mutation,vid,setVid,loanholder,handleSubmit,setLoanholder,handleKeyDown,handleCreate,handleChange,handleUPdate,change,mutationUpdate,updateData}
}