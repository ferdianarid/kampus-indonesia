import React from "react";
import Form from "@components/domain/informations/events/Form";
import HeaderPageAdd from "@components/domain/informations/HeaderPageAdd";
import AdminLayout from "@components/layouts/AdminLayout";

const AddUniversity = () => {
  return (
    <AdminLayout>
      <div className="mx-10">
        <HeaderPageAdd>Buat Event</HeaderPageAdd>
        <Form />
      </div>
    </AdminLayout>
  );
};

AddUniversity.auth = {
  role: "admin",
};

export default AddUniversity;
