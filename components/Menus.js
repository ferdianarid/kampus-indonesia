import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Menus = () => {
    return (
        <div>
            <Menu href="/">Dashboard</Menu>
            <ContainerSubmenu text="Informasi">
                <Menu href="/informations/university">Kampus / Jurusan</Menu>
                <Menu href="/informations/scholarship">Beasiswa</Menu>
                <Menu href="/informations/event">Event</Menu>
                <Menu href="/informations/internship">Magang</Menu>
            </ContainerSubmenu>
        </div>
    )
}

const ContainerSubmenu = ({ text, children }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <div className="bg-[#356395] bg-opacity-30">
            <div onClick={() => setIsOpen(!isOpen)} className={`px-5 cursor-pointer py-3 text-white hover:bg-[#356395] flex justify-between items-center  ${isOpen && 'bg-[#356395]'}`}>
                {text}
                <img src="/icons/chevron-right.svg" width="5px" className={`${isOpen && 'rotate-90'}`} />
            </div>
            {isOpen && children}
        </div>
    )
}

const Menu = ({ href, children }) => {
    const { pathname } = useRouter()

    // active when url is this page
    const itsPage = pathname === href
    return (
        <Link href={href}>
            <a className={`${itsPage && 'bg-[#356395]'} cursor-pointer px-5 py-3 text-white hover:bg-[#356395] flex justify-between items-center`}>
                {children}
            </a>
        </Link>
    )
}

export default Menus
