import UserLayout from "@components/layouts/UserLayout";

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
