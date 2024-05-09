import { Button } from '@trussworks/react-uswds';
import Lottie from "lottie-react";
import ani404 from '../components/login/ani404.json';

function NotFoundPage() {

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        }}>
      <Lottie animationData={ani404} style={{ width: "40%" }}   />
      <h1>Page Not Found</h1>
      <p>The page you are looking for doesn't exist or an other error occurred.</p>
      <Button type="button" onClick={() => window.history.back()}>Go back</Button>
    </div>
  )
}

export default NotFoundPage;