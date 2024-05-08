import { Address, ExtendedNav, Footer, FooterNav, GovBanner, Grid, GridContainer, Header, Logo, MediaBlockBody, Menu, NavDropDownButton, NavMenuButton, SocialLink, SocialLinks, Title, Icon, LanguageSelector } from "@trussworks/react-uswds";
import { Fragment, useState } from "react";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import happyTax from '../../assets/happyTax.jpeg';
import Lottie from "lottie-react";
import JoeAndEricLogo from "../../utils/JoeAndEricLogo.json";
import LandingMiddle from "./LandingMiddle.json"
import './LandingMainStyle.css';

function LandingMain() {

    const { t, i18n } = useTranslation();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [navDropdownOpen, setNavDropdownOpen] = useState([false, false]);
    const handleToggleNavDropdown = (index: number): void => {
      setNavDropdownOpen(prevNavDropdownOpen => {
        const newOpenState = Array(prevNavDropdownOpen.length).fill(false);
        newOpenState[index] = !prevNavDropdownOpen[index];
        return newOpenState;
      });
    };
    const toggleMobileNav = (): void => {
      setMobileNavOpen(prevOpen => !prevOpen);
    };

    const primaryNavItems = [
        <a key="secondaryNav_1" href="https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024">
          {t('landing.taxBracketChart')}
        </a>, <LanguageSelector
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
      />
        ];

    const secondaryNavItems = [<div className="navigation-links">
      <a className="usa-button usa-button--outline" key="secondaryNav_0" href="/multipleLogin">
        {t('landing.signIn')}
      </a>
      <a className="usa-button usa-button--outline" key="secondaryNav_1" href="/signUp">
      { t('landing.signUp')}
      </a>
    </div>];
    const returnToTop = <GridContainer className="usa-footer__return-to-top">
        <a href="#">{t('landing.returnToTop')}</a>
      </GridContainer>;
    const socialLinkItems = [<SocialLink key="facebook" name="Facebook" href="#" />, <SocialLink key="twitter" name="Twitter" href="#" />, <SocialLink key="youtube" name="YouTube" href="#" />, <SocialLink key="instagram" name="Instagram" href="#" />, <SocialLink key="rss" name="RSS" href="#" />];
    const footerSecondary = <>
        <Grid row gap>
          <Logo size="medium" image={<img className="usa-footer__logo-img" alt="" />} heading={<p className="usa-footer__logo-heading">J&E Tax Pro</p>} />
          <Grid className="usa-footer__contact-links" mobileLg={{
          col: 6
        }}>
            <SocialLinks links={socialLinkItems} />
            <h3 className="usa-footer__contact-heading">{t('landing.contactHeading')}</h3>
            <Address size="medium" items={[<a key="telephone" href="tel:1-800-555-5555">
              {t('landing.callGovt')}
                </a>, <a key="email" href="mailto:info@agency.gov">
                  info@jetaxpro.com
                </a>]} />
          </Grid>
        </Grid>
      </>;
    return (
    <>
        <a className="usa-skipnav" href="#main-content">
          Skip to main content
        </a>
        <GovBanner />
        <Header extended showMobileOverlay={mobileNavOpen}>
          <div className="usa-navbar">
            <Title id="extended-logo">
              <Lottie animationData={JoeAndEricLogo}  style={{ width: "150px" }} />
            </Title>
            <NavMenuButton label="Menu" onClick={toggleMobileNav} className="usa-menu-btn" />
          </div>
          <ExtendedNav aria-label="Primary navigation" primaryItems={primaryNavItems} secondaryItems={secondaryNavItems} onToggleMobileNav={toggleMobileNav} mobileExpanded={mobileNavOpen}>
          </ExtendedNav>
        </Header>

        <main id="main-content">
          <section className="usa-hero" aria-label="Introduction" style={{ backgroundImage: `url(${happyTax})`}}>
            <GridContainer>
              <div className="usa-hero__callout">
                <h1 className="usa-hero__heading">
                  <span className="usa-hero__heading--alt">{t('landing.federalReturnHeading')}</span>
                  {t('landing.federalReturnSubheading')}
                </h1>
                <p>
                {t('landing.efileDirectly')}
                </p>
                <a className="usa-button" href="/multiplelogin">
                {t('landing.getStarted')}
                </a>
              </div>
            </GridContainer>
          </section>

          <section className="grid-container usa-section">
            <Grid row gap>
              <Grid tablet={{
              col: 4
            }}>
                <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
                {t('landing.maximizeRefundsHeading')}
                </h2>
              </Grid>
              <Grid tablet={{
              col: 8
            }} className="usa-prose">
                <p>
                {t('landing.navigateTaxSeason')}
                </p>
                <p>
                {t('landing.preptaxProDescription')}
                </p>
              </Grid>
            </Grid>
          </section>

          <section className="usa-graphic-list usa-section usa-section--dark" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}>

            <Lottie animationData={JoeAndEricLogo}  style={{ width: "200px" }} />
            <Lottie animationData={LandingMiddle}  style={{ width: "250px" }} />

            <Lottie animationData={JoeAndEricLogo}  style={{ width: "200px" }} />
          </section>

          <section id="test-section-id" className="usa-section">
            <GridContainer>
              <h2 className="font-heading-xl margin-y-0">{t('landing.freeFederalHeading')}</h2>
              <p className="usa-intro">
              {t('landing.experienceSimplicity')}
              </p>
              <a href="/multiplelogin" className="usa-button usa-button--big">
              {t('landing.callToAction')}
              </a>
            </GridContainer>
          </section>
        </main>

        <Footer returnToTop={returnToTop} secondary={footerSecondary} />
      </>
      );
}


export default LandingMain;