import React from "react";
import { ContainerCard, HeaderCard, BodyCard } from "./Card";

const CardCategory = () => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [activePage, setActivePage] = React.useState(0);

    return (
        <ContainerCard>
            <HeaderCard
                title="Categories"
                setOpen={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
            />
            {isOpen && (
                <BodyCard>
                    <div className="flex">
                        <button
                            type="button"
                            className={`px-4 py-2 ${
                                activePage === 0 && "bg-[#F5F5F5]"
                            }`}
                            onClick={() => setActivePage(0)}
                        >
                            All Categories
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 ${
                                activePage === 1 && "bg-[#F5F5F5]"
                            }`}
                            onClick={() => setActivePage(1)}
                        >
                            Most Used
                        </button>
                    </div>
                    <div className="bg-[#F5F5F5]">
                        <div
                            className={`px-4 py-3 ${
                                activePage !== 0 && "hidden"
                            }`}
                        >
                            <CheckBoxItem>Negeri</CheckBoxItem>
                            <CheckBoxItem>Swasta</CheckBoxItem>
                            <CheckBoxItem>Akreditasi A</CheckBoxItem>
                            <CheckBoxItem>Akreditasi B</CheckBoxItem>
                            <CheckBoxItem>Akreditasi C</CheckBoxItem>
                            <CheckBoxItem>S1</CheckBoxItem>
                        </div>
                        <div
                            className={`px-4 py-3 ${
                                activePage !== 1 && "hidden"
                            }`}
                        >
                            test
                        </div>
                    </div>
                </BodyCard>
            )}
        </ContainerCard>
    );
};

const CheckBoxItem = ({ children, ...props }) => {
    return (
        <label className="flex items-center">
            <input type="checkbox" className="mr-2" {...props} />
            {children}
        </label>
    );
};

export default CardCategory;
