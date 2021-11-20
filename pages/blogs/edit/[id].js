import Form from "@components/domain/blogs/Form";
import HeaderPageAdd from "@components/domain/informations/HeaderPageAdd";
import AdminLayout from "@components/layouts/AdminLayout";
import { useRouter } from "next/router";

const Edit = () => {
  const {query} = useRouter();
  

  return (
    <>
      <AdminLayout>
        <div className="mx-10">
          <HeaderPageAdd>Edit Artikel</HeaderPageAdd>
          <Form type="edit" values={""} />
        </div>
      </AdminLayout>
    </>
  );
};

export default Edit;
