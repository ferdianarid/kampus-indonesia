import UserLayout from "@components/layouts/AdminLayout";

const event = () => {
    return (
        <UserLayout>
            <div className="flex items-center justify-center min-h-full min-w-full">
                Coming Soon
            </div>
        </UserLayout>
    );
};

event.auth = {
    role: "user",
};

export default event;
