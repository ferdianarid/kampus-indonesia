import Sidebar from "@components/Sidebar";
import { ToastContainer } from "react-toastify";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-[1fr] lg:grid-cols-[225px,1fr] grid-rows-[max-content,1fr] lg:grid-rows-1 h-screen max-h-screen overflow-y-hidden">
        <div>
          <Sidebar />
        </div>
        <div className="bg-[#F4F8FB] p-5 h-full overflow-y-auto w-full relative">
          <div>{children} </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AdminLayout;
