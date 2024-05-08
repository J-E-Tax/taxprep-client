import {  useNavigate } from 'react-router-dom';
import { Header, GridContainer, PrimaryNav } from '@trussworks/react-uswds';
import { useDispatch, useSelector } from 'react-redux';
import {logout } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import Lottie from "lottie-react";
import JoeAndEricLogo from "./JoeAndEricLogo.json";

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const items = [
        <a href="/main" key="home">Home</a>,
        <a href="/taxpayer-info" key="personalInfo">Personal Info</a>,
        <a href="/UserTaxes" key="taxInfo">Tax Info</a>,
        <a href="" key="review">Review</a>,
        <a href="/results" key="taxResults">Tax Results</a>,
        <button onClick={handleLogout} key="logout">Logout</button>
    ];

    return (
        <div style={{ borderBottom: '1px solid #808080' }}>
            <Header basic={true}>
                <GridContainer>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        { isAuthenticated  &&
                        <>
                            <a href="/" title="Home" aria-label="Home">
                                <Lottie animationData={JoeAndEricLogo}  style={{ width: "150px" }} />
                            </a>
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
