import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    console.log('hello');
    return <button className="bg-danger" onClick={() => loginWithRedirect()}>Login</button>;
};

export default LoginButton;
