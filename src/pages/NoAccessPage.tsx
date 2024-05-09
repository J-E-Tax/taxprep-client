import { Button } from '@trussworks/react-uswds';
import Lottie from "lottie-react";

import {  useNavigate } from 'react-router-dom';
import ani403 from '../components/login/ani403.json';


function NoAccessPage() {
  const navigateTo = useNavigate();

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        }}>
      <Lottie animationData={ani403} style={{ width: "40%" }}   />
      <h1>You do not have access to this page</h1>
      <p>Please login to access this page</p>
      <Button type="button" onClick={() => navigateTo('/multipleLogin')}>Login</Button>
    </div>
  )
}

export default NoAccessPage;