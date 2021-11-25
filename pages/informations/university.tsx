import Head from "next/head";
import UnivItem from "@components/UnivItem";
import HeaderPagesInformation from "@components/HeaderPagesInformation";
import MyCheckbox from "@components/MyCheckbox";
import { useState, useEffect } from "react";
import UserLayout from "@components/layouts/AdminLayout";

const University = () => {
  const [universities, setUniversities] = useState([]);
  const [isCheckAll, setCheckAll] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch("/api/informations/universitys");
        const resJson = await res.json();
        const univ = resJson.map((item) => ({ ...item, isChecked: false }));
        setUniversities(univ);
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }, []);

  function handleChangeCheck(id) {
    const updatedUniv = universities.map((item) => {
      if (item.id === id) {
        item.isChecked = !item.isChecked;
        return item;
      }

      return item;
    });

    setUniversities(updatedUniv);
  }

  const handleCheckAll = () => {
    const checkCounter = universities.reduce((prev, curr) => {
      if (curr.isChecked) prev++;
      return prev;
    }, 0);

    let isAll = false;
    // jika jumlah check tidak sama dgn panjang univ maka check semua
    if (checkCounter < universities.length) isAll = true;

    setCheckAll(isAll);
    universities.map((item) => {
      item.isChecked = isAll;
      return item;
    });
  };

  return (
    <UserLayout>
      <Head>
        <title>Informasi Kampus / Jurusan</title>
      </Head>
      <div>
        <HeaderPagesInformation
          title="Informasi Kampus / Jurusan"
          uploadPagePath="/informations/university/add"
        />
        <div className="bg-white rounded-md mt-8">
          <div className=" border-gray-300">
            <div className="p-4 flex justify-between">
              <MyCheckbox
                label="Select All"
                name="checkall"
                isChecked={isCheckAll}
                onChange={handleCheckAll}
              />
              <div className="flex items-center">
                <label className="mr-3">Filter By</label>
                <select className="border-2 border-gray-300 px-3 py-1 rounded-md min-w-[190px] mr-3">
                  <option value="">All post</option>
                </select>
                <input
                  className="bg-search border-2 border-gray-300 px-3 pl-8 py-1 rounded-md min-w-[190px]"
                  placeholder="Search"
                />
              </div>
            </div>
            {universities.map(({ id, name, address, img, isChecked }) => (
              <UnivItem
                id={id}
                key={id}
                name={name}
                address={address}
                img={img}
                isChecked={isChecked}
                onChangeCheck={(e) => {
                  handleChangeCheck(id);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

University.auth = {
  role: "admin",
};

export default University;
