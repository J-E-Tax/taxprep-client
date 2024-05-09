import axios from 'axios';

interface TaxForm {
    taxFormId? : number,
    user: number,
    status : string,
    formType : string,
    formDetails : string
}

const apiClientJJ = axios.create({
    // hiding the URL in the .env file
    baseURL: `${import.meta.env.VITE_REACT_URL}`,
    headers: {
        'Content-Type': 'application/json',
      }
});

export const getTaxFormInfo = (taxFormId: number) => {
    return apiClientJJ.get(`/taxform/taxes/form/${taxFormId}`);
}

export const createTaxForm = (taxForm : TaxForm) => {
    return apiClientJJ.post(`/taxform/create`, taxForm);
}

export const updateTaxForm = (taxForm : TaxForm) => {
    return apiClientJJ.put(`/taxform/taxes/update`, taxForm);
}

export const getTaxForms = (userId: number) => {
    return apiClientJJ.get(`/taxform/taxes/form/${userId}`);
}