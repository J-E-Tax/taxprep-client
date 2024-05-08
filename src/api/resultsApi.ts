import apiClient from './index';

export const getTaxFormsByUserId = (userId: number) => {
    return apiClient.get(`/tax-return/user/${userId}`);
}

export const calculateAndSaveTaxReturnsForUser = (userId: number) => {
    return apiClient.post(`/tax-return/calculateTaxReturn/${userId}`);
}
