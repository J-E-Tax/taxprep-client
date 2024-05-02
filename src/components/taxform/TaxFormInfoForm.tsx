import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Button, Form, TextInput, FormGroup, Label, Textarea, Fieldset, DatePicker, Select, RequiredMarker, StepIndicator, StepIndicatorStep } from '@trussworks/react-uswds';
import { createTaxForm, updateTaxForm } from '../../api/taxformApi';
import { getTaxFormInfo } from '../../api/taxformApi';
import { RootState } from '../../app/store';
import { setTaxFormInfo } from '../../features/taxforminfo/taxformInfoSlice';


function TaxFormInfoForm () {
    const dispatch = useDispatch();

    const {formID} = useParams();
    //console.log("before If Statement", formID)

    if(formID != undefined){
        //console.log("Entered If Statement")
        useEffect(() => {
        getTaxFormInfo(parseInt(formID, 10))
        .then((res) => {
            dispatch(setTaxFormInfo({
                ...res.data,
                formDetails: res.data.formDetails ? JSON.parse(res.data.formDetails) : ""}));
        })
                .catch((err: any) => console.error('Failed updating tax form:', err));
    
    }, [dispatch, formID]);
}

    

    

    const taxformInfo = useSelector((state: RootState) => state.taxformInfo); // get taxformInfo from Redux store
    
    useEffect(() => {
        console.log("TaxformInfo from Redux:", taxformInfo);
    }, [taxformInfo]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
        const { name, value } = e.target;
        const updateTaxForm = { ...taxformInfo, [name]: value };
        // this if/else statement is used to handle nested address
        if (name.startsWith('formDetails.')) {
            const formKey = name.split('.')[1];
            updateTaxForm.formDetails = { ...taxformInfo.formDetails, [formKey]: value };
        }
        dispatch(setTaxFormInfo(updateTaxForm));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // need to serialize address object to JSON string before sending to API
        const payload = {
            ...taxformInfo,
            formDetails: JSON.stringify(taxformInfo.formDetails)
        };

        if (taxformInfo.taxFormId) {
            updateTaxForm(payload)
                .then((res: any) => console.log(res))
                .catch((err: any) => console.error('Failed updating tax form:', err));
        } else {
            createTaxForm(payload)
                .then((res: { data: { taxFormId: any; }; }) => {
                    console.log(res)
                    dispatch(setTaxFormInfo({ ...taxformInfo, taxFormId: res.data.taxFormId }));
                })
                .catch((err: any) => console.error('Failed creating tax form', err));
        }
    };
    return (
        <>
        <StepIndicator
            headingLevel="h4"
            ofText="of"
            stepText="Step"
        >
        <StepIndicatorStep
            label="Personal information"
            status="complete"
        />
        <StepIndicatorStep
            label="Household status"
            status="complete"
        />
        <StepIndicatorStep
            label="Supporting documents"
            status="current"
        />
        <StepIndicatorStep label="Signature" />
        <StepIndicatorStep label="Review and submit" />

        </StepIndicator>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="userID">UserID</Label>
                <TextInput
                    id="user_id"
                    name="user"
                    type="text"
                    defaultValue={taxformInfo.user}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="Status">Status</Label>
                <TextInput
                    id="status"
                    name="status"
                    type="text"
                    defaultValue={taxformInfo.status}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="formType">Form Type</Label>
                <TextInput
                    id="formType"
                    name="formType"
                    type="text"
                    defaultValue={taxformInfo.formType}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="ssn">Social Security Number</Label>
                <TextInput
                    id="ssn"
                    name="formDetails.a"
                    type="text"
                    defaultValue={taxformInfo.formDetails.a}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="ein">Employer Identification Number</Label>
                <TextInput
                    id='ein'
                    name='formDetails.b'
                    type='text'
                    defaultValue={taxformInfo.formDetails.b}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="eaddress">Employer's name, address, and ZIP</Label>
                <input
                    id="eaddress"
                    name="formDetails.c"
                    type="text"
                    //className="text"
                    defaultValue={taxformInfo.formDetails.c}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="controlNumber">control number</Label>
                <TextInput
                    id="controlNumber"
                    name="formDetails.d"
                    type="text"
                    defaultValue={taxformInfo.formDetails.d}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="flname">Employee's first and last name</Label>
                <TextInput
                    id="flname"
                    name="formDetails.e"
                    type="text"
                    defaultValue={taxformInfo.formDetails.e}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="address">Employee's address and ZIP code</Label>
                <TextInput
                    id="address"
                    name="formDetails.f"
                    type="text"
                    defaultValue={taxformInfo.formDetails.f}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="wtc">Wages, Tips, Compensation</Label>
                <TextInput
                    id="wtc"
                    name="formDetails.l1"
                    type="text"
                    defaultValue={taxformInfo.formDetails.l1}
                    onChange={handleChange}
                />
            </FormGroup>
            <Button type="submit">Save and Continue</Button>
        </Form>
        </>
    )
}

export default TaxFormInfoForm;
