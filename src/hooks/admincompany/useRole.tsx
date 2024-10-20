import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import { useState } from 'react'
import { soundSsuccess, soundError, soundClick } from '@/sound/sound'
import { toast } from 'react-toastify'
import { format } from 'date-fns'


export interface roleType {
    id?: null | number,
    company: null | number,
    name: string
    permissions: any,

}





export const useRole = () => {

    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)

    const [roleData, setRoleData] = useState<roleType>({
        id: null,
        company: null,
        name: '',
        permissions: [],
        
    });

    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')


    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}adminpanel/roles/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data)
            setRoleData({
                id: null,
                company: null,
                name: '',
                permissions: [],
            })
        },
        onError: (error) => {
            soundError?.play()
            console.log(error)
            toast.error('Enter all Required Fields', { position: 'top-left' })
        }
    })


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        soundClick?.play()

        const newDatata = {
            name : roleData.name,
            company : roleData.company,
            permissions : roleData.permissions
        }

        console.log(newDatata, 'ok')

        mutation.mutate(newDatata)
    }


    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}adminpanel/roles/${vid}/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                }
            })
        },
        onSuccess: (data) => {
            console.log(data)
            setRoleData({
                id: null,
                company: null,
                name: '',
                permissions: [],
            })
            soundSsuccess?.play()
        },
        onError: (error) => {
            console.log(error)
            soundError?.play()
            toast.error('Enter all Required Fields', { position: 'top-left' })
        }
    })




    // get initilal Data 





    async function handleUPdate() {
        soundClick?.play()

        const newDatata = {
            id: roleData.id,
            company : roleData.company,
            name : roleData.name,
            permissions : roleData.permissions

        }
        console.log(newDatata)

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
            return await axios.get(`${baseurl}adminpanel/roles/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data, '..........')

            setRoleData(prev => {
                return {
                    ...prev,
                    name : data.data.name,
                    company : data.data.company,
                    permissions : data.data.permissions
                }
            })
        },
        onError: () => {
            soundError?.play()
            toast.error('Enter Correct Loand ID No', { position: 'top-left' })
        }
    })







    return { DataView, change, handleCreate, handleChange, handleUPdate, mutation, mutationUpdate, handleSubmit, handleKeyDownLoanId, vid, setVid, roleData, setRoleData }
}