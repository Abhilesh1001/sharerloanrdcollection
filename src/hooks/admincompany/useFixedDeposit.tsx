import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { StateProps, FixedDepositeType } from '@/type/type';
import { useState } from 'react';
import { soundSsuccess, soundError, soundClick } from '@/sound/sound';
import { toast } from 'react-toastify'; // Corrected import for toast

export const useFixedDeposit = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);
    const [fixedDepositData, setFixedDepositData] = useState<FixedDepositeType>({fd_id: null,usersf: null,amount_Debit:null,amount_credit:null,collection_date:'',start_date:'',closing_date:'',duration:null,interest_rate:null,is_active:true});

    const [vid, setVid] = useState<string>('');
    const [change, setChange] = useState('change');

    // Create fixed deposit data
    const mutationCreate = useMutation<any, any, FixedDepositeType, unknown>({
        mutationFn: async (newFixedDeposit) => {
            return await axios.post(`${baseurl}adminpanel/fixeddepositscompany/`, newFixedDeposit, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                    'Content-Type': 'application/json',
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data);
            setFixedDepositData({fd_id: null,usersf: null,amount_Debit:null,amount_credit:null,collection_date:'',start_date:'',closing_date:'',duration:null,interest_rate:null,is_active:true});
            toast.success('Fixed Deposit created successfully', { position: 'top-left' });
        },
        onError: (error) => {
            soundError?.play();
            console.log(error);
            toast.error('Error creating fixed deposit. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleSubmit = async () => {
        soundClick?.play();
        const newFixedDepositData = {
            ...fixedDepositData,
        };

        console.log(newFixedDepositData, 'Submitting fixed deposit');
        mutationCreate.mutate(newFixedDepositData);
    };

    // Update fixed deposit data
    const mutationUpdate = useMutation<any, any, FixedDepositeType, unknown>({
        mutationFn: async (updatedFixedDeposit: FixedDepositeType) => {
            return await axios.patch(`${baseurl}adminpanel/fixeddepositscompany/${vid}/`, updatedFixedDeposit, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            console.log(data);
            setFixedDepositData({fd_id: null,usersf: null,amount_Debit:null,amount_credit:null,collection_date:'',start_date:'',closing_date:'',duration:null,interest_rate:null,is_active:true});
            soundSsuccess?.play();
            toast.success('Fixed Deposit updated successfully', { position: 'top-left' });
        },
        onError: (error) => {
            console.log(error);
            soundError?.play();
            toast.error('Error updating fixed deposit. Please fill all required fields.', { position: 'top-left' });
        },
    });

    const handleUpdate = () => {
        soundClick?.play();
        const updatedFixedDepositData = {
            ...fixedDepositData,
        };

        console.log(updatedFixedDepositData);
        mutationUpdate.mutate(updatedFixedDepositData);
    };

    const handleCreate = () => {
        setChange('create');
        soundClick?.play();
    };

    const handleChange = () => {
        setChange(change !== 'create' ? 'create' : '');
        soundClick?.play();
    };

    function handleKeyDownFDId(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        console.log('Enter fixed deposit ID');
        if (e.key === 'Enter') {
            soundClick?.play();
            const vid = parseInt(value);
            e.preventDefault();
            mutationFetchFixedDeposit.mutate(vid);
        }
    }

    const mutationFetchFixedDeposit = useMutation<any, any, number, unknown>({
        mutationFn: async (fixedDepositId: number) => {
            return await axios.get(`${baseurl}adminpanel/fixeddepositscompany/${fixedDepositId}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
        },
        onSuccess: (data) => {
            soundSsuccess?.play();
            console.log(data.data, 'Fetched fixed deposit details');

            setFixedDepositData({
                fd_id: data.data.fd_id,
                person: data.data.person,
                usersf: data.data.usersf,
                amount_Debit: data.data.amount_Debit,
                amount_credit: data.data.amount_credit,
                collection_date :data.data.collection_date,
                start_date: data.data.start_date,
                closing_date: data.data.closing_date,
                duration: data.data.duration,
                interest_rate: data.data.interest_rate,
                is_active: data.data.is_active,
            });
        },
        onError: () => {
            soundError?.play();
            toast.error('Enter a correct fixed deposit ID', { position: 'top-left' });
        },
    });

    return {
        fixedDepositData,
        change,
        handleCreate,
        handleChange,
        handleUpdate,
        mutationCreate,
        mutationUpdate,
        handleSubmit,
        handleKeyDownFDId,
        vid,
        setVid,
        setFixedDepositData,
    };
};
