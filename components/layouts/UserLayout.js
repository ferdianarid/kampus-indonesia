import Sidebar from "@components/Sidebar";

const UserLayout = ({ children }) => {
    return (
        <>
            <header>
                <div className="flex min-h-screen">
                    <Sidebar />
                    <main className="bg-[#F4F8FB] w-full p-5">{children}</main>
                </div>
            </header>
        </>
    );
};

export default UserLayout;
