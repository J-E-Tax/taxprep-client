import { ChangeEvent, FormEvent, useState, useEffect, FocusEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Button, Form, TextInput, FormGroup, Label, Textarea, Fieldset, DatePicker, Select, RequiredMarker, StepIndicator, StepIndicatorStep, CardGroup, CardHeader, CardBody, CardFooter, Card   } from '@trussworks/react-uswds';
import { createTaxForm, updateTaxForm } from '../../api/taxformApi';
import { getTaxFormInfo } from '../../api/taxformApi';
import { RootState } from '../../app/store';
import { setTaxFormInfo, TaxFormInfoState } from '../../features/taxforminfo/taxformInfoSlice';


function TaxFormInfoForm () {
    const dispatch = useDispatch();
    const {formID} = useParams();
    //console.log("before If Statement", formID)

    
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

    const handleBlur = (e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;

        e.preventDefault();

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
        dispatch(setTaxFormInfo(updateTaxForm1));

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
    const [steps, setSteps] = useState<Step[]>([
        { label: 'Personal information'},
        { label: 'Household status'},
        { label: 'Supporting documents'},
        { label: 'Signature' },
        { label: 'Review and submit' },
      ]);
    const [currentStep, setCurrentStep] = useState<number>(0); 
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
            <StepIndicator headingLevel="h4" ofText="of" stepText="Step">
                {steps.map((step, index) => (
                <StepIndicatorStep
                    key={index}
                    label={step.label}
                    status={step.status}
                />
                ))}
            </StepIndicator>
      
            {/* Render navigation buttons */}
            
              <Button type='button' onClick={handlePreviousStep} disabled={currentStep === 0}>
                Previous
              </Button>
              <Button type='button' onClick={handleNextStep} disabled={currentStep === steps.length - 1}>
                Next
              </Button>
      
            {/* Render current step content based on currentStep state */}
              {/* You can conditionally render content for each step */}
              {currentStep === 0 && <PersonalInfoStep />}
              {currentStep === 1 && <HouseholdStatusStep />}
              {currentStep === 2 && <SupportingDocumentsStep />}
              {currentStep === 3 && <SignatureStep />}
              {currentStep === 4 && <ReviewAndSubmitStep />}
          </div>
        );
      };
    
      const PersonalInfoStep: React.FC = () => {
        //console.log("Displaying First Step")
        
        return <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="Status">Status</Label>
                <TextInput
                    id="status"
                    name="status"
                    type="text"
                    value={taxformInfo.status}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="formType">Form Type</Label>
                <TextInput
                    id="formType"
                    name="formType"
                    type="text"
                    defaultValue={taxformInfo.formType}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="ssn">Social Security Number</Label>
                <TextInput
                    id="ssn"
                    name="formDetails.a"
                    type="text"
                    defaultValue={taxformInfo.formDetails.a}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="ein">Employer Identification Number</Label>
                <TextInput
                    id='ein'
                    name='formDetails.b'
                    type='text'
                    defaultValue={taxformInfo.formDetails.b}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <Button type="submit">Save and Continue</Button>
        </Form>;
      };
    
      const HouseholdStatusStep: React.FC = () => {
        return <Form onSubmit={handleSubmit}>

            <FormGroup>
                <Label htmlFor="eaddress">Employer's name, address, and ZIP</Label>
                <input
                    id="eaddress"
                    name="formDetails.c"
                    type="text"
                    //className="text"
                    defaultValue={taxformInfo.formDetails.c}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="controlNumber">control number</Label>
                <TextInput
                    id="controlNumber"
                    name="formDetails.d"
                    type="text"
                    defaultValue={taxformInfo.formDetails.d}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="flname">Employee's first and last name</Label>
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
                <Label htmlFor="address">Employee's address and ZIP code</Label>
                <TextInput
                    id="address"
                    name="formDetails.f"
                    type="text"
                    defaultValue={taxformInfo.formDetails.f}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="wtc">Wages, Tips, Compensation</Label>
                <TextInput
                    id="wtc"
                    name="formDetails.l1"
                    type="text"
                    defaultValue={taxformInfo.formDetails.l1}
                    //onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormGroup>
            <Button type="submit">Save and Continue</Button>
        </Form>
      };
    
      const SupportingDocumentsStep: React.FC = () => {
        return <div>Supporting documents form goes here</div>;
      };
    
      const SignatureStep: React.FC = () => {
        return <div>Signature form goes here</div>;
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

        return <>
            <CardGroup>
                <Card>
                    <CardHeader>
                        <h2>Personal Information</h2>
                    </CardHeader>

                    <CardBody>
                        <p>Name: {taxformInfo.formDetails.e}</p>

                    </CardBody>
                    <CardFooter>
                        <Button type='button' onClick={() => goToStep(0)}>Edit</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <h2>Financial Input</h2>
                    </CardHeader>

                    <CardBody>
                        <p>Total Earnings: {taxformInfo.formDetails.l1}</p>
                    </CardBody>
                    <CardFooter>
                        <Button type='button' onClick={() => goToStep(1)}>Edit</Button>
                    </CardFooter>
                </Card>
            </CardGroup>
        </>;
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
