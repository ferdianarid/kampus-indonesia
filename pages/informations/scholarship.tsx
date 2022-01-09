import AdminLayout from "@components/layouts/AdminLayout";

const Scholarship = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-screen min-w-full">
        Coming Soon
      </div>
    </AdminLayout>
  );
};

Scholarship.auth = {
  role: "admin",
};

export default Scholarship;
