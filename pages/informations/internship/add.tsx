import React from "react";
import HeaderPageAdd from "@components/domain/informations/HeaderPageAdd";
import AdminLayout from "@components/layouts/AdminLayout";
import Form from "@components/domain/informations/internship/Form";

const Add = () => {
  return (
    <AdminLayout>
      <div className="mx-10">
        <HeaderPageAdd>Buat Informasi Magang</HeaderPageAdd>
        <Form id={1} />
      </div>
    </AdminLayout>
  );
};

Add.auth = {
  role: "admin",
};

export default Add;
