import React from "react";
import { ContainerCard, HeaderCard, BodyCard, FooterCard } from "./Card";
import MyButton from "@components/inputs/Button";
import Image from "next/image";
import Link from "next/link";

const Publish = ({ clickDraft, className, ...props }) => {
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
            {/* <Button onClick={clickDraft} name="draft" type="button">
              Save Draft
            </Button> */}
            {/* <Button type="button">Preview</Button> */}
          </div>
          <div>
            <ContainerItem>
              <Image
                height={16}
                width={16}
                src="/icons/key.svg"
                alt="Icon key"
                className="mr-3"
              />
              <span className="ml-2">Status : Draft</span>
              <Link href="/">
                <a className="underline text-blue-700 ml-2">Edit</a>
              </Link>
            </ContainerItem>
            <ContainerItem>
              <Image
                width={14}
                height={14}
                objectFit="contain"
                src="/icons/eye.svg"
                alt="Icon eye"
                className="mr-3"
              />
              <span className="ml-2">Visibility : Public</span>
              <Link href="/">
                <a className="underline text-blue-700 ml-2">Edit</a>
              </Link>
            </ContainerItem>
            <ContainerItem>
              <Image
                width={14}
                height={14}
                objectFit="contain"
                src="/icons/calendar.svg"
                alt="Icon calendar"
                className="mr-3"
              />
              <span className="ml-2">Publish : Immediately</span>
              <Link href="/">
                <a className="underline text-blue-700 ml-2">Edit</a>
              </Link>
            </ContainerItem>
          </div>
        </BodyCard>
      )}

      <FooterCard>
        <div className="flex justify-between items-center px-5">
          <span className="flex items-center">
            <Image
              width={14}
              height={14}
              objectFit="contain"
              src="/icons/trash.svg"
              alt="Icon trash"
              className="mr-2"
            />
            <span className="underline">Move Trash</span>
          </span>
          <MyButton onClick={clickDraft} className="px-6">
            Save
          </MyButton>
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
