import React, { useRef } from "react";
import { ContainerCard, HeaderCard, BodyCard, FooterCard } from "./Card";
import MyButton from "@components/inputs/Button";
import Image from "next/image";
import Spinner from "@components/Spinner";
import backendApi from "configs/api/backendApi";
import { useSession } from "next-auth/react";
import { commonErrorHandler } from "@utils/index";
import { useState } from "react";

const Publish = ({
  id,
  isPublised,
  isFetching,
  clickDraft,
  className,
  ...props
}) => {
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
          <div>
            <ContainerItem>
              <Switch id={id} isPublised={isPublised} className={`ml-4`} />
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
            {isFetching ? <Spinner /> : "Save"}
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

const Switch = ({ id, isPublised, className }) => {
  const [isChecked, setIsChecked] = useState(isPublised);
  const { data: session } = useSession();

  const handleChange = async (e) => {
    const checked = e.target.checked;

    try {
      let endPoint = "";
      if (checked) {
        endPoint = `/panel/articles/publish/${id}`;
      } else {
        endPoint = `/panel/articles/drafted/${id}`;
      }

      setIsChecked(checked);
      await backendApi
        .post(
          endPoint,
          {},
          {
            headers: {
              Authorization: "Bearer " + session.access_token,
            },
          }
        )
        .then((res) => res.data);
    } catch (error) {
      setIsChecked(!checked);
      commonErrorHandler(error);
    }
  };
  return (
    <div className={`${className}`}>
      <style jsx>
        {`
          .toggle-checkbox:checked {
            @apply right-0 border-primary;
          }
          .toggle-checkbox:checked + .toggle-label {
            @apply bg-primary;
          }
        `}
      </style>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          onChange={handleChange}
          checked={isChecked}
          type="checkbox"
          name="toggle"
          id="toggle"
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <label
          htmlFor="toggle"
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
      <label
        htmlFor="toggle"
        className="text-gray-700 select-none cursor-pointer"
      >
        Publish
      </label>
    </div>
  );
};

export default Publish;
