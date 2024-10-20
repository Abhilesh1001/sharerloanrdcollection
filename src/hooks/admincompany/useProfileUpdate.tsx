import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import { useState } from 'react'
import { soundSsuccess, soundError, soundClick } from '@/sound/sound'
import { toast } from 'react-toastify'
import { format } from 'date-fns'


export interface profileUpdateType {
    id?: null | number
    user: null | number,
    profile_picture: File | null,
    pan_number: string,
    pan_picture: File |null,
    Date_of_Birth:string
}





export const useProfileUpdate = () => {

    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)

    const [profileData, setProfileData] = useState<profileUpdateType>({
        id: null,
        user: null,
        profile_picture: null,
        pan_number: '',
        pan_picture: null,
        Date_of_Birth:''
    });

    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')


    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}adminpanel/profileupdatescompany/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data)
            setProfileData({
                id: null,
                user: null,
                profile_picture: null,
                pan_number: '',
                pan_picture: null,
                Date_of_Birth:''
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
            user: profileData.user,
            profile_picture: profileData.profile_picture,
            pan_number: profileData.pan_number,
            pan_picture: profileData.pan_picture,
            Date_of_Birth:profileData.Date_of_Birth

        }

        console.log(newDatata, 'ok')

        mutation.mutate(newDatata)
    }


    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}adminpanel/profileupdatescompany/${vid}/`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                     'Content-Type': 'multipart/form-data'
                }
            })
        },
        onSuccess: (data) => {
            console.log(data)
            setProfileData({
                id: null,
                user: null,
                profile_picture: null,
                pan_number: '',
                pan_picture:null,
                Date_of_Birth:''
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
            id: profileData.id,
            user: profileData.user,
            profile_picture: profileData.profile_picture,
            pan_number: profileData.pan_number,
            pan_picture: profileData.pan_picture
        }


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
                return await axios.get(`${baseurl}adminpanel/profileupdatescompany/${vid}`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
            },
            onSuccess: (data) => {
                soundSsuccess?.play()
                console.log(data.data, '..........')
                
                setProfileData(prev => {
                    return {
                        ...prev,
                        user: data.data.user,
                        profile_picture: data.data.profile_picture,
                        pan_number: data.data.pan_number,
                        pan_picture :data.data.pan_picture,
                        Date_of_Birth : data.data.Date_of_Birth
                    }
                })
            },
            onError: () => {
                soundError?.play()
                toast.error('Enter Correct Loand ID No', { position: 'top-left' })
            }
        })







    return { DataView, change, handleCreate, handleChange, handleUPdate, mutation, mutationUpdate, handleSubmit, handleKeyDownLoanId, vid, setVid, profileData, setProfileData }
}