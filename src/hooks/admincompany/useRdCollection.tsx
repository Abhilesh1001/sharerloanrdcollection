import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { StateProps, RDCollType } from '@/type/type';
import { useState } from 'react';
import { soundSsuccess, soundError, soundClick } from '@/sound/sound';
import { toast } from 'react-toastify';

export const useRdCollection = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);
    const [rdCollectionData, setRdCollectionData] = useState<RDCollType>({
        rd_collection_id: null,
        rd_interest: null,
        collection_date: '',
        amount_collected: null,
        remarks: '',
        usersf: null,
    });

    const [vid, setVid] = useState<string>('');
    const [change, setChange] = useState('change');

    // Create RD collection data
    const mutationCreate = useMutation<any, any, RDCollType, unknown>({
        mutationFn: async (newRdCollection) => {
            return await axios.post(`${baseurl}adminpanel/rdcollscompany/`, newRdCollection, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                    'Content-Type': 'application/json',
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data);
            setRdCollectionData({
                rd_collection_id: null,
                rd_interest: null,
                collection_date: '',
                amount_collected: null,
                remarks: '',
                usersf: null,
            });
            toast.success('RD collection created successfully', { position: 'top-left' });
        },
        onError: (error) => {
            soundError?.play();
            console.log(error);
            toast.error('Error creating RD collection. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleSubmit = async () => {
        soundClick?.play();
        const newRdCollectionData = {
            ...rdCollectionData,
        };

        console.log(newRdCollectionData, 'Submitting RD collection');
        mutationCreate.mutate(newRdCollectionData);
    };

    // Update RD collection data
    const mutationUpdate = useMutation<any, any, RDCollType, unknown>({
        mutationFn: async (updatedRdCollection: RDCollType) => {
            return await axios.patch(`${baseurl}adminpanel/rdcollscompany/${vid}/`, updatedRdCollection, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            console.log(data);
            setRdCollectionData({
                rd_collection_id: null,
                rd_interest: null,
                collection_date: '',
                amount_collected: null,
                remarks: '',
                usersf: null,
            });
            soundSsuccess?.play();
            toast.success('RD collection updated successfully', { position: 'top-left' });
        },
        onError: (error) => {
            console.log(error);
            soundError?.play();
            toast.error('Error updating RD collection. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleUpdate = () => {
        soundClick?.play();
        const updatedRdCollectionData = {
            ...rdCollectionData,
        };

        console.log(updatedRdCollectionData);
        mutationUpdate.mutate(updatedRdCollectionData);
    };

    const handleCreate = () => {
        setChange('create');
        soundClick?.play();
    };

    const handleChange = () => {
        setChange(change !== 'create' ? 'create' : 'change');
        soundClick?.play();
    };

    function handleKeyDownLoanCollectionId(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        console.log('Enter RD collection ID');
        if (e.key === 'Enter') {
            soundClick?.play();
            const vid = parseInt(value);
            e.preventDefault();
            mutationFetchRdCollection.mutate(vid);
        }
    }

    const mutationFetchRdCollection = useMutation<any, any, number, unknown>({
        mutationFn: async (rdCollectionId: number) => {
            return await axios.get(`${baseurl}adminpanel/rdcollscompany/${rdCollectionId}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data.data, 'Fetched RD collection details');

            setRdCollectionData({
                rd_collection_id: data.data.rd_collection_id,
                rd_interest: data.data.rd_interest,
                collection_date: data.data.collection_date,
                amount_collected: data.data.amount_collected,
                remarks: data.data.remarks,
                usersf: data.data.usersf,
            });
        },
        onError: () => {
            soundError?.play();
            toast.error('Enter a correct RD collection ID', { position: 'top-left' });
        },
    });

    return {
        rdCollectionData,
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
        setRdCollectionData,
    };
};
