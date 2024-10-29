import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { StateProps } from '@/type/type';
import { useState } from 'react';
import { soundSsuccess, soundError, soundClick } from '@/sound/sound';
import { toast } from 'react-toastify';

interface ExpenseType {
    p_id?: null | number;
    particulars: string;
    usersf: null | number;
    amount_Debit: null | number;
    amount_credit: null | number;
    time?: string;  
}

export const useParticular = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);
    const [particularData, setParticularData] = useState<ExpenseType>({
        p_id: null,
        particulars: '',
        usersf: null,
        amount_Debit: null,
        amount_credit: null,
    });

    const [vid, setVid] = useState<string>('');
    const [change, setChange] = useState('change');

    // Create particular data
    const mutationCreate = useMutation<any, any, ExpenseType, unknown>({
        mutationFn: async (newParticular) => {
            return await axios.post(`${baseurl}adminpanel/partuclarscompany/`, newParticular, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data);
            setParticularData({
                p_id: null,
                particulars: '',
                usersf: null,
                amount_Debit: null,
                amount_credit: null,
            });
            toast.success('Particular created successfully', { position: 'top-left' });
        },
        onError: (error) => {
            soundError?.play();
            console.log(error);
            toast.error('Error creating particular. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleSubmit = () => {
        soundClick?.play();
        const newParticularData: ExpenseType = {
            particulars: particularData.particulars,
            usersf: particularData.usersf,
            amount_Debit: particularData.amount_Debit,
            amount_credit: particularData.amount_credit,
            time: particularData.time,
        };

        console.log(newParticularData, 'Submitting particular');
        mutationCreate.mutate(newParticularData);
    };

    // Update particular data
    const mutationUpdate = useMutation<any, any, ExpenseType, unknown>({
        mutationFn: async (updatedParticular: ExpenseType) => {
            return await axios.patch(`${baseurl}adminpanel/partuclarscompany/${vid}/`, updatedParticular, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            console.log(data);
            setParticularData({
                p_id: null,
                particulars: '',
                usersf: null,
                amount_Debit: null,
                amount_credit: null,
            });
            soundSsuccess?.play();
            toast.success('Particular updated successfully', { position: 'top-left' });
        },
        onError: (error) => {
            console.log(error);
            soundError?.play();
            toast.error('Error updating particular. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleUpdate = () => {
        soundClick?.play();
        const updatedParticularData: ExpenseType = {
            ...particularData,
        };

        console.log(updatedParticularData);
        mutationUpdate.mutate(updatedParticularData);
    };

    const handleCreate = () => {
        setChange('create');
        soundClick?.play();
    };

    const handleChange = () => {
        setChange(change !== 'create' ? 'create' : '');
        soundClick?.play();
    };

    function handleKeyDownParticularId(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        console.log('Enter particular ID');
        if (e.key === 'Enter') {
            soundClick?.play();
            const vid = parseInt(value);
            e.preventDefault();
            mutationFetchParticular.mutate(vid);
        }
    }

    const mutationFetchParticular = useMutation<any, any, number, unknown>({
        mutationFn: async (particularId: number) => {
            return await axios.get(`${baseurl}adminpanel/partuclarscompany/${particularId}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data.data, 'Fetched particular details');

            setParticularData({
                p_id: data.data.p_id,
                particulars: data.data.particulars,
                usersf: data.data.usersf,
                amount_Debit: data.data.amount_Debit,
                amount_credit: data.data.amount_credit,
               
            });
        },
        onError: () => {
            soundError?.play();
            toast.error('Enter a correct particular ID', { position: 'top-left' });
        },
    });

    return {
        particularData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        setParticularData,
        vid,
        setVid,
        handleKeyDownParticularId
    };
}
