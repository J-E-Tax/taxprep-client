
// import { StepIndicator, StepIndicatorStep } from '@trussworks/react-uswds';
import TaxpayerInfoForm from '../components/taxpayerInfo/TaxpayerInfoForm';
// import styles from './TaxpayerInfoPageStyle.module.css';

function TaxpayerInfoPage() {

    return (
        <>
            <div>

                <div className="page-container">
                    {/* <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}>
                        <StepIndicator
                                className={styles.stepIndicator}
                                headingLevel="h4"
                                ofText="of"
                                stepText="Step"
                            >
                            <StepIndicatorStep
                                label="Personal information"
                                status="current"
                            />
                            <StepIndicatorStep
                                label="Supporting documents"
                            />
                            <StepIndicatorStep label="Review" />
                            <StepIndicatorStep label="Results" />
                        </StepIndicator>

                        </div> */}
                    <TaxpayerInfoForm />
                </div>
            </div>
        </>
    );

}

export default TaxpayerInfoPage;