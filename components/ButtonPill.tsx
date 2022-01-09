import Link from "next/link";

const ButtonPill = ({ link, children }) => {
  return (
    <Link href={link}>
      <a className="bg-primary text-white py-2 px-5 rounded-3xl mr-2">
        {children}
      </a>
    </Link>
  );
};
export default ButtonPill;
