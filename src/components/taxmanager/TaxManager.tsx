import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { TaxFormInfoState } from '../../features/taxforminfo/taxformInfoSlice';
import { Card, CardHeader, CardBody, CardFooter, Button, GridContainer, Grid, CardGroup } from '@trussworks/react-uswds';
import { useNavigate } from 'react-router-dom';
import { w2 } from '../../features/taxforminfo/taxformInfoSlice';
import ResultsModal from '../results/ResultsModal';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
const cookies = new Cookies();

const DisplayTaxForms: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [dataList, setDataList] = useState<TaxFormInfoState[]>([]);
  const [cardComponents, setCardComponents] = useState<JSX.Element[]>([]);
  const history = useNavigate();
  const { t } = useTranslation();
  const [shouldRerender, setShouldRerender] = useState<boolean>(false);
  const dispatch = useDispatch();


  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, [shouldRerender]); // Re-run effect when shouldRerender state changes

  useEffect(() => {
    // Automatically trigger a single re-render after component mounts
    const timer = setTimeout(() => {
      setShouldRerender(true);
    }, 2000); // Adjust the delay (in milliseconds) as needed

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []); // Run only once on component mount


  const fetchData = async () => {
    try {
      const userId2 = userId; // Assuming you obtain the userId correctly
      const token = cookies.get('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get<TaxFormInfoState[]>(`${import.meta.env.VITE_REACT_URL}/taxform/taxes/users/${userId2}`, config);
      setDataList(response.data); // Update state with fetched data
      createCardComponents(response.data); // Create card components
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const createCardComponents = (data: TaxFormInfoState[]) => {
    const cards = data.map((item) => {
      // Parse the formDetails field if it exists
      const parsedFormDetails: w2 = JSON.parse(item.formDetails as unknown as string);
      // console.log(parsedFormDetails.cname);
      // console.log(item);

      return (
        <Card key={item.taxFormId}>
          <CardHeader>
            <h2>{item.formType} | {parsedFormDetails.cname}</h2>
          </CardHeader>
          <CardBody>
            <p>{t('taxforminfo.cus')}: {item.status}</p>
          </CardBody>
          <CardFooter>
            <Button type='button' onClick={() => handleRedirectEdit(item.taxFormId, item.formType)}>{t('taxforminfo.edit')}</Button>
          </CardFooter>
        </Card>
      );
    });

    setCardComponents(cards); // Update state with card components
  };

  const handleRedirect = () => {
    // Redirect to a new route (e.g., '/new-page') when button is clicked
    history('/taxes/w2');
  };

  const handleRedirect1099 = () => {
    // Redirect to a new route (e.g., '/new-page') when button is clicked
    history('/taxes/1099');
  };

  const handleRedirectEdit = (page: any, type:any) => {
    // Redirect to a new route (e.g., '/new-page') when button is clicked

    history(`/taxes/${type}/${page}`);
  };

  return (
    <div>
      {/* Render the Card components */}
      <div className="bg-base-lightest">
        <GridContainer className="usa-section">
          <Grid row className="margin-x-neg-05 flex-justify-center">
            <CardGroup>
            <Card>
                <CardHeader>
                  <p>{t('taxforminfo.fantf')}</p>
                </CardHeader>
                <CardBody>

                </CardBody>
                <CardFooter>
                  <Button type='button' onClick={handleRedirect}>{t('taxforminfo.fw2')}</Button>
                  <Button type='button' onClick={handleRedirect1099}>{t('taxforminfo.f1099')}</Button>
                </CardFooter>
              </Card>
              {/* Render a card for each tax form */}
              {cardComponents}
            </CardGroup>
          </Grid>
          <div style={
            {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }>
            <ResultsModal />
          </div>
        </GridContainer>
      </div>
    </div>
  );
};

export default DisplayTaxForms;
