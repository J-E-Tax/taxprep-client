import {  useNavigate, useLocation  } from 'react-router-dom';
import { Header, GridContainer, PrimaryNav, LanguageSelector } from '@trussworks/react-uswds';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import {logout } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import Lottie from "lottie-react";
import JoeAndEricLogo from "./JoeAndEricLogo.json";

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const items = [
        <a href="/main" key="home">Home</a>,
        <a href="/taxpayer-info" key="personalInfo">Personal Info</a>,
        <a href="/UserTaxes" key="taxInfo">Tax Info</a>,
        <a href="/UserTaxes" key="review">Review</a>,
        <LanguageSelector
            key="languageSelector"
            label="Languages"
            langs={[
                {
                    attr: 'zh',
                    label: '简体字',
                    label_local: 'Chinese - Simplified',
                    on_click: () => i18next.changeLanguage('zh')
                },
                {
                    attr: 'en',
                    label: 'English',
                    on_click: () => i18next.changeLanguage('en')
                },
                {
                    attr: 'es',
                    label: 'Español',
                    label_local: 'Spanish',
                    on_click: () => i18next.changeLanguage('es')
                }
            ]}
        />,
        <button onClick={handleLogout} key="logout">Logout</button>
    ];
    // These are the paths that the NavBar will only be shown on
    const visiblePaths = ['/main', '/results', '/UserTaxes', '/taxpayer-info', '/taxes/:formType/:formID', '/taxes/:formType', '/UserTaxes'];

    // If the path user is on isnot in the visiblePaths, return null
    if (!visiblePaths.includes(location.pathname)) {
        return null;
    }

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
                            <PrimaryNav items={items}  />
                        </>
                        }
                    </div>
                </GridContainer>
            </Header>
        </div>
    );
}

export default NavBar;
