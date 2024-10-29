import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import { useState } from 'react'
import { soundSsuccess, soundError, soundClick } from '@/sound/sound'
import { toast } from 'react-toastify'
import { format } from 'date-fns'


export interface roleUpdateType {
    id?: null | number
    user: number | null,
    role: number | null,
    can_authenticate: boolean,
    company : null | number 
}




export const useAddUserRole = () => {

    const { baseurl, authToken,companyId } = useSelector((state: StateProps) => state.counter)

    const [roleData, setRoleData] = useState<roleUpdateType>({
        id: null,
        user: null,
        role: null,
        can_authenticate: false,
        company : null

    });

    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')


    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}adminpanel/userrolescompany/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data)
            setRoleData({
                user: null,
                role: null,
                can_authenticate: false,
                company : null
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
            user: roleData.user,
            role: roleData.role,
            can_authenticate: roleData.can_authenticate,
            company :  companyId
        }

        console.log(newDatata, 'ok')

        mutation.mutate(newDatata)
    }


    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}adminpanel/userrolescompany/${vid}/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                }
            })
        },
        onSuccess: (data) => {
            console.log(data)
            setRoleData({
                id: null,
                user: null,
                role: null,
                can_authenticate: false,
                company : null
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
            role: roleData.role,
            user: roleData.user,
            can_authenticate: roleData.can_authenticate

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
            return await axios.get(`${baseurl}adminpanel/userrolescompany/${vid}`, {
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
                    role: data.data.role,
                    user: data.data.user,
                    can_authenticate: data.data.can_authenticate,
                    company : data.data.company 
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