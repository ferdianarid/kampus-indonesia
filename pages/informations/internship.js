import UserLayout from "@components/layouts/AdminLayout";

const internship = () => {
    return (
        <UserLayout>
            <div className="flex items-center justify-center min-h-full min-w-full">
                Coming Soon
            </div>
        </UserLayout>
    );
};

internship.auth = {
    role: "user",
};

export default internship;
