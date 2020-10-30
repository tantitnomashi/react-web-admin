import React ,{ useEffect} from 'react';
import Page from 'src/components/Page';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


const LogOutView = () => {

    const navigate = useNavigate();
        console.log("test")
    useEffect(() => {
        localStorage.clear();
        navigate('/login', { replace: true });
    })
  return (
    <Page
      title="Logout"
    >
    </Page>
  );
};

export default LogOutView;
