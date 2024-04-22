import apiClient from './index';

interface TaxpayerInfo {
    userId?: number,
    firstName: string,
    middleName: string,
    lastName: string,
    occupation: string,
    ssn: string,
    dob: string,
    phoneNumber: string,
    address: string
};

export const getTaxpayerInfo = (taxpayerId: number) => {
    return apiClient.get(`/taxpayer-info/${taxpayerId}`);
}

export const createTaxpayerInfo = (taxpayerInfo: TaxpayerInfo) => {
    return apiClient.post('/taxpayer-info/add', taxpayerInfo);
}

export const updateTaxpayerInfo = (taxpayerInfo: TaxpayerInfo) => {
    return apiClient.put('/taxpayer-info/update', taxpayerInfo);
}
