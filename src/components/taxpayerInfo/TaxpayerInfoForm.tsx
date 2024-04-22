import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Button, Form, TextInput, FormGroup, Label, Textarea } from '@trussworks/react-uswds';
import { createTaxpayerInfo, updateTaxpayerInfo } from '../../api/taxpayerApi';
import { getTaxpayerInfo } from '../../api/taxpayerApi';
import { setTaxpayerInfo, TaxpayerInfoState } from '../../features/taxpayerInfo/taxpayerInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface TaxpayerFormData {
    userId?: number;
    firstName: string;
    middleName: string;
    lastName: string;
    occupation: string;
    ssn: string;
    dob: string;
    phoneNumber: string;
    address: Address
}

interface TaxpayerInfoFormProps {
    taxpayerInfo?: TaxpayerFormData | null;
}

function TaxpayerInfoForm () {

    const dispatch = useDispatch();
    const taxpayerInfo = useSelector((state: RootState) => state.taxpayerInfo);;
    const userIdTemp = 2; // temp userId for testing/development

    const [taxpayerFormData, setTaxpayerFormData] = useState(taxpayerInfo || { // Initialize formData with initData or set default values
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
        },
    });

    useEffect(() => {
        getTaxpayerInfo(userIdTemp)
            .then((res) => {
                const formatData = {
                    ...res.data,
                    dob: new Date(res.data.dob).toISOString().split('T')[0], // Converts date of birth from the response to ISO string format, get the date part only to show in the front end
                    address: JSON.parse(res.data.address), // parse address string to object
                }
                dispatch(setTaxpayerInfo(formatData));
            })
            .catch((err) => console.error(err));
    }, [dispatch]);

    useEffect(() => {
        console.log("Initial taxpayerInfo from Redux:", taxpayerInfo);
    }, [taxpayerInfo]);

    useEffect(() => {
        if (taxpayerInfo) {
            setTaxpayerFormData(taxpayerInfo);
        }
    }, [taxpayerInfo]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        // this if/else statement is used to handle nested address object
        if (name.startsWith('address.')) {
            const addressKey = name.split('.')[1];
            setTaxpayerFormData(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [addressKey]: value
                }
            }));
        } else {
            // hanbdle all other form fields
            setTaxpayerFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // need to serialize address object to JSON string before sending to API
        const payload = {
            ...taxpayerFormData,
            address: JSON.stringify(taxpayerFormData.address)
        };

        if (taxpayerFormData.userId) {
            updateTaxpayerInfo(payload)
                .then((res: any) => console.log(res))
                .catch((err: any) => console.error('Failed updating taxpayer info:', err));
        } else {
            createTaxpayerInfo(payload)
                .then((res: { data: { userId: any; }; }) => {
                    console.log(res)
                    setTaxpayerFormData({ ...taxpayerFormData, userId: res.data.userId });
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
                    value={taxpayerFormData.firstName}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="middleName">Middle Name</Label>
                <TextInput
                    id="middleName"
                    name="middleName"
                    type="text"
                    value={taxpayerFormData.middleName}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <TextInput
                    id="LastName"
                    name="lastName"
                    type="text"
                    value={taxpayerFormData.lastName}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="occupation">Occupation</Label>
                <TextInput
                    id="occupation"
                    name="occupation"
                    type="text"
                    value={taxpayerFormData.occupation}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="ssn">SSN</Label>
                <TextInput
                    id='ssn'
                    name='ssn'
                    type='text'
                    value={taxpayerFormData.ssn}
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
                    value={taxpayerFormData.dob}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <TextInput
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={taxpayerFormData.phoneNumber}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="street">Street</Label>
                <TextInput
                    id="street"
                    name="address.street"
                    type="text"
                    value={taxpayerFormData.address.street}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="city">City</Label>
                <TextInput
                    id="city"
                    name="address.city"
                    type="text"
                    value={taxpayerFormData.address.city}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="state">State</Label>
                <TextInput
                    id="state"
                    name="address.state"
                    type="text"
                    value={taxpayerFormData.address.state}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="zip">ZIP Code</Label>
                <TextInput
                    id="zip"
                    name="address.zip"
                    type="text"
                    value={taxpayerFormData.address.zip}
                    onChange={handleChange}
                />
            </FormGroup>
            <Button type="submit">Submit</Button>
        </Form>
    );

}

export default TaxpayerInfoForm;



