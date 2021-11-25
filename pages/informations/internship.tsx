import AdminLayout from "@components/layouts/AdminLayout";

const Internship = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-full min-w-full">
        Coming Soon
      </div>
    </AdminLayout>
  );
};

Internship.auth = {
  role: "user",
};

export default Internship;
