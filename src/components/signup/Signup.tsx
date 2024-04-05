
'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import Loading from '../loading/Loading';
import { soundClick,soundError,soundSsuccess } from '@/sound/sound';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const Signup = () => {

    const router = useRouter() 
    const { baseurl } = useSelector((state: StateProps) => state.counter)
    const mutation = useMutation<any, any, any, any>({
        mutationFn: async (data) => {
            return await axios.post(`${baseurl}cus/authreg/`, data)
        },
        onSuccess: () => {
            formik.resetForm();
            toast.success('You are Successfully Signup',{position:'top-center'})
            router.push('/login')
            soundSsuccess?.play()
        },
        onError:(error)=>{
            soundError?.play()
            toast.error('Please check Your credentials',{position:'top-center'})
        }
    })
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        name: Yup.string().required('Name is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        password2: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
        tc: Yup.boolean().oneOf([true], 'You must agree to the terms'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            password2: '',
            tc: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            const data = {
                email: values.email,
                name: values.name,
                password: values.password,
                tc: values.tc
            }
            // console.log(data)
            // Add your form submission logic here
            mutation.mutate(values)
        },
    });


    return (
        <div className='mt-10'>
            <form onSubmit={formik.handleSubmit}>
                
                <div>{mutation.isPending && <Loading />}</div>
                {mutation?.isSuccess && <div className='p-2 rounded capitalize'>{mutation.data.data.msg}</div>}
                {mutation.error && <div className='p-2 capitalize rounded'>{mutation?.error?.response?.data?.errors?.email[0]}</div>}

                <label htmlFor="name" className='block'>Name</label>
                {<div className=''>{formik.errors.name}</div>}
                <input type="text" required name='name'  onChange={formik.handleChange} placeholder="name" className="input input-bordered w-80 my-2" />
                {<div className=''>{formik.errors.email}</div>}
                <label htmlFor="email" className='block'>Email</label>
                <input type="email" required name='email' placeholder="email" value={formik.values.email} onChange={formik.handleChange} className="input input-bordered w-80 my-2" />
                <label htmlFor="email" className='block'>Password</label>
                {<div className=''>{formik.errors.password}</div>}
                <input type="password" required name='password' value={formik.values.password} onChange={formik.handleChange} placeholder="password" className="input input-bordered w-80 my-2" />

                <label htmlFor="email" className='block'>Confirm Password</label>
                {<div className=''>{formik.errors.password2}</div>}
                <input type="password" required name='password2' value={formik.values.password2} onChange={formik.handleChange} placeholder="confirm password" className="input input-bordered w-80 my-2" />
                <div>
                <input type="checkbox" checked={formik.values.tc} onChange={formik.handleChange} name="tc" defaultChecked className="checkbox" />
                <label htmlFor="checkbox" className='ml-2 mb-4'>Do you Agree</label>
                </div>
                <button className="btn btn-warning  mb-60 block" type='submit'>Signup</button>
                
            </form>
        </div>
    )
}

export default Signup



