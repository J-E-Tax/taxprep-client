import { ChangeEvent, FormEvent, useState, useEffect, FocusEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, TextInput, FormGroup, Label, Textarea, Fieldset, DatePicker, Select, RequiredMarker, StepIndicator, StepIndicatorStep, CardGroup, CardHeader, CardBody, CardFooter, Card, GridContainer, Grid, Accordion   } from '@trussworks/react-uswds';
import { createTaxForm, updateTaxForm } from '../../api/taxformApi';
import { getTaxFormInfo } from '../../api/taxformApi';
import { RootState } from '../../app/store';
import { setTaxFormInfo, TaxFormInfoState } from '../../features/taxforminfo/taxformInfoSlice';
import { TextInputProps } from '@trussworks/react-uswds/lib/components/forms/TextInput/TextInput';
import { useTranslation } from 'react-i18next';

// function selectTaxForm () {
//     const {formType, formID} = useParams();
//     const taxformInfo = useSelector((state: RootState) => state.taxformInfo); // get taxformInfo from Redux store
// }


function TaxFormInfoForm () {
    const dispatch = useDispatch();
    const {formType, formID} = useParams();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const { t } = useTranslation();
    console.log("before If Statement", formID)
    
    const [currentStep, setCurrentStep] = useState<number>(0); 
    const [shouldRerender, setShouldRerender] = useState<boolean>(false);
    useEffect(() => {
        //fetchData(); // Fetch data when component mounts
      }, [shouldRerender]); // Re-run effect when shouldRerender state changes
    
      useEffect(() => {
        // Automatically trigger a single re-render after component mounts
        const timer = setTimeout(() => {
          setShouldRerender(true);
        }, 1000); // Adjust the delay (in milliseconds) as needed
    
        return () => clearTimeout(timer); // Cleanup timer on component unmount
      }, []); // Run only once on component mount
    //console.log("Entered If Statement")
    useEffect(() => {
        if(formID != undefined){
            getTaxFormInfo(parseInt(formID, 10))
            .then((res) => {
                dispatch(setTaxFormInfo({
                    ...res.data,
                    formDetails: res.data.formDetails ? JSON.parse(res.data.formDetails) : ""}));
            })
                    .catch((err: any) => console.error('Failed updating tax form:', err));

        } 
    },[dispatch, formID]);


    

    

    const taxformInfo = useSelector((state: RootState) => state.taxformInfo); // get taxformInfo from Redux store

    // if (formType === "w2"){
    //     taxformInfo.formType = formType;
    // }
    // else{
    //     taxformInfo.formType = "1099";
    // }
    
    useEffect(() => {
        console.log("TaxformInfo from Redux:", taxformInfo);
    }, [taxformInfo]);

     let updateTaxForm1: TaxFormInfoState = {...taxformInfo};

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
        e.preventDefault();
        const { name, value } = e.target;

        console.log("Inside Handle CHange")
        //const updateTaxForm = { ...taxformInfo, [name]: value };
        // this if/else statement is used to handle nested address
        const updatedTaxFormInfo: TaxFormInfoState = {
            ...taxformInfo,
            [name]: value,
            // Handle nested formDetails
            ...(name.startsWith('formDetails.')
              ? { formDetails: { ...taxformInfo.formDetails, [name.split('.')[1]]: value } }
              : {}),
          };
        updateTaxForm1 = updatedTaxFormInfo;
        console.log(updateTaxForm1);
        console.log(updatedTaxFormInfo);
    };
    const [ein, setEIN] = useState<string>('');
    const [einError, setEINError] = useState<string | undefined>(undefined);
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        //e.preventDefault();
    
        const { name, value } = e.target;
    
        // Create a new copy of taxformInfo with the updated field
        const updatedTaxpayerInfo = {
            ...taxformInfo,
            [name]: value
        };
        if (formType === "w2"){
            updatedTaxpayerInfo.formType = formType;
        }
        else{
            updatedTaxpayerInfo.formType = "1099";
        }
        updatedTaxpayerInfo.user = userId;
        console.log(updatedTaxpayerInfo.formType);
        // Handle nested updates based on the field name
        if (name.startsWith('formDetails.')) {
            const detailsKey = name.split('.')[1];
            updatedTaxpayerInfo.formDetails = {
                ...taxformInfo.formDetails,
                [detailsKey]: value
            };
        }
    
        // Dispatch the action to update the state
        dispatch(setTaxFormInfo(updatedTaxpayerInfo));
    };

    const history = useNavigate();
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // need to serialize address object to JSON string before sending to API
        const payload = {
            ...taxformInfo,
            formDetails: JSON.stringify(taxformInfo.formDetails)
        };
        
        console.log("in subnit");
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
        history('/UserTaxes');
    };
    const [steps, setSteps] = useState<Step[]>([
        { label: 'Employer Information'},
        { label: 'Personal Information'},
        { label: 'Financial Information'},
        { label: 'Withholdings And Miscellaneous' },
        { label: 'Review and submit' },
      ]);
    
    const MyStepIndicatorComponent: React.FC = () => {

        

        //console.log(currentStep)

        

        //   const updateStepStatus = (stepIndex: number, newStatus: 'complete' | 'current' | undefined) => {
        //     setSteps((prevSteps) => {
        //       const updatedSteps = [...prevSteps];
        //       if (stepIndex >= 0 && stepIndex < updatedSteps.length) {
        //         updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], status: newStatus };
        
                
        //       }
        //       return updatedSteps;
        //     });
        //   };
      
        const handleNextStep = () => {
        if (currentStep < steps.length - 1) {
            const updatedSteps = [...steps];
            updatedSteps[currentStep].status = 'complete'; // Mark current step as complete
            updatedSteps[currentStep + 1].status = 'current'; // Mark next step as current
            setSteps(updatedSteps);
            setCurrentStep((prevStep) => prevStep + 1);
        //   console.log("/////////////////////")
        //   console.log("Handle Updated Next Steps")
        //   console.log(updatedSteps[currentStep].status)
        //   console.log("/////////////////////")
        //dispatch(setTaxFormInfo(updateTaxForm1));

        }

        };
    
    
        const handlePreviousStep = () => {
        if (currentStep > 0) {
            const updatedSteps = [...steps];
            updatedSteps[currentStep].status = undefined; // Remove current step status
            updatedSteps[currentStep - 1].status = 'current'; // Mark previous step as current
            setSteps(updatedSteps);
            setCurrentStep((prevStep) => prevStep - 1);
        }
        //dispatch(setTaxFormInfo(updateTaxForm1));

        };

        
        //   console.log("/////////////////////")
        //   console.log("Handle Previous Steps")
        //   console.log(steps[currentStep].status)
        //   console.log("/////////////////////")

        return (
          <div>
            
      
            {/* Render navigation buttons */}
            <GridContainer>
                <Grid row>
                <Grid tablet={{
                        col: true
                    }}>
                        <StepIndicator headingLevel="h4" ofText="of" stepText="Step">
                {steps.map((step, index) => (
                <StepIndicatorStep
                    key={index}
                    label={step.label}
                    status={step.status}
                />
                ))}
            </StepIndicator>
                    <Button type='button' onClick={handlePreviousStep} disabled={currentStep === 0}>
                    {t('taxforminfo.prev')}
                    </Button>
                    <Button type='button' onClick={handleNextStep} disabled={currentStep === steps.length - 1}>
                    {t('taxforminfo.next')}
                    </Button>
            
                    {/* Render current step content based on currentStep state */}
                    {/* You can conditionally render content for each step */}
                    <div className="bg-base-lightest">
                        {currentStep === 0 && <PersonalInfoStep />}
                        {currentStep === 1 && <HouseholdStatusStep />}
                        {currentStep === 2 && <SupportingDocumentsStep />}
                        {currentStep === 3 && <SignatureStep />}
                        {currentStep === 4 && <ReviewAndSubmitStep />}
                        
                    </div>
                    </Grid>
                </Grid>
              </GridContainer>
          </div>
        );
      };
    
      const PersonalInfoStep: React.FC = () => {
        //console.log("Displaying First Step")

        if (formType === "w2"){
            //taxformInfo.formType = "w2";
            return <div className="bg-base-lightest">
            <GridContainer className="usa-section">
                <Grid row className="margin-x-neg-05 flex-justify-center">
                    <div className="bg-white padding-y-3 padding-x-15 border border-base-lighter">
            <Form onSubmit={handleSubmit}>
            
                
            
            
            <div>
                <Fieldset legend="Employer's Address" legendStyle='large'>
                    
                    <FormGroup>
                        <Label htmlFor="cstreet">{t('taxforminfo.streetAddress')}</Label>
                        <TextInput
                            id='cstreet'
                            name='formDetails.cstreet'
                            type='text'
                            defaultValue={taxformInfo.formDetails.cstreet}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="ccity">{t('taxforminfo.city')}</Label>
                        <TextInput
                            id='ccity'
                            name='formDetails.ccity'
                            type='text'
                            defaultValue={taxformInfo.formDetails.ccity}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="cstate">{t('taxforminfo.state')}</Label>
                        <TextInput
                            id='cstate'
                            name='formDetails.cstate'
                            type='text'
                            defaultValue={taxformInfo.formDetails.cstate}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="czip">{t('taxforminfo.zip')}</Label>
                        <TextInput
                            id='czip'
                            name='formDetails.czip'
                            type='text'
                            defaultValue={taxformInfo.formDetails.czip}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                </Fieldset>
            </div>

            

            <FormGroup>
                <Label htmlFor="ein">{t('taxforminfo.ein')}</Label>
                <TextInput
                    id="ein"
                    name="formDetails.b"
                    type="text"
                    defaultValue={taxformInfo.formDetails.b}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                    //validationStatus='error'
                />
            </FormGroup>
            <FormGroup>
                        <Label htmlFor="cname">{t('taxforminfo.cname')}</Label>
                        <TextInput
                            id='cname'
                            name='formDetails.cname'
                            type='text'
                            defaultValue={taxformInfo.formDetails.cname}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
            
            <FormGroup>
                <Label htmlFor="cn">{t('taxforminfo.controlNumber')}</Label>
                <TextInput
                    id='cn'
                    name='formDetails.d'
                    type='text'
                    defaultValue={taxformInfo.formDetails.d}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
           
        </Form>
        </div>
            </Grid>
        </GridContainer>
        </div>
      };
      //taxformInfo.formType = "1099";
        
        return <div className="bg-base-lightest">
        <GridContainer className="usa-section">
            <Grid row className="margin-x-neg-05 flex-justify-center">
                <div className="bg-white padding-y-3 padding-x-15 border border-base-lighter">
        <Form onSubmit={handleSubmit}>
            
           
            <div>
                <Fieldset legend="Payer's Address" legendStyle='large'>
                    
                    <FormGroup>
                    <Label htmlFor="cstreet">{t('taxforminfo.streetAddress')}</Label>
                        <TextInput
                            id='cstreet'
                            name='formDetails.cstreet'
                            type='text'
                            defaultValue={taxformInfo.formDetails.cstreet}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="ccity">{t('taxforminfo.city')}</Label>
                        <TextInput
                            id='ccity'
                            name='formDetails.ccity'
                            type='text'
                            defaultValue={taxformInfo.formDetails.ccity}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="cstate">{t('taxforminfo.state')}</Label>
                        <TextInput
                            id='cstate'
                            name='formDetails.cstate'
                            type='text'
                            defaultValue={taxformInfo.formDetails.cstate}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="czip">{t('taxforminfo.zip')}</Label>
                        <TextInput
                            id='czip'
                            name='formDetails.czip'
                            type='text'
                            defaultValue={taxformInfo.formDetails.czip}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                </Fieldset>
            </div>
            <FormGroup>
                <Label htmlFor="ein">{t('taxforminfo.ptin')}</Label>
                <TextInput
                    id="ptin"
                    name="formDetails.b"
                    type="text"
                    defaultValue={taxformInfo.formDetails.b}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                    //validationStatus='error'
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="cname">{t('taxforminfo.pname')}</Label>
                <TextInput
                    id='cname'
                    name='formDetails.cname'
                    type='text'
                    defaultValue={taxformInfo.formDetails.cname}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            
            
            
        </Form>
        </div>
            </Grid>
        </GridContainer>
        </div>
      };
    
      const HouseholdStatusStep: React.FC = () => {
        if (formType === "w2"){
            return <div className="bg-base-lightest">
            <GridContainer className="usa-section">
                <Grid row className="margin-x-neg-05 flex-justify-center">
                    <div className="bg-white padding-y-3 padding-x-15 border border-base-lighter">
            <Form onSubmit={handleSubmit}>

            
            <div>
                <Fieldset legend="Employee's Address" legendStyle='large'>
                    
                    <FormGroup>
                    <Label htmlFor="fstreet">{t('taxforminfo.streetAddress')}</Label>
                        <TextInput
                            id='fstreet'
                            name='formDetails.fstreet'
                            type='text'
                            defaultValue={taxformInfo.formDetails.fstreet}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="fcity">{t('taxforminfo.city')}</Label>
                        <TextInput
                            id='fcity'
                            name='formDetails.fcity'
                            type='text'
                            defaultValue={taxformInfo.formDetails.fcity}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="fstate">{t('taxforminfo.state')}</Label>
                        <TextInput
                            id='fstate'
                            name='formDetails.fstate'
                            type='text'
                            defaultValue={taxformInfo.formDetails.fstate}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="fzip">{t('taxforminfo.zip')}</Label>
                        <TextInput
                            id='fzip'
                            name='formDetails.fzip'
                            type='text'
                            defaultValue={taxformInfo.formDetails.fzip}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                </Fieldset>
            </div>
            <FormGroup>
                <Label htmlFor="flname">{t('taxforminfo.flname')}</Label>
                <TextInput
                    id="flname"
                    name="formDetails.e"
                    type="text"
                    defaultValue={taxformInfo.formDetails.e}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            
            
        </Form>
        </div>
            </Grid>
        </GridContainer>
        </div>
        }
        return <div className="bg-base-lightest">
        <GridContainer className="usa-section">
            <Grid row className="margin-x-neg-05 flex-justify-center">
                <div className="bg-white padding-y-3 padding-x-15 border border-base-lighter">
        <Form onSubmit={handleSubmit}>

            
            <div>
                <Fieldset legend="Employee's Address" legendStyle='large'>
                    
                    <FormGroup>
                    <Label htmlFor="fstreet">{t('taxforminfo.streetAddress')}</Label>
                        <TextInput
                            id='fstreet'
                            name='formDetails.fstreet'
                            type='text'
                            defaultValue={taxformInfo.formDetails.fstreet}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="fcity">{t('taxforminfo.city')}</Label>
                        <TextInput
                            id='fcity'
                            name='formDetails.fcity'
                            type='text'
                            defaultValue={taxformInfo.formDetails.fcity}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="fstate">{t('taxforminfo.state')}</Label>
                        <TextInput
                            id='fstate'
                            name='formDetails.fstate'
                            type='text'
                            defaultValue={taxformInfo.formDetails.fstate}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="fzip">{t('taxforminfo.zip')}</Label>
                        <TextInput
                            id='fzip'
                            name='formDetails.fzip'
                            type='text'
                            defaultValue={taxformInfo.formDetails.fzip}
                            //onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                </Fieldset>
            </div>
            <FormGroup>
                <Label htmlFor="flname">{t('taxforminfo.flname')}</Label>
                <TextInput
                    id="flname"
                    name="formDetails.e"
                    type="text"
                    defaultValue={taxformInfo.formDetails.e}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="rtin">{t('taxforminfo.rtin')}</Label>
                <TextInput
                    id='rtin'
                    name='formDetails.d'
                    type='text'
                    defaultValue={taxformInfo.formDetails.d}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            
        </Form>
        </div>
            </Grid>
        </GridContainer>
        </div>
      };
    
      const SupportingDocumentsStep: React.FC = () => {
        if (formType === "w2"){
            return <div className="bg-base-lightest">
            <GridContainer className="usa-section">
                <Grid row className="margin-x-neg-05 flex-justify-center">
                    <div className="bg-white padding-y-3 padding-x-15 border border-base-lighter">
            <Form onSubmit={handleSubmit}>

           
            <FormGroup>
                <Label htmlFor="wtc">{t('taxforminfo.wtc')}</Label>
                <TextInput
                    id="wtc"
                    name="formDetails.l1"
                    type="text"
                    defaultValue={taxformInfo.formDetails.l1}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="ssw">{t('taxforminfo.ssw')}</Label>
                <TextInput
                    id="ssw"
                    name="formDetails.l3"
                    type="text"
                    defaultValue={taxformInfo.formDetails.l3}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="mwt">{t('taxforminfo.mwt')}</Label>
                <TextInput
                    id="mwt"
                    name="formDetails.l5"
                    type="text"
                    defaultValue={taxformInfo.formDetails.l5}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="sst">{t('taxforminfo.sst')}</Label>
                <TextInput
                    id="sst"
                    name="formDetails.l7"
                    type="text"
                    defaultValue={taxformInfo.formDetails.l7}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="at">{t('taxforminfo.at')}</Label>
                <TextInput
                    id="at"
                    name="formDetails.l8"
                    type="text"
                    defaultValue={taxformInfo.formDetails.l8}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            
        </Form>
        </div>
            </Grid>
        </GridContainer>
        </div>
        }
        return<div className="bg-base-lightest">
        <GridContainer className="usa-section">
            <Grid row className="margin-x-neg-05 flex-justify-center">
                <div className="bg-white padding-y-3 padding-x-15 border border-base-lighter">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="nec">{t('taxforminfo.nec')}</Label>
                            <TextInput
                                id="nec"
                                name="formDetails.l1"
                                type="text"
                                defaultValue={taxformInfo.formDetails.l1}
                                //onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </FormGroup>
                    </Form>
                </div>
            </Grid>
        </GridContainer>
        </div>
      };
    
      const SignatureStep: React.FC = () => {
        if (formType === "w2"){
            return <div className="bg-base-lightest">
                <GridContainer className="usa-section">
                    <Grid row className="margin-x-neg-05 flex-justify-center">
                        <div className="bg-white padding-y-3 padding-x-15 border border-base-lighter">
                            <Form onSubmit={handleSubmit} className="usa-form usa-form--large margin-bottom-3">

                            <Grid row gap={6}>
                                <Grid col={6}>
                                    <FormGroup>
                                        <Label htmlFor="fitw">{t('taxforminfo.fitw')}</Label>
                                        <TextInput
                                            id="fitw"
                                            name="formDetails.l2"
                                            type="text"
                                            defaultValue={taxformInfo.formDetails.l2}
                                            //onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid col={6}>
                                    <FormGroup>
                                        <Label htmlFor="sstw">{t('taxforminfo.sstw')}</Label>
                                        <TextInput
                                            id="sstw"
                                            name="formDetails.l4"
                                            type="text"
                                            defaultValue={taxformInfo.formDetails.l4}
                                            //onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </FormGroup>
                                    </Grid>
                                <Grid col={6}>
                                    <FormGroup>
                                        <Label htmlFor="mtw">{t('taxforminfo.mtw')}</Label>
                                        <TextInput
                                            id="mtw"
                                            name="formDetails.l6"
                                            type="text"
                                            defaultValue={taxformInfo.formDetails.l6}
                                            //onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid col={6}>
                                    <FormGroup>
                                        <Label htmlFor="sst">{t('taxforminfo.sst')}</Label>
                                        
                                            <TextInput
                                                id="sst"
                                                name="formDetails.l7"
                                                type="text"
                                                defaultValue={taxformInfo.formDetails.l7}
                                                //onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        
                                    </FormGroup>
                                </Grid>
                                
                                <Grid col={6}>
                                    <FormGroup>
                                        <Label htmlFor="dcb">{t('taxforminfo.dcb')}</Label>
                                        <TextInput
                                            id="dcb"
                                            name="formDetails.l10"
                                            type="text"
                                            defaultValue={taxformInfo.formDetails.l10}
                                            //onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid col={6}>
                                    <FormGroup>
                                        <Label htmlFor="nqp">{t('taxforminfo.nqp')}</Label>
                                        <TextInput
                                            id="nqp"
                                            name="formDetails.l11"
                                            type="text"
                                            defaultValue={taxformInfo.formDetails.l11}
                                            //onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid col={6}>
                                    <FormGroup>
                                        <Label htmlFor="uss">{t('taxforminfo.uss')}</Label>
                                        <TextInput
                                            id="uss"
                                            name="formDetails.l12a"
                                            type="text"
                                            defaultValue={taxformInfo.formDetails.l12a}
                                            //onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid col={6}>
                                    <FormGroup>
                                        <Label htmlFor="umt">{t('taxforminfo.umt')}</Label>
                                        <TextInput
                                            id="umt"
                                            name="formDetails.l12b"
                                            type="text"
                                            defaultValue={taxformInfo.formDetails.l12b}
                                            //onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid col={6}>
                                    <FormGroup>
                                        <Label htmlFor="tcg">{t('taxforminfo.tcg')}</Label>
                                        <TextInput
                                            id="tcg"
                                            name="formDetails.l12c"
                                            type="text"
                                            defaultValue={taxformInfo.formDetails.l12c}
                                            //onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid col={6}>
                                    <FormGroup>
                                        <Label htmlFor="ed">{t('taxforminfo.tcg')}</Label>
                                        <TextInput
                                            id="ed"
                                            name="formDetails.l12d"
                                            type="text"
                                            defaultValue={taxformInfo.formDetails.l12d}
                                            //onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </Form>
                    </div>
                </Grid>
            </GridContainer>
        </div>
        }
        return <div className="bg-base-lightest">
        <GridContainer className="usa-section">
            <Grid row className="margin-x-neg-05 flex-justify-center">
                <div className="bg-white padding-y-3 padding-x-15 border border-base-lighter">
                    <Form onSubmit={handleSubmit}>

                        
                        
                        <FormGroup>
                            <Label htmlFor="fitw">{t('taxforminfo.fitw')}</Label>
                            <TextInput
                                id="fitw"
                                name="formDetails.l2"
                                type="text"
                                defaultValue={taxformInfo.formDetails.l2}
                                //onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </FormGroup>
                        
                        
                    </Form>
                </div>
            </Grid>
        </GridContainer>
        </div>
      };
    
      const ReviewAndSubmitStep: React.FC = () => {
        const goToStep = (stepIndex: number) => {
            if (stepIndex >= 0 && stepIndex < steps.length && stepIndex !== currentStep) {
                const updatedSteps: Step[] = steps.map((step, index) => ({
                ...step,
                status: index === stepIndex ? 'current' : index < stepIndex ? 'complete' : undefined,
                }));
        
                setSteps(updatedSteps);
                setCurrentStep(stepIndex);
            }
            };

        if (formType === "w2"){

        return <div className="bg-base-lightest">
            <GridContainer className="usa-section" >
                <Grid row className="margin-x-neg-05 flex-justify-center">
                    
                    <CardGroup>
                        <Grid row gap={6}>
                            <Grid col={6}>
                                <Card>
                                    <CardHeader>
                                        <h2>{t('taxforminfo.ei')}</h2>
                                    </CardHeader>

                                    <CardBody>
                                        <p>{t('taxforminfo.ein')}: {taxformInfo.formDetails.b}</p>
                                        <p>{t('taxforminfo.cname')}: {taxformInfo.formDetails.cname}</p>
                                        <p>{t('taxforminfo.eaaz')}: {taxformInfo.formDetails.cstreet} {taxformInfo.formDetails.ccity} {taxformInfo.formDetails.cstate} {taxformInfo.formDetails.czip}</p>
                                        <p>{t('taxforminfo.controlNumber')}: {taxformInfo.formDetails.d}</p>

                                    </CardBody>
                                    <CardFooter>
                                        <Button type='button' onClick={() => goToStep(0)}>{t('taxforminfo.edit')}</Button>
                                    </CardFooter>
                                </Card>
                            </Grid>
                            <Grid col={6}>
                                <Card>
                                    <CardHeader>
                                        <h2>{t('taxforminfo.pi')}</h2>
                                    </CardHeader>

                                    <CardBody>
                                        <p>{t('taxforminfo.flname')}: {taxformInfo.formDetails.l1}</p>
                                        <p>{t('taxforminfo.empaaz')}: {taxformInfo.formDetails.fstreet} {taxformInfo.formDetails.fcity} {taxformInfo.formDetails.fstate} {taxformInfo.formDetails.fzip}</p>
                                    </CardBody>
                                    <CardFooter>
                                        <Button type='button' onClick={() => goToStep(1)}>{t('taxforminfo.edit')}</Button>
                                    </CardFooter>
                                </Card>
                            </Grid>
                            <Grid col={6}>
                                <Card>
                                    <CardHeader>
                                        <h2>{t('taxforminfo.fi')}</h2>
                                    </CardHeader>

                                    <CardBody>
                                        <p>{t('taxforminfo.wtc')}: {taxformInfo.formDetails.l1}</p>
                                        <p>{t('taxforminfo.ssw')}: {taxformInfo.formDetails.l3}</p>
                                        <p>{t('taxforminfo.mwt')}: {taxformInfo.formDetails.l5}</p>
                                        <p>{t('taxforminfo.sst')}: {taxformInfo.formDetails.l7}</p>
                                        <p>{t('taxforminfo.at')}: {taxformInfo.formDetails.l8}</p>
                                    </CardBody>
                                    <CardFooter>
                                        <Button type='button' onClick={() => goToStep(2)}>{t('taxforminfo.edit')}</Button>
                                    </CardFooter>
                                </Card>
                            </Grid>
                            <Grid col={6}>
                                <Card>
                                    <CardHeader>
                                        <h2>{t('taxforminfo.wiam')} </h2>
                                    </CardHeader>

                                    <CardBody>
                                        <p>{t('taxforminfo.fitw')}: {taxformInfo.formDetails.l2}</p>
                                        <p>{t('taxforminfo.sstw')}: {taxformInfo.formDetails.l4}</p>
                                        <p>{t('taxforminfo.mtw')}: {taxformInfo.formDetails.l6}</p>
                                        <p>{t('taxforminfo.dcb')}: {taxformInfo.formDetails.l10}</p>
                                        <p>{t('taxforminfo.nqp')}: {taxformInfo.formDetails.l11}</p>
                                        <p>{t('taxforminfo.uss')}: {taxformInfo.formDetails.l12a}</p>
                                        <p>{t('taxforminfo.umt')}: {taxformInfo.formDetails.l12b}</p>
                                        <p>{t('taxforminfo.tcg')}: {taxformInfo.formDetails.l12c}</p>
                                        <p>{t('taxforminfo.ed')}: {taxformInfo.formDetails.l12d}</p>
                                    </CardBody>
                                    <CardFooter>
                                        <Button type='button' onClick={() => goToStep(3)}>{t('taxforminfo.edit')}</Button>
                                    </CardFooter>
                                </Card>
                            </Grid>
                            
                        </Grid>
                        <Button type="button" onClick={handleSubmit}>{t('taxforminfo.submit')}</Button>
                    </CardGroup>
                </Grid>
                
            </GridContainer>
        </div>;
      };
      return <div className="bg-base-lightest">
            <GridContainer className="usa-section" >
                <Grid row className="margin-x-neg-05 flex-justify-center">
                    
                    <CardGroup>
                        <Grid row gap={6}>
                            <Grid col={6}>
                                <Card>
                                    <CardHeader>
                                        <h2>{t('taxforminfo.ei')}</h2>
                                    </CardHeader>

                                    <CardBody>
                                        <p>{t('taxforminfo.ein')}: {taxformInfo.formDetails.b}</p>
                                        <p>{t('taxforminfo.cname')} {taxformInfo.formDetails.cname}</p>
                                        <p>{t('taxforminfo.eaaz')}: {taxformInfo.formDetails.cstreet} {taxformInfo.formDetails.ccity} {taxformInfo.formDetails.cstate} {taxformInfo.formDetails.czip}</p>
                                        

                                    </CardBody>
                                    <CardFooter>
                                        <Button type='button' onClick={() => goToStep(0)}>{t('taxforminfo.edit')}</Button>
                                    </CardFooter>
                                </Card>
                            </Grid>
                            <Grid col={6}>
                                <Card>
                                    <CardHeader>
                                        <h2>{t('taxforminfo.pi')}</h2>
                                    </CardHeader>

                                    <CardBody>
                                        <p>{t('taxforminfo.flname')}: {taxformInfo.formDetails.e}</p>
                                        <p>{t('taxforminfo.empaaz')}: {taxformInfo.formDetails.fstreet}, {taxformInfo.formDetails.fcity}, {taxformInfo.formDetails.fstate}, {taxformInfo.formDetails.fzip}</p>
                                        <p>{t('taxforminfo.rtin')}: {taxformInfo.formDetails.d}</p>
                                    </CardBody>
                                    <CardFooter>
                                        <Button type='button' onClick={() => goToStep(1)}>{t('taxforminfo.edit')}</Button>
                                    </CardFooter>
                                </Card>
                            </Grid>
                            <Grid col={6}>
                                <Card>
                                    <CardHeader>
                                        <h2>{t('taxforminfo.fi')}</h2>
                                    </CardHeader>

                                    <CardBody>
                                        <p>{t('taxforminfo.wtc')}: {taxformInfo.formDetails.l1}</p>
                                        
                                    </CardBody>
                                    <CardFooter>
                                        <Button type='button' onClick={() => goToStep(2)}>{t('taxforminfo.edit')}</Button>
                                    </CardFooter>
                                </Card>
                            </Grid>
                            <Grid col={6}>
                                <Card>
                                    <CardHeader>
                                        <h2>{t('taxforminfo.wiam')} </h2>
                                    </CardHeader>

                                    <CardBody>
                                        <p>{t('taxforminfo.fitw')}: {taxformInfo.formDetails.l2}</p>
                                        
                                    </CardBody>
                                    <CardFooter>
                                        <Button type='button' onClick={() => goToStep(3)}>{t('taxforminfo.edit')}</Button>
                                    </CardFooter>
                                </Card>
                            </Grid>
                            
                        </Grid>
                        <Button type="button" onClick={handleSubmit}>{t('taxforminfo.submit')}</Button>
                    </CardGroup>
                </Grid>
                
            </GridContainer>
        </div>;
      };
    
    
    
    return (
        <>
        {/* <StepIndicator
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

        </StepIndicator> */}
        <MyStepIndicatorComponent />
        {/* <Form onSubmit={handleSubmit}>
            
            
            
            
            
            
            
            
        </Form> */}
        </>
    )
}

interface Step {
    label: string;
    status?: 'complete' | 'current';
  }
  


  
  
export default TaxFormInfoForm;
