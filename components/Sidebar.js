import Menus from "./Menus";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  return (
    <div className="min-w-[225px] grid grid-rows-[min-content,1fr,min-content] bg-primary">
      <div className="mt-3 p-5">
        <h3 className="text-xl font-bold text-white">Dashboard</h3>
        <span className="text-sm text-white">Role : Admin</span>
      </div>
      <div className="mt-10">
        <Menus />
      </div>
      <div className="flex place-content-center">
        <button onClick={() => signOut()} className="my-2 py-3 px-4 text-white">
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
