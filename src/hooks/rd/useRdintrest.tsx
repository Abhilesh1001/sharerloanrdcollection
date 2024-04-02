import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import {rdintresttype} from '@/type/shareholder/shareholde'
import {getRdDataName} from '@/redux/shf/shfslicer'
import { format,parseISO } from 'date-fns';

interface MyData {
    data:{
        msg : string,
        data:rdintresttype
    },
    isPending :boolean,
}

export const useRdintrest=()=>{
    

    const dispatch = useDispatch()
    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)
    const [rdintrest,setrdintrest] = useState<rdintresttype>({name:'',holdetId:null,rd_intrest_id:null,isactive:true,duration:null,intrestrate:null, start_date:'',closing_date:''})
    const [vid,setVid]= useState<string>('')
    const [sfcreate, setSfcreate] = useState('create')
    const [change, setChange] = useState('change')
    


    const mutationUpdate = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:rdintresttype) => {
          return await axios.patch(`${baseurl}shar/rdintrest/${vid}`,newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {
            setrdintrest({name:'',holdetId:null,rd_intrest_id :null,
            isactive:true,duration:null,intrestrate:null, start_date:'',closing_date:''})
            
            },   
        onError:(error)=>{
            console.log(error)
        }           
    })
    const {data:updateData}:{data?:MyData} = mutationUpdate
    console.log(mutationUpdate.data,'.......')


    // create data 
    const mutation = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:rdintresttype) => {
          return await axios.post(`${baseurl}shar/rdintrest`, newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {
            setrdintrest({name:'',holdetId:null,isactive:true,duration:null,intrestrate:null, start_date:'',closing_date:''})
          },  
          onError:(error)=>{
            console.log(error)
          }
    })
    
    const handleSubmit = async( e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        
        const newDatata = {
            person : rdintrest.holdetId,
            start_date:rdintrest.start_date,
            closing_date :rdintrest.closing_date,
            is_active : rdintrest.isactive,
            duration: rdintrest.duration,
            interest_rate : rdintrest.intrestrate
            }
          

        mutation.mutate(newDatata)
    }


  
    const handleChange = ()=>{
        setChange(`${change!=='create'?'create':null}`)
    }

    

    const handleCreate =()=>{
        setrdintrest({name:'',holdetId:null,isactive:true,duration:null,intrestrate:null, start_date:'',closing_date:''})
        setSfcreate('create')
        setChange('')
    }
  
    async function handleUPdate(){
        const newDatata = {
            rd_intrest_id : rdintrest.rd_intrest_id,
            person : rdintrest.holdetId,
            start_date:rdintrest.start_date,
            closing_date :rdintrest.closing_date,
            is_active : rdintrest.isactive,
            duration: rdintrest.duration,
            interest_rate : rdintrest.intrestrate
            }

        mutationUpdate.mutate(newDatata)

    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        
        if (e.key === 'Enter') {
            console.log('ok')
            const vid = parseInt(value)
            e.preventDefault();
            mutationFund.mutate(vid)
        }
    }

    const mutationFund = useMutation<any,any,any,unknown>({
        mutationFn: async (newTodo:rdintresttype) => {
          return await axios.get(`${baseurl}shar/rdname/${vid}`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: (data) => {
               console.log(data)
            setrdintrest(prev=>{ 
                return {
                    ...prev,
                    name:data.data.name,
                    holdetId: data.data.rdp_id,
                }
              })}              
    })


    function handleKeyDownIntrest(e: React.KeyboardEvent<HTMLInputElement>){
        const value = (e.target as HTMLInputElement).value;
        console.log('Entewr rdintrest')
        if (e.key === 'Enter') {
            console.log('ok')
            const vid = parseInt(value)
            e.preventDefault();
            mutationIntrest.mutate(vid)
        }
    }
    

    const mutationIntrest = useMutation<any,any,any,unknown>({
        mutationFn: async (newTodo:rdintresttype) => {
          return await axios.get(`${baseurl}shar/rdintrest/${vid}`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: (data) => {
               console.log(data.data)
            //    {name:'',holdetId:null,isactive:true,duration:null,intrestrate:null, start_date:'',closing_date:''}
            setrdintrest(prev=>{ 
                return {
                    ...prev,
                    name:data.data.person_name,
                    rd_intrest_id : data.data.rd_intrest_id,
                    holdetId: data.data.person_id,
                    isactive : data.data.is_active,
                    duration : data.data.duration,
                    intrestrate : data.data.interest_rate,
                    start_date:format(data.data.start_date,'yyyy-MM-dd'),
                    closing_date:format(data.data.closing_date,'yyyy-MM-dd')
                }
              })
            }              
    })
    



    return {mutation,setVid,vid,handleSubmit,rdintrest,setrdintrest,handleUPdate,change,handleCreate,handleChange,sfcreate,handleKeyDown,updateData,mutationUpdate,handleKeyDownIntrest}
}