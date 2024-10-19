import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { StateProps, shareholderType } from '@/type/type';
import { useState } from 'react';
import { soundSsuccess, soundError, soundClick } from '@/sound/sound';
import { toast } from 'react-toastify';

export const useShareHolder = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);
    const [shareHolderData, setShareHolderData] = useState<shareholderType>({
        shf_id: null,
        person: null,
        uusersf: null,
        amount_credit: null,
        amount_Debit: null,
        collection_date: '',
        particulars: '',
    });

    const [vid, setVid] = useState<string>('');
    const [change, setChange] = useState('change');

    // Create shareholder data
    const mutationCreate = useMutation<any, any, shareholderType, unknown>({
        mutationFn: async (newShareHolder) => {
            return await axios.post(`${baseurl}adminpanel/shareholders/`, newShareHolder, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data);
            setShareHolderData({
                shf_id: null,
                person: null,
                uusersf: null,
                amount_credit: null,
                amount_Debit: null,
                collection_date: '',
                particulars: '',
                time: '',
            });
            toast.success('Shareholder created successfully', { position: 'top-left' });
        },
        onError: (error) => {
            soundError?.play();
            console.log(error);
            toast.error('Error creating shareholder. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleSubmit = async () => {
        soundClick?.play();
        const newShareHolderData: shareholderType = {
            ...shareHolderData,
        };

        console.log(newShareHolderData, 'Submitting shareholder');
        mutationCreate.mutate(newShareHolderData);
    };

    // Update shareholder data
    const mutationUpdate = useMutation<any, any, shareholderType, unknown>({
        mutationFn: async (updatedShareHolder: shareholderType) => {
            return await axios.patch(`${baseurl}adminpanel/shareholders/${vid}/`, updatedShareHolder, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            console.log(data);
            setShareHolderData({
                shf_id: null,
                person: null,
                uusersf: null,
                amount_credit: null,
                amount_Debit: null,
                collection_date: '',
                particulars: '',
                time: '',
            });
            soundSsuccess?.play();
            toast.success('Shareholder updated successfully', { position: 'top-left' });
        },
        onError: (error) => {
            console.log(error);
            soundError?.play();
            toast.error('Error updating shareholder. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleUpdate = () => {
        soundClick?.play();
        const updatedShareHolderData: shareholderType = {
            ...shareHolderData,
        };

        console.log(updatedShareHolderData);
        mutationUpdate.mutate(updatedShareHolderData);
    };

    const handleCreate = () => {
        setChange('create');
        soundClick?.play();
    };

    const handleChange = () => {
        setChange(change !== 'create' ? 'create' : '');
        soundClick?.play();
    };

    function handleKeyDownShareholderId(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        console.log('Enter shareholder ID');
        if (e.key === 'Enter') {
            soundClick?.play();
            const vid = parseInt(value);
            e.preventDefault();
            mutationFetchShareholder.mutate(vid);
        }
    }

    const mutationFetchShareholder = useMutation<any, any, number, unknown>({
        mutationFn: async (shareholderId: number) => {
            return await axios.get(`${baseurl}adminpanel/shareholders/${shareholderId}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data.data, 'Fetched shareholder details');

            setShareHolderData({
                shf_id: data.data.shf_id,
                person: data.data.person,
                uusersf: data.data.uusersf,
                amount_credit: data.data.amount_credit,
                amount_Debit: data.data.amount_Debit,
                collection_date: data.data.collection_date,
                particulars: data.data.particulars,
                time: data.data.time,
            });
        },
        onError: () => {
            soundError?.play();
            toast.error('Enter a correct shareholder ID', { position: 'top-left' });
        },
    });

    return {
        shareHolderData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownShareholderId,
        vid,
        setVid,
        setShareHolderData,
    };
};
