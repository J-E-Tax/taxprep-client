    import {  useNavigate } from 'react-router-dom';
    import { Header, GridContainer, PrimaryNav  } from '@trussworks/react-uswds';
    import { useDispatch, useSelector } from 'react-redux';
    import {logout } from '../features/auth/authSlice';

    function NavBar() {
        const navigate = useNavigate();
        const dispatch = useDispatch();

        const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

        const handleLogout = () => {
            dispatch(logout());
            navigate('/login');
        };

        const items = [
            <a href="/home" key="home">Home</a>,
            <a href="" key="warehouse">Personal Info</a>,
            <a href="" key="category">Tax Info</a>,
            <a href="" key="dash">Review</a>,
            <a href="" key="dash">Tax Results</a>,
            <button onClick={handleLogout} key="logout">Logout</button>
        ];

        return (
            <Header basic={true}>
                <GridContainer>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        { isAuthenticated  && <PrimaryNav items={items} />}
                    </div>
                </GridContainer>
            </Header>
        );
    }

    export default NavBar;
