import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(() => jest.fn()),
}));

describe('App Component', () => {
  it('render the landing page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Landing Page')).toBeInTheDocument();
  });

  it('render the login page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});

