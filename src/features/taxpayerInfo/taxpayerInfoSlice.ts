import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface TaxpayerInfoState {
    userId: number,
    firstName: string,
    middleName: string,
    lastName: string,
    occupation: string,
    ssn: string,
    dob: string, // (YYYY-MM-DD)
    phoneNumber: string,
    address: Address
};

const initialState: TaxpayerInfoState = {
    userId: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    occupation: '',
    ssn: '',
    dob: '',
    phoneNumber: '',
    address: {
        street: '',
        city: '',
        state: '',
        zip: ''
    }
};

export const taxpayerInfoSlice = createSlice({
    name: 'taxpayerInfo',
    initialState,
    reducers: {
        setTaxpayerInfo: (state, action: PayloadAction<Partial<TaxpayerInfoState>>) => {
            return { ...state, ...action.payload };
        },
        resetTaxPayInfo: () => initialState,
    }
});

export const { setTaxpayerInfo, resetTaxPayInfo } = taxpayerInfoSlice.actions;

export default taxpayerInfoSlice.reducer;