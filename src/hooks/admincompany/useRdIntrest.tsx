import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { StateProps, RDIntType } from '@/type/type';
import { useState } from 'react';
import { soundSsuccess, soundError, soundClick } from '@/sound/sound';
import { toast } from 'react-toastify';

export const useRdIntrest = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);
    const [RdInstData, setRdInstData] = useState<RDIntType>({
        rd_id: null,
        person: null,
        usersf: null,
        start_date: '',
        closing_date: '',
        is_active: true,
        duration: '',
        interest_rate: '',
    });

    const [vid, setVid] = useState<string>('');
    const [change, setChange] = useState('change');

    // Create loan interest data
    const mutationCreate = useMutation<any, any, RDIntType, unknown>({
        mutationFn: async (newRdInst) => {
            return await axios.post(`${baseurl}adminpanel/rdintscompany/`, newRdInst, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data);
            setRdInstData({
                rd_id: null,
                person: null,
                usersf: null,
                start_date: '',
                closing_date: '',
                is_active: true,
                duration: '',
                interest_rate: '',
            });
            toast.success('Loan created successfully', { position: 'top-left' });
        },
        onError: (error) => {
            soundError?.play();
            console.log(error);
            toast.error('Error creating loan. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleSubmit = async () => {
        soundClick?.play();
        const newRdInstData: RDIntType = {
            ...RdInstData,
        };

        console.log(newRdInstData, 'Submitting loan');
        mutationCreate.mutate(newRdInstData);
    };

    // Update loan interest data
    const mutationUpdate = useMutation<any, any, RDIntType, unknown>({
        mutationFn: async (updatedRdInst: RDIntType) => {
            return await axios.patch(`${baseurl}adminpanel/rdintscompany/${vid}/`, updatedRdInst, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            console.log(data);
            setRdInstData({
                rd_id: null,
                person: null,
                usersf: null,
                start_date: '',
                closing_date: '',
                is_active: true,
                duration: '',
                interest_rate: '',
            });
            soundSsuccess?.play();
            toast.success('Loan updated successfully', { position: 'top-left' });
        },
        onError: (error) => {
            console.log(error);
            soundError?.play();
            toast.error('Error updating loan. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleUpdate = () => {
        soundClick?.play();
        const updatedRdInstData: RDIntType = {
            ...RdInstData,
        };

        console.log(updatedRdInstData);
        mutationUpdate.mutate(updatedRdInstData);
    };

    const handleCreate = () => {
        setChange('create');
        soundClick?.play();
    };

    const handleChange = () => {
        setChange(change !== 'create' ? 'create' : '');
        soundClick?.play();
    };

    function handleKeyDownRdCollectionId(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        console.log('Enter loan ID');
        if (e.key === 'Enter') {
            soundClick?.play();
            const vid = parseInt(value);
            e.preventDefault();
            mutationFetchLoanCollection.mutate(vid);
        }
    }

    const mutationFetchLoanCollection = useMutation<any, any, number, unknown>({
        mutationFn: async (loanId: number) => {
            return await axios.get(`${baseurl}adminpanel/rdintscompany/${loanId}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data.data, 'Fetched loan details');

            setRdInstData({
                rd_id: data.data.rd_id,
                person: data.data.person,
                usersf: data.data.usersf,
                start_date: data.data.start_date,
                closing_date: data.data.closing_date,
                is_active: data.data.is_active,
                duration: data.data.duration,
                interest_rate: data.data.interest_rate,
            });
        },
        onError: () => {
            soundError?.play();
            toast.error('Enter a correct loan ID', { position: 'top-left' });
        },
    });

    return {
        RdInstData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownRdCollectionId,
        vid,
        setVid,
        setRdInstData,
    };
};
