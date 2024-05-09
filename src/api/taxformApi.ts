import axios from 'axios';
import apiClient from './index';

interface TaxForm {
    taxFormId? : number,
    user: number,
    status : string,
    formType : string,
    formDetails : string
}

// const apiClientJJ = axios.create({
//     // hiding the URL in the .env file
//     baseURL: `${import.meta.env.VITE_REACT_URL}`,
//     headers: {
//         'Content-Type': 'application/json',
//       }
// });

export const getTaxFormInfo = (taxFormId: number) => {
    return apiClient.get(`/taxform/taxes/form/${taxFormId}`);
}

export const createTaxForm = (taxForm : TaxForm) => {
    return apiClient.post(`/taxform/create`, taxForm);
}

export const updateTaxForm = (taxForm : TaxForm) => {
    return apiClient.put(`/taxform/taxes/update`, taxForm);
}

export const getTaxForms = (userId: number) => {
    return apiClient.get(`/taxform/taxes/form/${userId}`);
}