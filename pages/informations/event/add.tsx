import React from "react";
import HeaderPageAdd from "@components/domain/informations/HeaderPageAdd";
import AdminLayout from "@components/layouts/AdminLayout";
import Form from "@components/domain/informations/event/Form";

const Add = () => {
  return (
    <AdminLayout>
      <div className="mx-10">
        <HeaderPageAdd>Buat Informasi Event</HeaderPageAdd>
        <Form />
      </div>
    </AdminLayout>
  );
};

Add.auth = {
  role: "admin",
};

export default Add;
