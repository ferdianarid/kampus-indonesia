import ButtonPill from "@components/ButtonPill";
import { IIntership } from "interfaces/Intership";
import Image from "next/image";

const Item = (props: {
  data: IIntership;
  handleClickDelete: (id: number) => Promise<any>;
}) => {
  const { id, logo, title, company_name } = props.data;

  return (
    <div
      key={id}
      className="flex items-center py-4 border-b-2 last:border-b-0 border-gray-300"
    >
      <Image
        loading="lazy"
        src={logo}
        objectFit="cover"
        className="rounded-md"
        width={87}
        height={64}
        alt="Cover image"
      />

      <div className="ml-8 flex-grow">
        <h3 className="text-primary font-bold">{title}</h3>
        <div className="text-primary font-roboto text-sm font-light text-opacity-70">
          {company_name}
        </div>
      </div>

      <div className="flex items-center">
        <ButtonPill link={`/informations/internship/edit/${id}`}>
          Edit
        </ButtonPill>
        <button
          className="bg-primary text-white py-2 px-5 rounded-3xl mr-2"
          onClick={() => props.handleClickDelete(id)}
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default Item;
