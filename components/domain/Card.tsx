import Image from "next/image";

interface ContainerCardProps {
  className?: string;
  children: any;
}

interface HeaderCardProps {
  setOpen: () => any;
  title: string;
  isOpen: boolean;
}

export const ContainerCard = ({
  className,
  children,
  ...props
}: ContainerCardProps) => {
  return (
    <div className={`mb-5 bg-white ${className}`} {...props}>
      {children}
    </div>
  );
};

export const HeaderCard = ({ setOpen, title, isOpen }: HeaderCardProps) => {
  return (
    <div
      onClick={setOpen}
      className="border flex justify-between items-center py-2 px-4 bg-[#F5F5F5]"
    >
      <div>{title}</div>
      <Image
        width={9}
        height={9}
        objectFit="contain"
        src="/icons/up.svg"
        alt="Icon up"
        className={`${isOpen && "rotate-180"}`}
      />
    </div>
  );
};

export const BodyCard = ({ children }) => {
  return <div className="py-2 px-3 border">{children}</div>;
};

export const FooterCard = ({ children }) => {
  return <div className="py-2 px-3 bg-[#F5F5F5] border">{children}</div>;
};
