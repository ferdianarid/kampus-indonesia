import AdminLayout from "@components/layouts/AdminLayout";

const Home = () => {
  
  return (
    <AdminLayout>
      <div></div>
    </AdminLayout>
  );
};

Home.auth = {
  role: "admin",
};

export default Home;
