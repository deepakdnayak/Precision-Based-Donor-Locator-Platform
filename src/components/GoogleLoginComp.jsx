import React from 'react'
import { GoogleLogin } from 'react-google-login';
const clientId = "556125669291-8qfdc0a7pkh5kih7clrls4p1v3963keg.apps.googleusercontent.com";

const GoogleLoginComp = () => {
    const onSuccess = (response) => {
        console.log('Login Success: ', response.profileObj);
        // Send response.tokenId to backend for verification
      };
    
      const onFailure = (response) => {
        console.log('Login Failed: ', response);
      };
    
      return (
        <div>
          <h1>Login with Google</h1>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      );
}

export default GoogleLoginComp;