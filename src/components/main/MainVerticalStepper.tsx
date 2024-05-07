import { SetStateAction, useState } from 'react';
import { Button } from '@trussworks/react-uswds';
import { To, useNavigate } from 'react-router-dom';
import "./MainVerticalStepperStyle.css";

function MainVerticalStepper() {

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (i: SetStateAction<number>) => {
    setActiveStep(i);
  };

  const handleButtonClick = (path: To) => {
    navigate(path);
  };

  const steps = [
    { name: 'Personal Info', content: 'Detail your personal information.  ', path: '/taxpayer-info' },
    { name: 'Wages & Income', content: 'Detail your wages and income sources.' , path: '/taxes'},
    { name: 'Review', content: 'Review your entries.' , path: '/taxpayer-info'},
    { name: 'Results', content: 'Finish and file your taxes.', path: '/results' }
  ];

  return (
    <div className="stepper-container">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`card ${i === activeStep ? 'active' : ''}`}
          onClick={() => handleStepClick(i)}
        >
          <h4>{step.name}</h4>
          {i === activeStep && (
            <>
              <p>{step.content}</p>
              <Button type="button"  onClick={() => handleButtonClick(step.path)}>
                {i === steps.length - 1 ? 'Finish' : 'Edit/Review'}
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MainVerticalStepper;