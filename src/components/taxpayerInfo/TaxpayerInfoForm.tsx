import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Button, Form, TextInput, FormGroup, Label, Textarea, Fieldset, DatePicker, Select, RequiredMarker } from '@trussworks/react-uswds';
import { createTaxpayerInfo, updateTaxpayerInfo } from '../../api/taxpayerApi';
import { getTaxpayerInfo } from '../../api/taxpayerApi';
import { setTaxpayerInfo } from '../../features/taxpayerInfo/taxpayerInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

function TaxpayerInfoForm () {

    const dispatch = useDispatch();
    const taxpayerInfo = useSelector((state: RootState) => state.taxpayerInfo); // get taxpayerInfo from Redux store
    const userId = useSelector((state: RootState) => state.auth.userId); // Get current logged in user Id from the Redux store

    useEffect(() => {
        getTaxpayerInfo(userId)
            .then((res) => {
                dispatch(setTaxpayerInfo({
                    ...res.data,
                    dob : res.data.dob ? new Date(res.data.dob).toISOString().split('T')[0] : "", // FORMAT dob
                    address: res.data.address ? JSON.parse(res.data.address) : ""}));
            })
            .catch((err) => console.error(err));
    }, [dispatch, userId]);

    useEffect(() => {
        console.log("TaxpayerInfo from Redux:", taxpayerInfo);
    }, [taxpayerInfo]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
        const { name, value } = e.target;
        const updateTaxpayerInfo = { ...taxpayerInfo, [name]: value };
        // this if/else statement is used to handle nested address
        if (name.startsWith('address.')) {
            const addressKey = name.split('.')[1];
            updateTaxpayerInfo.address = { ...taxpayerInfo.address, [addressKey]: value };
        }
        dispatch(setTaxpayerInfo(updateTaxpayerInfo));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // need to serialize address object to JSON string before sending to API
        const payload = {
            ...taxpayerInfo,
            address: JSON.stringify(taxpayerInfo.address)
        };

        if (taxpayerInfo.userId) {
            updateTaxpayerInfo(payload)
                .then((res: any) => console.log(res))
                .catch((err: any) => console.error('Failed updating taxpayer info:', err));
        } else {
            createTaxpayerInfo(payload)
                .then((res: { data: { userId: any; }; }) => {
                    console.log(res)
                    dispatch(setTaxpayerInfo({ ...taxpayerInfo, userId: res.data.userId }));
                })
                .catch((err: any) => console.error('Failed creating taxpayer info:', err));
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <TextInput
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={taxpayerInfo.firstName}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="middleName">Middle Name</Label>
                <TextInput
                    id="middleName"
                    name="middleName"
                    type="text"
                    value={taxpayerInfo.middleName}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <TextInput
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={taxpayerInfo.lastName}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="occupation">Occupation</Label>
                <TextInput
                    id="occupation"
                    name="occupation"
                    type="text"
                    value={taxpayerInfo.occupation}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="ssn">SSN</Label>
                <TextInput
                    id='ssn'
                    name='ssn'
                    type='text'
                    value={taxpayerInfo.ssn}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="dob">Date of Birth</Label>
                <input
                    id="dob"
                    name="dob"
                    type="date"
                    className="usa-input"
                    value={taxpayerInfo.dob}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <TextInput
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={taxpayerInfo.phoneNumber}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="street">Street</Label>
                <TextInput
                    id="street"
                    name="address.street"
                    type="text"
                    value={taxpayerInfo.address.street}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="city">City</Label>
                <TextInput
                    id="city"
                    name="address.city"
                    type="text"
                    value={taxpayerInfo.address.city}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="state">State</Label>
                <TextInput
                    id="state"
                    name="address.state"
                    type="text"
                    value={taxpayerInfo.address.state}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="zip">ZIP Code</Label>
                <TextInput
                    id="zip"
                    name="address.zip"
                    type="text"
                    value={taxpayerInfo.address.zip}
                    onChange={handleChange}
                />
            </FormGroup>
            {/* <Fieldset legend="Name" legendStyle="large">
                <Label htmlFor="first-name">First or given name</Label>
                <span className="usa-hint">For example, Jose, Darren, or Mai</span>
                <TextInput id="first-name" name="first-name" type="text" value={taxpayerInfo.firstName} onChange={handleChange}/>

                <Label htmlFor="middle-name">Middle name</Label>
                <TextInput id="middle-name" name="middle-name" type="text" value={taxpayerInfo.middleName} onChange={handleChange} />

                <Label htmlFor="last-name">Last or family name</Label>
                <span className="usa-hint">
                    For example, Martinez Gonzalez, Gu, or Smith
                </span>
                <TextInput id="last-name" name="last-name" type="text" value={taxpayerInfo.lastName}onChange={handleChange}/>

                <Label htmlFor="occupation">Occupation</Label>
                <TextInput id="occupation" name="occupation" type="text" value={taxpayerInfo.occupation} onChange={handleChange} />

                <Label htmlFor="ssn">Social Security Number</Label>
                <TextInput id="ssn" name="ssn" type="text" value={taxpayerInfo.ssn} onChange={handleChange} />

                <Label htmlFor="dob">Date of Birth</Label>
                <input
                    id="dob"
                    name="dob"
                    type="date"
                    className="usa-input"
                    value={taxpayerInfo.dob}
                    onChange={handleChange}
                />

                <Label htmlFor="phoneNumber">Phone Number</Label>
                <TextInput
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={taxpayerInfo.phoneNumber}
                    onChange={handleChange}
                />

            </Fieldset>

            <Fieldset legend="Address" legendStyle="large">

                <Label htmlFor="street">Street</Label>
                <TextInput
                    id="street"
                    name="address.street"
                    type="text"
                    value={taxpayerInfo.address.street}
                    onChange={handleChange}
                />

                <Label htmlFor="city">
                    City
                </Label>

                <TextInput
                    id="city"
                    name="address.city"
                    type="text"
                    value={taxpayerInfo.address.city}
                    onChange={handleChange}
                />

                <Label htmlFor="state">State</Label>
                <TextInput
                    id="state"
                    name="address.state"
                    type="text"
                    value={taxpayerInfo.address.state}
                    onChange={handleChange}
                />

                <Label htmlFor="zip">ZIP Code</Label>
                <TextInput id="zip" name="zip" type="text" inputSize="medium" pattern="[\d]{5}(-[\d]{4})?" value={taxpayerInfo.address.zip} onChange={handleChange}/>

            </Fieldset> */}

            <Button type="submit">Save and Continue</Button>
        </Form>
    );

}

export default TaxpayerInfoForm;



