import React from "react";
import { signIn, useSession } from "next-auth/react";

const Auth = ({ children, ...props }) => {
    const { data: session, status } = useSession();
    const isUser = !!session?.user;

    React.useEffect(() => {
        // When rendering client side don't display anything until loading is complete
        if (status === "loading") return null;
        if (!isUser) signIn();
    }, [isUser, status]);

    if (isUser) {
        return children;
    }

    return null;
};

export default Auth;
