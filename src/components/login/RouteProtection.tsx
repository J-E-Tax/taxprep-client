import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function RouteProtection({ children }: { children: React.ReactNode }){
    const token = cookies.get('token');

    if (!token) { // if there is no token, redirect to no access page
        return <Navigate to="/no-access" replace />;
      }

      return <>{children}</>;
}

export default RouteProtection;