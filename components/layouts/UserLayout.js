import Link from "next/link";
import Router from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Sidebar from "@components/Sidebar";

const UserLayout = ({ children }) => {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== "undefined" && loading) return null;

    if (!session && !loading) Router.push("/login");

    return (
        <>
            <header>
                {session && (
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main className="bg-[#F4F8FB] w-full p-5">
                            {children}
                        </main>
                    </div>
                )}
            </header>
        </>
    );
};

export default UserLayout;
