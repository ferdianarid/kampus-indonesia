import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import isServer from "@utils/isServer";

const Menus = () => {
  return (
    <div>
      <Menu href="/">Dashboard</Menu>
      <ContainerSubmenu text="Blog">
        <Menu href="">Posts</Menu>
        <Menu href="/blogs/published">Terpublish</Menu>
        <Menu href="/blogs/draft">Draft</Menu>
        <Menu href="/blogs/trash">Sampah</Menu>
      </ContainerSubmenu>
      <ContainerSubmenu text="Informasi">
        <Menu href="/informations/university">Kampus / Jurusan</Menu>
        <Menu href="/informations/scholarship">Beasiswa</Menu>
        <Menu href="/informations/events">Event</Menu>
        <Menu href="/informations/internship">Magang</Menu>
      </ContainerSubmenu>
    </div>
  );
};

const ContainerSubmenu = ({ text, children }) => {
  const containerUrl = window.location.pathname.split("/").at(1); // ['', 'informations', 'event']
  const itsOpened = containerUrl === "informations";
  const [isOpen, setIsOpen] = React.useState(itsOpened);

  // active when submenu opened
  return (
    <div className="bg-[#356395] bg-opacity-30">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`px-5 cursor-pointer py-3 text-white hover:bg-[#356395] flex justify-between items-center  ${
          isOpen && "bg-[#356395]"
        }`}
      >
        {text}
        <Image
          src="/icons/chevron-right.svg"
          width="5px"
          height={"10px"}
          alt="Icon right"
          className={`${isOpen && "rotate-90"}`}
        />
      </div>
      {isOpen && children}
    </div>
  );
};

const Menu = ({ href, children }) => {
  // active when url is this page
  const itsPage = window.location.pathname === href;
  return (
    <Link href={href}>
      <a
        className={`${
          itsPage && "bg-[#356395]"
        } cursor-pointer px-5 py-3 text-white hover:bg-[#356395] flex justify-between items-center`}
      >
        {children}
      </a>
    </Link>
  );
};

export default Menus;
