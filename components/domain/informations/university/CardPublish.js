import React from "react";
import { ContainerCard, HeaderCard, BodyCard, FooterCard } from "./Card";
import MyButton from "@components/inputs/Button";

const Publish = ({ className, ...props }) => {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
        <ContainerCard>
            <HeaderCard
                title="Publish"
                setOpen={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
            />
            {isOpen && (
                <BodyCard>
                    <div className="flex justify-between mb-3">
                        <Button type="button">Save Draft</Button>
                        <Button type="button">Preview</Button>
                    </div>
                    <div>
                        <ContainerItem>
                            <img
                                width="12"
                                src="/icons/key.svg"
                                className="mr-3"
                            />
                            <span>Status : Draft</span>
                            <a
                                href="/"
                                className="underline text-blue-700 ml-2"
                            >
                                Edit
                            </a>
                        </ContainerItem>
                        <ContainerItem>
                            <img
                                width="14"
                                src="/icons/eye.svg"
                                className="mr-3"
                            />
                            <span>Visibility : Public</span>
                            <a
                                href="/"
                                className="underline text-blue-700 ml-2"
                            >
                                Edit
                            </a>
                        </ContainerItem>
                        <ContainerItem>
                            <img
                                width="14"
                                src="/icons/calendar.svg"
                                className="mr-3"
                            />
                            <span>Publish : Immediately</span>
                            <a
                                href="/"
                                className="underline text-blue-700 ml-2"
                            >
                                Edit
                            </a>
                        </ContainerItem>
                    </div>
                </BodyCard>
            )}

            <FooterCard>
                <div className="flex justify-between items-center px-5">
                    <span className="flex items-center">
                        <img src="/icons/trash.svg" className="mr-2" />
                        <span className="underline">Move Trash</span>
                    </span>
                    <MyButton className="px-6">Publish</MyButton>
                </div>
            </FooterCard>
        </ContainerCard>
    );
};

const ContainerItem = ({ children }) => {
    return <div className="flex items-center mb-2">{children}</div>;
};

export const Button = ({ children, ...props }) => {
    return (
        <button className="px-2 py-1 border bg-[#F7F7F7]" {...props}>
            {children}
        </button>
    );
};

export default Publish;
