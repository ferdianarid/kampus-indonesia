import Menus from "./Menus";
import { signOut } from "next-auth/react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsopen] = useState(false);

  return (
    <div className="w-full lg:h-full bg-primary relative z-50">
      <div
        className={`${
          !isOpen && "-top-full"
        } transition-all duration-300 fixed lg:relative lg:top-0 bg-primary grid grid-rows-[min-content,1fr,min-content] h-screen w-screen lg:h-full lg:w-full`}
      >
        <div className="lg:mt-3 p-5">
          <h3 className="text-xl font-bold text-white">Dashboard</h3>
          <span className="text-sm text-white">Role : Admin</span>
        </div>
        <div className="mt-10">
          <Menus />
        </div>
        <div className="flex place-content-center">
          <button
            onClick={() => signOut()}
            className="my-2 py-3 px-4 text-white"
          >
            Keluar
          </button>
        </div>
      </div>
      <div className="lg:hidden flex items-center justify-end text-white py-8 px-10">
        <button
          className="fixed p-1 active:outline-white"
          onClick={() => setIsopen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
