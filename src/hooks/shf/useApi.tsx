
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import axios from 'axios'


export const useApi =() =>{
    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)

    const apiWithId = async  (vid:number)=>{
        const res = await axios.get(`${baseurl}shar/shname/${vid}`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})
          return res.data
    }


  return {}
}