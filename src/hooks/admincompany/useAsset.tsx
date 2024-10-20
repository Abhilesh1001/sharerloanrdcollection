import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { StateProps, assetType } from '@/type/type';
import { useState } from 'react';
import { soundSsuccess, soundError, soundClick } from '@/sound/sound';
import { toast } from 'react-toastify';

export const useAsset = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);
    const [assetData, setAssetData] = useState<assetType>({
        asset_no: null,
        amount_Debit: null,
        asset_name: '',
        debit_date: '',
        usersf: null,
    });

    const [vid, setVid] = useState<string>('');
    const [change, setChange] = useState('change');

    // Create asset data
    const mutationCreate = useMutation<any, any, assetType, unknown>({
        mutationFn: async (newAsset) => {
            return await axios.post(`${baseurl}adminpanel/assets/`, newAsset, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                    'Content-Type': 'application/json',
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data);
            setAssetData({
                asset_no: null,
                amount_Debit: null,
                asset_name: '',
                debit_date: '',
                usersf: null,
            });
            toast.success('Asset created successfully', { position: 'top-left' });
        },
        onError: (error) => {
            soundError?.play();
            console.log(error);
            toast.error('Error creating asset. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleSubmit = async () => {
  
        soundClick?.play();
        const newAssetData = {
            asset_no: assetData.asset_no,
            amount_Debit: assetData.amount_Debit,
            asset_name: assetData.asset_name,
            debit_date: assetData.debit_date,
            usersf: assetData.usersf,
        };

        console.log(newAssetData, 'Submitting asset');
        mutationCreate.mutate(newAssetData);
    };

    // Update asset data
    const mutationUpdate = useMutation<any, any, assetType, unknown>({
        mutationFn: async (updatedAsset: assetType) => {
            return await axios.patch(`${baseurl}adminpanel/assets/${vid}/`, updatedAsset, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            console.log(data);
            setAssetData({
                asset_no: null,
                amount_Debit: null,
                asset_name: '',
                debit_date: '',
                usersf: null,
            });
            soundSsuccess?.play();
            toast.success('Asset updated successfully', { position: 'top-left' });
        },
        onError: (error) => {
            console.log(error);
            soundError?.play();
            toast.error('Error updating asset. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleUpdate = () => {
        soundClick?.play();
        const updatedAssetData = {
            asset_no: assetData.asset_no,
            amount_Debit: assetData.amount_Debit,
            asset_name: assetData.asset_name,
            debit_date: assetData.debit_date,
            usersf: assetData.usersf,
        };

        console.log(updatedAssetData);
        mutationUpdate.mutate(updatedAssetData);
    };

    const handleCreate = () => {
        setChange('');
        soundClick?.play();
    };

    const handleChange = () => {
        setChange(`${change !== 'create' ? 'create' : null}`);
        soundClick?.play();
    };

    function handleKeyDownAssetId(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        console.log('Enter asset ID');
        if (e.key === 'Enter') {
            soundClick?.play();
            const vid = parseInt(value);
            e.preventDefault();
            mutationFetchAsset.mutate(vid);
        }
    }

    const mutationFetchAsset = useMutation<any, any, number, unknown>({
        mutationFn: async (assetId: number) => {
            return await axios.get(`${baseurl}adminpanel/assets/${assetId}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data.data, 'Fetched asset details');

            setAssetData({
                asset_no: data.data.asset_no,
                amount_Debit: data.data.amount_Debit,
                asset_name: data.data.asset_name,
                debit_date: data.data.debit_date,
                usersf: data.data.usersf,
            });
        },
        onError: () => {
            soundError?.play();
            toast.error('Enter a correct asset ID', { position: 'top-left' });
        },
    });

    return {
        assetData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownAssetId,
        vid,
        setVid,
        setAssetData,
    };
};
