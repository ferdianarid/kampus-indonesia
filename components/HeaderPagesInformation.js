import Link from "next/link";

const HeaderPagesInformation = ({ title, uploadPagePath }) => {
    return (
        <header className="mt-12 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-primary">{title}</h1>
            <Link href={uploadPagePath}>
                <a className="bg-primary rounded-xl text-white px-5 py-2">
                    Upload
                </a>
            </Link>
        </header>
    );
};

export default HeaderPagesInformation;
