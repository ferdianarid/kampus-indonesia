import React from "react";
import HeaderPageAdd from "@components/domain/informations/HeaderPageAdd";
import AdminLayout from "@components/layouts/AdminLayout";
import Form from "@components/domain/informations/schoolarship/Form";

const Add = () => {
  return (
    <AdminLayout>
      <div className="mx-10">
        <HeaderPageAdd>Buat Informasi Beasiswa</HeaderPageAdd>
        <Form />
      </div>
    </AdminLayout>
  );
};

Add.auth = {
  role: "admin",
};

export default Add;
