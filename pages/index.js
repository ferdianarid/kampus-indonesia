import UserLayout from "@components/layouts/UserLayout";
import { useSession, signIn, signOut } from "next-auth/react";

const Home = () => {
    const { data: session, status } = useSession();
    console.log(session);
    return (
        <UserLayout>
            <div>Dashboard</div>
            <button onClick={() => signOut()}>Logout</button>
        </UserLayout>
    );
};

export default Home;
