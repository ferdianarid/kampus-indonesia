import UserLayout from "@components/layouts/AdminLayout";
import { signOut } from "next-auth/react";

const Home = () => {
    return (
        <UserLayout>
            <div>Dashboard</div>
            <button onClick={() => signOut()}>Logout</button>
        </UserLayout>
    );
};

Home.auth = {
    role: "user",
};

export default Home;
