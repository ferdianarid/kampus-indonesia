import AdminLayout from "@components/layouts/AdminLayout";

const Home = () => {
  return <AdminLayout></AdminLayout>;
};

Home.auth = {
  role: "admin",
};

export default Home;
