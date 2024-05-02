import { ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, Form, TextInput, FormGroup, Label, GridContainer, Grid } from '@trussworks/react-uswds';
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

    return   (
        <div className="bg-base-lightest">
        <GridContainer className="usa-section">
            <Grid row className="margin-x-neg-05 flex-justify-center">
                <div className="bg-white padding-y-3 padding-x-15 border border-base-lighter">
                    <h2>Tell us about yourself</h2>
                    <Form onSubmit={handleSubmit} className="usa-form usa-form--large margin-bottom-3">
                        <Grid row gap>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="firstName">First or given name</Label>
                                    <TextInput
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={taxpayerInfo.firstName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid col={6}>
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
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="lastName">Last or family name</Label>
                                    <TextInput
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={taxpayerInfo.lastName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid col={6}>
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
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="ssn">Social Security Number</Label>
                                    <TextInput
                                        id='ssn'
                                        name='ssn'
                                        type='text'
                                        value={taxpayerInfo.ssn}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid col={6}>
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
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid col={6}>
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
                            </Grid>
                            <Grid col={6}>
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
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid col={6}>
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
                            </Grid>
                            <Grid col={6}>
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
                            </Grid>
                        </Grid>

                        <FormGroup>
                            <Label htmlFor="zip">ZIP Code</Label>
                            <TextInput
                                id="zip"
                                name="address.zip"
                                type="text"
                                inputSize="medium"
                                value={taxpayerInfo.address.zip}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <Button type="submit">Save and Continue</Button>
                    </Form>
                </div>
            </Grid>
        </GridContainer>
    </div>
    );

}

export default TaxpayerInfoForm;



