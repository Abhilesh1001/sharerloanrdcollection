import {vendorType} from '@/type/type'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useMutation,useQuery} from '@tanstack/react-query'
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import {shareholderName} from '@/type/shareholder/shareholde'

export interface MyData {
    data:{
        msg : string,
        data:shareholderName
    },
    isPending :boolean,
    
}

export interface MyUpdateData {
     data :{

     }
}


export const useShfname = ()=>{
    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)

    const [shareholder,setShareHolder] = useState<shareholderName>({name:'',email:'', pan_no:'',phone_no:''})
    const [vid,setVid]= useState<string>('')
    const [sfcreate, setSfcreate] = useState('create')
    const [change, setChange] = useState('create')
    


    const mutationUpdate = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:shareholderName) => {
          return await axios.patch(`${baseurl}shar/shname/${vid}/`,newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {
            setShareHolder({name:'',email:'', pan_no:'',phone_no:''})

            },   
        onError:(error)=>{
            console.log(error)
        }           
    })
    const {data:updateData}:{data?:MyData} = mutationUpdate

      
  



        // create data 
        const mutation = useMutation<MyData,any,any,unknown>({
            mutationFn: async (newTodo:shareholderName) => {
              return await axios.post(`${baseurl}shar/shname`, newTodo,{headers:{
                Authorization:`Bearer ${authToken?.access}`
              }})} ,
              onSuccess: () => {
                setShareHolder({name:'',email:'', pan_no:'',phone_no:''})
              },  
        })
        const {data}:{data?:MyData} = mutation
        
        const handleSubmit = async( e: React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault()
            console.log(shareholder)


            const newDatata = {
                "user":userId,
                "name": shareholder.name,
                "email": shareholder.email,
                "pan_no": shareholder.pan_no, 
                "phone_no": shareholder.phone_no
            }

            
                
            mutation.mutate(newDatata)
        }
    

        // receive Data 
        const fetchTodoList = async () =>{
            console.log('ok',vid)
            
                const res = await axios.get(`${baseurl}shar/shname`,{headers:{
                    Authorization:`Bearer ${authToken?.access}`
                  }})
                  return res.data
        }




    
        const [enabled, setEnabled] = useState(false);
     
        const {data:newData,error:errors} = useQuery({ queryKey: ['shname',data,mutationUpdate], queryFn: fetchTodoList,enabled:enabled })


        const handleChange = ()=>{
            setChange(`${change!=='create'?'create':null}`)
        }

        

        const handleCreate =()=>{
            setShareHolder({name:'',email:'', pan_no:'',phone_no:''})
            setSfcreate('create')
            setChange('')
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
            mutationFn: async (newTodo:shareholderName) => {
              return await axios.get(`${baseurl}shar/shname/${vid}/`,{headers:{
                Authorization:`Bearer ${authToken?.access}`
              }})} ,
              onSuccess: (data) => {
                setShareHolder(prev=>{
                    return {
                        ...prev,
                        name:data.data.name,
                        email: data.data.email,
                        pan_no:data.data.pan_no,
                        phone_no:data.data.phone_no
                    }
                  })},
                
                                
        })
        console.log(mutationFund.error)

    
        async function handleUPdate(){
            const newData = {
                user : userId,
                name:shareholder.name ,
                phone_no:shareholder.phone_no, 
                email: shareholder.email,
                pan_no: shareholder.pan_no,
            }
            mutationUpdate.mutate(newData)

        }
    
     

    return {shareholder,setShareHolder,newData,setEnabled,mutation,data,setVid,vid,handleSubmit,sfcreate, setSfcreate,change,setChange,handleCreate,handleKeyDown,handleChange,handleUPdate,mutationUpdate,updateData}
}