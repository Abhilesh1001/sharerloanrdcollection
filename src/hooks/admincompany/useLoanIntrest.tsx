import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { StateProps,loanType } from '@/type/type';
import { useState } from 'react';
import { soundSsuccess, soundError, soundClick } from '@/sound/sound';
import { toast } from 'react-toastify';



export const useLoanIntrest = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);
    const [loanCollectionData, setLoanCollectionData] = useState<loanType>({
        loan_id: null,
        person: null,
        loan_amount: null,
        usersf: null,
        remarks: '',
        is_active: true,
        start_date: '',
        days: null,
        duration: null,
        closing_date: '',
        interest_rate: null,
    });

    const [vid, setVid] = useState<string>('');
    const [change, setChange] = useState('change');

    // Create loan collection data
    const mutationCreate = useMutation<any, any, loanType, unknown>({
        mutationFn: async (newLoanCollection) => {
            return await axios.post(`${baseurl}adminpanel/loanintscompany/`, newLoanCollection, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data);
            setLoanCollectionData({
                loan_id: null,
                person: null,
                loan_amount: null,
                usersf: null,
                remarks: '',
                is_active: true,
                start_date: '',
                days: null,
                duration: null,
                closing_date: '',
                interest_rate: null,
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
        const newLoanCollectionData: loanType = {
            person: loanCollectionData.person,
            loan_amount: loanCollectionData.loan_amount,
            usersf: loanCollectionData.usersf,
            remarks: loanCollectionData.remarks,
            is_active: loanCollectionData.is_active,
            start_date: loanCollectionData.start_date,
            days: loanCollectionData.days,
            duration: loanCollectionData.duration,
            closing_date: loanCollectionData.closing_date,
            interest_rate: loanCollectionData.interest_rate,
        };

        console.log(newLoanCollectionData, 'Submitting loan');
        mutationCreate.mutate(newLoanCollectionData);
    };

    // Update loan collection data
    const mutationUpdate = useMutation<any, any, loanType, unknown>({
        mutationFn: async (updatedLoanCollection: loanType) => {
            return await axios.patch(`${baseurl}adminpanel/loanintscompany/${vid}/`, updatedLoanCollection, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            console.log(data);
            setLoanCollectionData({
                loan_id: null,
                person: null,
                loan_amount: null,
                usersf: null,
                remarks: '',
                is_active: true,
                start_date: '',
                days: null,
                duration: null,
                closing_date: '',
                interest_rate: null,
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
        const updatedLoanCollectionData: loanType = {
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
            return await axios.get(`${baseurl}adminpanel/loanintscompany/${loanId}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data.data, 'Fetched loan details');

            setLoanCollectionData({
                loan_id: data.data.loan_id,
                person: data.data.person,
                loan_amount: data.data.loan_amount,
                usersf: data.data.usersf,
                remarks: data.data.remarks,
                is_active: data.data.is_active,
                start_date: data.data.start_date,
                days: data.data.days,
                duration: data.data.duration,
                closing_date: data.data.closing_date,
                interest_rate: data.data.interest_rate,
            });
        },
        onError: () => {
            soundError?.play();
            toast.error('Enter a correct loan ID', { position: 'top-left' });
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
