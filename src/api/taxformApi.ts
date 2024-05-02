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
    baseURL: "http://localhost:8080/taxform",
    headers: {
        'Content-Type': 'application/json',
      }
});

export const getTaxFormInfo = (taxFormId: number) => {
    return apiClientJJ.get(`/taxes/form/${taxFormId}`);
}

export const createTaxForm = (taxForm : TaxForm) => {
    return apiClientJJ.post(`/create`, taxForm);
}

export const updateTaxForm = (taxForm : TaxForm) => {
    return apiClientJJ.put(`/taxes/update`, taxForm);
}