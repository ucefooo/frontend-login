import React, { FC } from "react"
import { Button } from "./ui/button"


interface googleSignInButtonProps {
    children: React.ReactNode;
}
const GoogleSignInButton: FC<googleSignInButtonProps> = ({children}) => {
    
    const loginWithGoogle = () => {
        console.log('login with google');
    };

    return <Button onClick={loginWithGoogle} className='w-full'>{children}</Button>
}

export default GoogleSignInButton;