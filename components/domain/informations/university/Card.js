export const ContainerCard = ({ className, children, ...props }) => {
    return (
        <div className={`mb-5 bg-white ${className}`} {...props}>
            {children}
        </div>
    );
};

export const HeaderCard = ({ setOpen, title, isOpen }) => {
    return (
        <div
            onClick={setOpen}
            className="border flex justify-between items-center py-2 px-4 bg-[#F5F5F5]"
        >
            <div>{title}</div>
            <img src="/icons/up.svg" className={`${isOpen && "rotate-180"}`} />
        </div>
    );
};

export const BodyCard = ({ children }) => {
    return <div className="py-2 px-3 border">{children}</div>;
};

export const FooterCard = ({ children }) => {
    return <div className="py-2 px-3 bg-[#F5F5F5] border">{children}</div>;
};
