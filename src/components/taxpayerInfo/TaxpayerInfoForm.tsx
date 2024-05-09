import { ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, Form, TextInput, FormGroup, Label, GridContainer, Grid, TextInputMask } from '@trussworks/react-uswds';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import {  useNavigate } from 'react-router-dom';

import { createTaxpayerInfo, updateTaxpayerInfo } from '../../api/taxpayerApi';
import { getTaxpayerInfo } from '../../api/taxpayerApi';
import { setTaxpayerInfo } from '../../features/taxpayerInfo/taxpayerInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

function TaxpayerInfoForm () {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const taxpayerInfo = useSelector((state: RootState) => state.taxpayerInfo); // get taxpayerInfo from Redux store
    const userId = useSelector((state: RootState) => state.auth.userId); // Get current logged in user Id from the Redux store

    useEffect(() => {
        getTaxpayerInfo(userId)
            .then((res) => {
                dispatch(setTaxpayerInfo({
                    ...res.data,
                    // dob : res.data.dob ? new Date(res.data.dob).toISOString().split('T')[0] : "", // FORMAT dob
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
                .then((res: any) => {
                    console.log(res);
                    dispatch(setTaxpayerInfo({ userId: res.data.userId }));
                    navigate('/UserTaxes');
                })
                .catch((err: any) => console.error('Failed updating taxpayer info:', err));
        } else {
            createTaxpayerInfo(payload)
                .then((res: { data: { userId: any; }; }) => {
                    console.log(res)
                    dispatch(setTaxpayerInfo({ userId: res.data.userId }));
                    navigate('/UserTaxes');
                })
                .catch((err: any) => console.error('Failed creating taxpayer info:', err));
        }
    };

    return   (
        <div className="bg-white">

        <GridContainer className="usa-section">

            <Grid row className="margin-x-neg-05 flex-justify-center">
                <div className="bg-white padding-y-3 padding-x-15 border border-base-lighter" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius:'8px' }}>
                    <h2>{t('taxpayerInfo.title')}</h2>
                    <Form onSubmit={handleSubmit} className="usa-form usa-form--large margin-bottom-3">
                        <Grid row gap>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="firstName">{t('taxpayerInfo.firstName.label')}</Label>
                                    <TextInput
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={taxpayerInfo.firstName}
                                        onChange={handleChange}
                                        pattern="[A-Za-z]+"
                                        title={t('taxpayerInfo.firstName.error')}
                                        placeholder="Eric"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="middleName">{t('taxpayerInfo.middleName.label')}</Label>
                                    <TextInput
                                        id="middleName"
                                        name="middleName"
                                        type="text"
                                        value={taxpayerInfo.middleName}
                                        onChange={handleChange}
                                        pattern="[A-Za-z]+"
                                        title={t('taxpayerInfo.middleName.error')}
                                        placeholder="Joe"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="lastName">{t('taxpayerInfo.lastName.label')}</Label>
                                    <TextInput
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={taxpayerInfo.lastName}
                                        onChange={handleChange}
                                        pattern="[A-Za-z]+"
                                        title={t('taxpayerInfo.lastName.error')}
                                        placeholder="Chang"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="occupation">{t('taxpayerInfo.occupation.label')}</Label>
                                    <TextInput
                                        id="occupation"
                                        name="occupation"
                                        type="text"
                                        value={taxpayerInfo.occupation}
                                        onChange={handleChange}
                                        placeholder={t('taxpayerInfo.occupation.placeholder')}
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="ssn">{t('taxpayerInfo.ssn.label')}</Label>
                                    <TextInput
                                        id='ssn'
                                        name='ssn'
                                        type='text'
                                        aria-labelledby="ssn"
                                        aria-describedby="hint-ssn"
                                        pattern="\d{3}-\d{2}-\d{4}"
                                        value={taxpayerInfo.ssn}
                                        onChange={handleChange}
                                        title={t('taxpayerInfo.ssn.error')}
                                        placeholder="123-45-6789"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="dob">{t('taxpayerInfo.dob.label')}</Label>
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
                                    <Label htmlFor="phoneNumber">{t('taxpayerInfo.phoneNumber.label')}</Label>
                                    <TextInput
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        aria-labelledby="phoneNumber"
                                        aria-describedby="hint-phoneNumber"
                                        pattern="(\d{3}-)?\d{3}-\d{4}"
                                        title={t('taxpayerInfo.phoneNumber.error')}
                                        value={taxpayerInfo.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="636-555-1234"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="street">{t('taxpayerInfo.address.street.label')}</Label>
                                    <TextInput
                                        id="street"
                                        name="address.street"
                                        type="text"
                                        value={taxpayerInfo.address.street}
                                        onChange={handleChange}
                                        placeholder="123 Tax Rd."
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="city">{t('taxpayerInfo.address.city.label')}</Label>
                                    <TextInput
                                        id="city"
                                        name="address.city"
                                        type="text"
                                        value={taxpayerInfo.address.city}
                                        onChange={handleChange}
                                        placeholder="Las Vegas"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid col={6}>
                                <FormGroup>
                                    <Label htmlFor="state">{t('taxpayerInfo.address.state.label')}</Label>
                                    <TextInput
                                        id="state"
                                        name="address.state"
                                        type="text"
                                        value={taxpayerInfo.address.state}
                                        onChange={handleChange}
                                        placeholder="Nevada"

                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <FormGroup>
                            <Label htmlFor="zip">{t('taxpayerInfo.address.zip.label')}</Label>
                            <TextInput
                                id="zip"
                                name="address.zip"
                                type="text"
                                inputSize="medium"
                                aria-labelledby="zip"
                                aria-describedby="hint-zip"
                                pattern="\d{5}"
                                title={t('taxpayerInfo.zip.error')}
                                value={taxpayerInfo.address.zip}
                                onChange={handleChange}
                                placeholder="89101"
                            />
                        </FormGroup>

                        <Button type="submit">{t('taxpayerInfo.submitButton')}</Button>
                    </Form>
                </div>
            </Grid>
        </GridContainer>
    </div>
    );

}

export default TaxpayerInfoForm;



