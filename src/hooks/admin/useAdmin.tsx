import axios from 'axios'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'



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



    return {data}
}