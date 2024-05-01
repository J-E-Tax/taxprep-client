import { SetStateAction, useState } from 'react';
import { Button } from '@trussworks/react-uswds';
import { To, useNavigate } from 'react-router-dom';

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
    { name: 'Wages & Income', content: 'Detail your wages and income sources.' , path: '/taxpayer-info'},
    { name: 'Review', content: 'Review your entries.' , path: '/taxpayer-info'},
    { name: 'Results', content: 'Finish and file your taxes.', path: '/results' }
  ];

  return (
    <div style={
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
      }
    }>
        <ul className="usa-process-list">
        {steps.map((step, i) => (
          <li key={i} className={`usa-process-list__item ${i === activeStep ? 'usa-process-list__item--current' : ''}`} style={{width: '300px'}}>
            <h4 className="usa-process-list__heading" onClick={() => handleStepClick(i)}>{step.name}</h4>
            {i === activeStep && (
              <div>
                <p>{step.content}</p>
                <Button type="button" onClick={() => handleButtonClick(step.path)}>
                  {i === steps.length - 1 ? 'Finish' : 'Edit/Review'}</Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainVerticalStepper;