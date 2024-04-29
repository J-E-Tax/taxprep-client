import {  FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import { loginStart, loginSuccess, loginFail, logout } from '../../features/auth/authSlice';

import { Button, Form, TextInput, FormGroup, Label, GovBanner, Header, Title, GridContainer, Grid, Fieldset, Link, Footer, Identifier, IdentifierMasthead, IdentifierLogos, IdentifierLogo, IdentifierIdentity, IdentifierLinks } from '@trussworks/react-uswds';


function LoginForm() {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());

        login({ email, password })
            .then((res) => {
                console.log(res);
                dispatch(loginSuccess(res.data));
                navigate('/taxpayer-info');
            })
            .catch((err) => {
                console.error(err);
                dispatch(loginFail(err.response.data));
            });
    };

    // const handleGoogleOAuthLogin = () => {
    //     window.location.href = `${import.meta.env.VITE_REACT_URL}/oauth2/authorization/google`;
    // };

    return (
        <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>

      <GovBanner />
      <Header extended>
        <div className="usa-navbar">
          <Title id="extended-logo">
            <a href="/" title="Home" aria-label="Home">
              Project title
            </a>
          </Title>
        </div>
      </Header>

      <main id="main-content">
        <div className="bg-base-lightest">
          <GridContainer className="usa-section">
            <Grid row={true} className="flex-justify-center">
              <Grid col={12} tablet={{
              col: 8
            }} desktop={{
              col: 6
            }}>
                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                  <h1 className="margin-bottom-0">Sign in</h1>
                  <Form onSubmit={handleLogin}>
                    <Fieldset legend="Access your account" legendStyle="large">
                      <Label htmlFor="email">Email address</Label>
                      <TextInput id="email" name="email" type="email" autoCorrect="off" autoCapitalize="off" required={true} value={email} onChange={(e) => setEmail(e.target.value)} />

                      <Label htmlFor="password-sign-in">Password</Label>
                      <TextInput id="password-sign-in" name="password" type={showPassword ? 'text' : 'password'} autoCorrect="off" autoCapitalize="off" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />

                      <button title="Show password" type="button" className="usa-show-password" aria-controls="password-sign-in" onClick={(): void => setShowPassword(showPassword => !showPassword)}>
                        {showPassword ? 'Hide password' : 'Show password'}
                      </button>

                      <Button type="submit" secondary>Sign in</Button>

                      <p>
                        <Link href="javascript:void();">Forgot password?</Link>
                      </p>
                    </Fieldset>
                  </Form>
                </div>

                <p className="text-center">
                  {"Don't have an account? "}
                  <Link href="/signUp">Create your account now</Link>
                  .
                </p>

                <div className="border-top border-base-lighter margin-top-3 padding-top-1">
                  <h2>Do you have a google account?</h2>
                  <div className="usa-prose">
                    <p>
                      If you have a google account,
                      please use [secondary Single Sign On (SSO)].
                    </p>
                    <p>
                      <Button type="button" outline={true} >
                        Sign in with Google
                      </Button>
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
      </main>
    </>
    );
}

export default LoginForm;