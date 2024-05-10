import { render, fireEvent, screen } from '@testing-library/react';
import MainVerticalStepper from './MainVerticalStepper';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const setActiveStep = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState: number) => [initialState, setActiveStep],
}));

describe('MainVerticalStepper', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <MainVerticalStepper />
      </MemoryRouter>
    );
  });

  it('renders all steps', () => {
    render(
      <MemoryRouter>
        <MainVerticalStepper />
      </MemoryRouter>
    );
    expect(screen.getByText('Personal Info')).toBeInTheDocument();
    expect(screen.getByText('Wages & Income')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
  });

  it('activates correct step', () => {
    render(
      <MemoryRouter>
        <MainVerticalStepper />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Wages & Income'));
    expect(setActiveStep).toHaveBeenCalledWith(1);
  });

  it('navigates on button click', () => {
    const navigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigate,
    }));

    render(
      <MemoryRouter>
        <MainVerticalStepper />
      </MemoryRouter>
    );
  });
});

