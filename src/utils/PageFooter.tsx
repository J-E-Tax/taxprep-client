import { Address, Footer, Grid, GridContainer, Logo, SocialLink, SocialLinks } from '@trussworks/react-uswds';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

function PageFooter() {

    const { t } = useTranslation();
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
        <Footer returnToTop={returnToTop} secondary={footerSecondary} />
    );
}

export default PageFooter;
