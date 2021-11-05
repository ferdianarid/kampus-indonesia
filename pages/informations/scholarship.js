import UserLayout from "@components/layouts/AdminLayout";
const scholarship = () => {
    return (
        <UserLayout>
            <div className="flex items-center justify-center min-h-full min-w-full">
                Coming Soon
            </div>
        </UserLayout>
    );
};

scholarship.auth = {
    role: "user",
};

export default scholarship;
