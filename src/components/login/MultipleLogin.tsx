import { Button, GovBanner, Grid, GridContainer, Header, MediaBlockBody, Title } from "@trussworks/react-uswds";
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import JoeAndEricLogo from "../../utils/JoeAndEricLogo.json";


function MultipleLogin () {

    const handleGoogleOAuthLogin = () => {
        window.location.replace(`${import.meta.env.VITE_REACT_URL}/oauth2Signin`);

    };

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
              <Lottie animationData={JoeAndEricLogo}  style={{ width: "150px" }} />
            </a>
          </Title>
        </div>
      </Header>

      <main id="main-content">
        <div className="bg-base-lightest">
          <GridContainer className="usa-section">
            <Grid row={true} className="margin-x-neg-205 margin-bottom-7 flex-justify-center">
              <Grid col={12} mobileLg={{
              col: 10
            }} tablet={{
              col: 8
            }} desktop={{
              col: 6
            }} className="padding-x-205 margin-bottom-7">
                <h1 className="desktop:display-none font-sans-lg margin-bottom-4 tablet:margin-top-neg-3">
                  A tagline that explains the benefit of creating an account.
                </h1>

                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                  <h1 className="margin-bottom-1">Sign in to your account</h1>

                  <div className="usa-prose">
                    <p className="margin-top-1">
                      You can access your account by signing in with one of the
                      options below.
                    </p>
                  </div>

                  <p>
                    <Link to="/login">
                        <Button type="button" outline={true} className="width-full" onClick={() => "/login"}>
                        Sign in with your account
                        </Button>
                    </Link>
                  </p>


                  <p>
                    <Button type="button" outline={true} className="width-full" onClick={handleGoogleOAuthLogin}>
                      Sign in with Google
                    </Button>
                  </p>
{/*
                  <p>
                    <Button type="button" outline={true} className="width-full">
                      Sign in with Github
                    </Button>
                  </p> */}

                  <div className="border-top border-base-lighter margin-top-6 padding-top-1">
                    <p>
                      <strong>{"Don't have an account?"}</strong>
                    </p>
                    <p>
                      {"Create a free account with us! If you don't have an account already, sign up here:"}
                    </p>
                    <Link to="/signUp">
                        <p>
                        <Button type="button" className="width-full">
                            Create your account
                        </Button>
                        </p>
                    </Link>
                  </div>
                </div>
              </Grid>

              <Grid col={12} mobileLg={{
              col: 10
            }} tablet={{
              col: 8
            }} desktop={{
              col: 6
            }} className="padding-x-205">
                <div className="border-top border-base-lighter padding-top-4 desktop:border-0 desktop:padding-top-0">
                  <h2 className="display-none desktop:display-block">
                    Unlock Your Tax Benefits Now!
                  </h2>

                  <div className="usa-prose">
                    <p>
                    Create a free account with us and we'll help you with your tax preparation. Here are just a few reasons why setting up an account is a great step towards managing your taxes more effectively:
                    </p>
                    <section className="usa-graphic-list">
                      <div className="usa-graphic-list__row">
                        <div className="usa-media-block margin-y-2">
                            <MediaBlockBody>
                              <p>
                                <strong>Simplified Document Handling:</strong>{' '}
                                Our system helps organize and prepare your files for filing, saving you time and effort.
                              </p>
                            </MediaBlockBody>
                          </div>
                          <div className="usa-media-block margin-y-2">
                            <MediaBlockBody>
                            <p>
                                <strong>Streamlined Tax Filing:</strong>{' '}
                                Our platform simplifies the tax filing process, making it faster and easier to submit your taxes accurately and on time.
                              </p>
                            </MediaBlockBody>
                          </div>
                          <div className="usa-media-block margin-y-2">
                            <MediaBlockBody>
                            <p>
                                <strong>Secure Document Storage:</strong>{' '}
                                Safely store all your tax documents in one secure location with encrypted access, ensuring your sensitive information is protected.
                              </p>
                            </MediaBlockBody>
                          </div>
                      </div>
                    </section>
                  </div>
                </div>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
      </main>
    </>
    )
}

export default MultipleLogin;