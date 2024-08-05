
import React, { useState } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { StateProps } from '../Navbar'
import DumyInput from '../dummyinput/DumyInput'


export default function ViewPermisson() {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
    const [id, setId] = useState<number | string>('');
    const [userData, setUserData] = useState({ id: null, company: null, email: '', name: '' })


    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async () => {
            return await axios.get(`${baseurl}cus/api/permissions/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            setId('')
        },
        onError: () => {

        }
    })

    console.log(mutation.data)



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        mutation.mutate(id)

        try {
            const data = await axios.get(`${baseurl}adminpanel/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })

            const newData = {
                id: data.data.id,
                company: data.data.company,
                email: data.data.email,
                name: data.data.name
            }
            setUserData(newData)
        } catch (error) {
            console.log(error)

        }



    }

    return (
        <div>


            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-error" >Cancel</button>
            </form>

            <div className='row'>
                <div className='col-sm-6'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="User Id " className='block'>User ID</label>
                        <input type="number" value={id !== '' ? id : ''} required name='user_id' onChange={(e) => setId(e.target.value)} placeholder="User ID" className="input input-bordered w-80 my-2" />

                        <button className='btn btn-success ml-2' type='submit'>Submit</button>
                    </form>
                </div>
                <div className='col-sm-6 mt-4'>
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className='sticky top-0 z-1  h-10 bg-base-200'>
                            <tr >
                                <th><div className='ml-2'>id</div></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Comapny Id</th>
                            </tr>
                        </thead>
                        <tbody >


                            <tr >
                                <td><DumyInput indum={userData.id} /></td>
                                <td><DumyInput indum={userData.name} /></td>
                                <td><DumyInput indum={userData.email} /></td>
                                <td><DumyInput indum={userData.company} /></td>
                            </tr>


                        </tbody>
                    </table>

                </div>

            </div>




            <div className=' ml-2 mr-2 mt-4 h-[70vh] bg-base-300 overflow-auto w-[50vw] text-nowrap my-2 relative overflow-y-auto shadow-md  sm:rounded-lg'>

                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className='sticky top-0 z-1  h-10 bg-base-200'>
                        <tr >
                            <th><div className='ml-2'>id</div></th>
                            <th>Name</th>
                            <th>Code Name</th>
                            <th>Content Type Model</th>
                        </tr>
                    </thead>
                    <tbody >

                        {
                            mutation.data?.data.length > 0 && mutation.data?.data?.map((item: {
                                id: number,
                                name: string,
                                codename: string,
                                content_type__model: string
                            }) => {

                                return (
                                    <tr key={item.id}>
                                        <td><DumyInput indum={item.id} /></td>
                                        <td><DumyInput indum={item.name} /></td>
                                        <td><DumyInput indum={item.codename} /></td>
                                        <td><DumyInput indum={item.content_type__model} /></td>
                                    </tr>
                                )

                            })
                        }

                    </tbody>
                </table>
            </div>



        </div>




    )
}
