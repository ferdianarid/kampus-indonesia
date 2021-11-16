import Sidebar from "@components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-[1fr] lg:grid-cols-[225px,1fr] min-w-screen max-w-screen min-h-screen max-h-screen">
      <div>
        <Sidebar />
      </div>
      <main className="bg-[#F4F8FB] p-5 min-h-screen max-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
