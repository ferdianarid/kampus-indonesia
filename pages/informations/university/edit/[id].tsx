import React from "react";
import HeaderPageAdd from "@components/domain/informations/HeaderPageAdd";
import AdminLayout from "@components/layouts/AdminLayout";
import Form from "@components/domain/informations/university/Form";
import { useRouter } from "next/router";

const Edit = () => {
  const { query } = useRouter();
  const id = parseInt(query.id as string);

  return (
    <AdminLayout>
      <div className="mx-10">
        <HeaderPageAdd>Edit Informasi Universitas</HeaderPageAdd>
        <Form id={id} />
      </div>
    </AdminLayout>
  );
};

Edit.auth = {
  role: "admin",
};

export default Edit;
