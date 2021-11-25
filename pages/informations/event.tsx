import AdminLayout from "@components/layouts/AdminLayout";

const Event = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-full min-w-full">
        Coming Soon
      </div>
    </AdminLayout>
  );
};

Event.auth = {
  role: "user",
};

export default Event;
