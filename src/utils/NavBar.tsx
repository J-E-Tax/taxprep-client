    import {  useNavigate } from 'react-router-dom';
    import { Header, GridContainer, PrimaryNav } from '@trussworks/react-uswds';
    import { useDispatch, useSelector } from 'react-redux';
    import {logout } from '../features/auth/authSlice';
    import { logoutUser } from '../api/authApi';
    import { RootState } from '../app/store';

    function NavBar() {
        const navigate = useNavigate();
        const dispatch = useDispatch();

        const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

        const handleLogout = () => {
            // logoutUser()
            //     .then(() => {
                    dispatch(logout());
                    navigate('/login');
                
                // .catch((err) => {
                //     console.error(err);
                // });
        };

        const items = [
            <a href="/main" key="home">Home</a>,
            <a href="" key="personalInfo">Personal Info</a>,
            <a href="/UserTaxes" key="taxInfo">Tax Info</a>,
            <a href="" key="review">Review</a>,
            <a href="" key="taxResults">Tax Results</a>,
            <button onClick={handleLogout} key="logout">Logout</button>
        ];

        return (
            <div>
                <Header basic={true}>
                    <GridContainer>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            { isAuthenticated  &&
                            <>
                                <h4>TaxPrep</h4>
                                <PrimaryNav items={items} />
                            </>
                            }
                        </div>
                    </GridContainer>
                </Header>
            </div>
        );
    }

    export default NavBar;
