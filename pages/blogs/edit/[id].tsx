import Form from "@components/domain/blogs/Form";
import HeaderPageAdd from "@components/domain/informations/HeaderPageAdd";
import AdminLayout from "@components/layouts/AdminLayout";
import backendApi from "configs/api/backendApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const { data: session } = useSession();

  const { query } = useRouter();
  const id = parseInt(query.id as string);

  const { data, error } = useSWR(
    [`/panel/articles/show/${id}`, session],
    (endPoint, session) =>
      backendApi
        .get(endPoint, {
          headers: {
            Authorization: "Bearer " + session.access_token,
          },
        })
        .then((res) => res.data)
  );

  return (
    <>
      <AdminLayout>
        <div className="mx-10">
          <HeaderPageAdd>Edit Artikel</HeaderPageAdd>

          {!data && !error && (
            <div className="mt-20">
              <div
                className={`flex flex-col items-center justify-center space-x-2 animate-pulse`}
              >
                <div>
                  <div className="w-6 h-6 border-[3.5px] border-primary border-dotted rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
          )}

          {data &&
            (() => {
              const { title, cover, content, categories } = data.data;
              const isPublised = !data.data?.drafted_at;

              return (
                <Form
                  id={id}
                  title={title}
                  cover={cover}
                  content={content}
                  categories={categories}
                  isPublised={isPublised}
                />
              );
            })()}
          {error && "Upsss ada error nih"}
        </div>
      </AdminLayout>
    </>
  );
};

export default Edit;
