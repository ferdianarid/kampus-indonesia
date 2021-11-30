import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Auth = ({ authenticatedRedirect, role, children, ...props }) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  React.useEffect(() => {
    if (status === "loading") return null;
    if (!isUser & !authenticatedRedirect) signIn();
  }, [isUser, status, authenticatedRedirect]);

  if (isUser) {
    // Redirect ke authenticatedRedirect
    if (!!authenticatedRedirect) {
      window.location.replace(authenticatedRedirect);
      return null;
    }

    // denied jika role tidak sesuai
    if (role && role !== session.user.role) {
      return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
          <div>Access denied for {session.user.role}</div>
          <button
            className="px-4 py-2 bg-primary rounded-md text-white"
            onClick={() => {
              signOut();
            }}
          >
            Sign
          </button>
        </div>
      );
    }

    return children;
  }
  // show page di authenticatedRedirect jika user belum login
  else if (!!authenticatedRedirect) {
    return children;
  }

  return null;
};

export default Auth;
