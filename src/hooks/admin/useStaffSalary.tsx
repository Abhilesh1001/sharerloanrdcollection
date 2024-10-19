import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { StateProps, staffSalryType } from '@/type/type';
import { useState } from 'react';
import { soundSsuccess, soundError, soundClick } from '@/sound/sound';
import { toast } from 'react-toastify';

export const useStaffSalary = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);
    const [staffSalaryData, setStaffSalaryData] = useState<staffSalryType>({
        sd_id: null,
        person: null,
        usersf: null,
        amount_Debit: null,
        collection_date: '',
        remarks: '',
    });

    const [vid, setVid] = useState<string>('');
    const [change, setChange] = useState('change');

    // Create staff salary data
    const mutationCreate = useMutation<any, any, staffSalryType, unknown>({
        mutationFn: async (newStaffSalary) => {
            return await axios.post(`${baseurl}adminpanel/staffsalaries/`, newStaffSalary, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data);
            setStaffSalaryData({
                sd_id: null,
                person: null,
                usersf: null,
                amount_Debit: null,
                collection_date: '',
                remarks: '',
            });
            toast.success('Staff salary created successfully', { position: 'top-left' });
        },
        onError: (error) => {
            soundError?.play();
            console.log(error);
            toast.error('Error creating staff salary. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleSubmit = async () => {
        soundClick?.play();
        const newStaffSalaryData: staffSalryType = {
            ...staffSalaryData,
        };

        console.log(newStaffSalaryData, 'Submitting staff salary');
        mutationCreate.mutate(newStaffSalaryData);
    };

    // Update staff salary data
    const mutationUpdate = useMutation<any, any, staffSalryType, unknown>({
        mutationFn: async (updatedStaffSalary: staffSalryType) => {
            return await axios.patch(`${baseurl}adminpanel/staffsalaries/${vid}/`, updatedStaffSalary, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            console.log(data);
            setStaffSalaryData({
                sd_id: null,
                person: null,
                usersf: null,
                amount_Debit: null,
                collection_date: '',
                remarks: '',
            });
            soundSsuccess?.play();
            toast.success('Staff salary updated successfully', { position: 'top-left' });
        },
        onError: (error) => {
            console.log(error);
            soundError?.play();
            toast.error('Error updating staff salary. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleUpdate = () => {
        soundClick?.play();
        const updatedStaffSalaryData: staffSalryType = {
            ...staffSalaryData,
        };

        console.log(updatedStaffSalaryData);
        mutationUpdate.mutate(updatedStaffSalaryData);
    };

    const handleCreate = () => {
        setChange('create');
        soundClick?.play();
    };

    const handleChange = () => {
        setChange(change !== 'create' ? 'create' : '');
        soundClick?.play();
    };

    function handleKeyDownstaffSalaryId(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        console.log('Enter staff salary ID');
        if (e.key === 'Enter') {
            soundClick?.play();
            const vid = parseInt(value);
            e.preventDefault();
            mutationFetchStaffSalary.mutate(vid);
        }
    }

    const mutationFetchStaffSalary = useMutation<any, any, number, unknown>({
        mutationFn: async (staffSalaryId: number) => {
            return await axios.get(`${baseurl}adminpanel/staffsalaries/${staffSalaryId}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data.data, 'Fetched staff salary details');

            setStaffSalaryData({
                sd_id: data.data.sd_id,
                person: data.data.person,
                usersf: data.data.usersf,
                amount_Debit: data.data.amount_Debit,
                collection_date: data.data.collection_date,
                remarks: data.data.remarks,
            });
        },
        onError: () => {
            soundError?.play();
            toast.error('Enter a correct staff salary ID', { position: 'top-left' });
        },
    });

    return {
        staffSalaryData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownstaffSalaryId,
        vid,
        setVid,
        setStaffSalaryData,
    };
};
