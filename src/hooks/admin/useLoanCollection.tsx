import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { StateProps, loanCollType } from '@/type/type';
import { useState } from 'react';
import { soundSsuccess, soundError, soundClick } from '@/sound/sound';
import { toast } from 'react-toastify';

export const useLoanCollection = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);
    const [loanCollectionData, setLoanCollectionData] = useState<loanCollType>({
        loan_collection_id: null,
        loan_intrest: null,
        collection_date: '',
        amount_collected: null,
        remarks: '',
        usersf: null,
    });

    const [vid, setVid] = useState<string>('');
    const [change, setChange] = useState('change');

    // Create loan collection data
    const mutationCreate = useMutation<any, any, loanCollType, unknown>({
        mutationFn: async (newLoanCollection) => {
            return await axios.post(`${baseurl}adminpanel/loancolls/`, newLoanCollection, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                    'Content-Type': 'application/json',
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data);
            setLoanCollectionData({
                loan_collection_id: null,
                loan_intrest: null,
                collection_date: '',
                amount_collected: null,
                remarks: '',
                usersf: null,
            });
            toast.success('Loan collection created successfully', { position: 'top-left' });
        },
        onError: (error) => {
            soundError?.play();
            console.log(error);
            toast.error('Error creating loan collection. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleSubmit = async () => {
        soundClick?.play();
        const newLoanCollectionData = {
            ...loanCollectionData,
        };

        console.log(newLoanCollectionData, 'Submitting loan collection');
        mutationCreate.mutate(newLoanCollectionData);
    };

    // Update loan collection data
    const mutationUpdate = useMutation<any, any, loanCollType, unknown>({
        mutationFn: async (updatedLoanCollection: loanCollType) => {
            return await axios.patch(`${baseurl}adminpanel/loancolls/${vid}/`, updatedLoanCollection, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            console.log(data);
            setLoanCollectionData({
                loan_collection_id: null,
                loan_intrest: null,
                collection_date: '',
                amount_collected: null,
                remarks: '',
                usersf: null,
            });
            soundSsuccess?.play();
            toast.success('Loan collection updated successfully', { position: 'top-left' });
        },
        onError: (error) => {
            console.log(error);
            soundError?.play();
            toast.error('Error updating loan collection. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleUpdate = () => {
        soundClick?.play();
        const updatedLoanCollectionData = {
            ...loanCollectionData,
        };

        console.log(updatedLoanCollectionData);
        mutationUpdate.mutate(updatedLoanCollectionData);
    };

    const handleCreate = () => {
        setChange('create');
        soundClick?.play();
    };

    const handleChange = () => {
        setChange(change !== 'create' ? 'create' : '');
        soundClick?.play();
    };

    function handleKeyDownLoanCollectionId(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        console.log('Enter loan collection ID');
        if (e.key === 'Enter') {
            soundClick?.play();
            const vid = parseInt(value);
            e.preventDefault();
            mutationFetchLoanCollection.mutate(vid);
        }
    }

    const mutationFetchLoanCollection = useMutation<any, any, number, unknown>({
        mutationFn: async (loanCollectionId: number) => {
            return await axios.get(`${baseurl}adminpanel/loancolls/${loanCollectionId}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data.data, 'Fetched loan collection details');

            setLoanCollectionData({
                loan_collection_id: data.data.loan_collection_id,
                loan_intrest: data.data.loan_intrest,
                collection_date: data.data.collection_date,
                amount_collected: data.data.amount_collected,
                remarks: data.data.remarks,
                usersf: data.data.usersf,
            });
        },
        onError: () => {
            soundError?.play();
            toast.error('Enter a correct loan collection ID', { position: 'top-left' });
        },
    });

    return {
        loanCollectionData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownLoanCollectionId,
        vid,
        setVid,
        setLoanCollectionData,
    };
};
