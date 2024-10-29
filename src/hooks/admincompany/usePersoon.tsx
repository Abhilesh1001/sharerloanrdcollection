import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import { useState } from 'react'
import { soundSsuccess, soundError, soundClick } from '@/sound/sound'
import { toast } from 'react-toastify'
import { format } from 'date-fns'


export interface personType {
    person_id?: null | number,
    name: string,
    usersf: null | number,
    phone_no: string,
    email: string,
    time?: string,
    pan_no: string,
    address: string,
    adharcard: string
}





export const usePerson = () => {

    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)

    const [personData, setPersonData] = useState<personType>({
        person_id: null,
        name: '',
        usersf: null,
        phone_no: '',
        email: '',
        time: '',
        pan_no: '',
        address: '',
        adharcard: ''
    });

    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')

    console.log('datadata',personData)


    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}adminpanel/personscompany/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data)
            setPersonData({
                person_id: null,
                name: '',
                usersf: null,
                phone_no: '',
                email: '',
                time: '',
                pan_no: '',
                address: '',
                adharcard: ''
            })
        },
        onError: (error) => {
            soundError?.play()
            console.log(error)
            toast.error('Enter all Required Fields', { position: 'top-left' })
        }
    })


    const handleSubmit = async () => {
       
        soundClick?.play()
        const newDatata = {
            name: personData.name,
            usersf: personData.usersf,
            phone_no: personData.phone_no,
            email: personData.email,
            time: personData.time,
            pan_no: personData.pan_no,
            address: personData.address,
            adharcard: personData.adharcard


        }

        console.log(newDatata, 'ok')

        mutation.mutate(newDatata)
    }


    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}adminpanel/personscompany/${vid}/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,


                }
            })
        },
        onSuccess: (data) => {
            console.log(data)
            setPersonData({
                person_id: null,
                name: '',
                usersf: null,
                phone_no: '',
                email: '',
                time: '',
                pan_no: '',
                address: '',
                adharcard: ''
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
            person_id: personData.person_id,
            name: personData.name,
            usersf: personData.usersf,
            phone_no: personData.phone_no,
            email: personData.email,
            time: personData.time,
            pan_no: personData.pan_no,
            address: personData.address,
            adharcard: personData.adharcard
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
            return await axios.get(`${baseurl}adminpanel/personscompany/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,

                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data, '..........')

            setPersonData(prev => {
                return {
                    ...prev,
                    person_id :data.data.person_id,
                    name: data.data.name,
                    usersf: data.data.usersf,
                    phone_no: data.data.phone_no,
                    email: data.data.email,
                    time: data.data.time,
                    pan_no: data.data.pan_no,
                    address: data.data.address,
                    adharcard: data.data.adharcard
                }
            })
        },
        onError: () => {
            soundError?.play()
            toast.error('Enter Correct Loand ID No', { position: 'top-left' })
        }
    })







    return { DataView, change, handleCreate, handleChange, handleUPdate, mutation, mutationUpdate, handleSubmit, handleKeyDownLoanId, vid, setVid, personData, setPersonData }
}