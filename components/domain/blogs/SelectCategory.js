import React, { useState, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import backendApi from "configs/api/backendApi";

const SelectCategory = ({ value, onChange, ...props }) => {
  const [category, setCategory] = useState([]);
  const { data, error } = useSWRImmutable("/categories", backendApi.get);

  useEffect(() => {
    if (data) {
      setCategory(data.data.data);
    }
  }, [data]);

  return (
    <select
      value={value}
      onChange={onChange}
      className="my-select min-w-[190px] mr-3"
      {...props}
    >
      {error && <option>Error</option>}
      {!data && <option value="">All post</option>}
      {data && (
        <>
          <option value="">All post</option>
          {category.map((item) => (
            <option key={item.slug} value={item.id}>
              {item.name}
            </option>
          ))}
        </>
      )}
    </select>
  );
};

export default SelectCategory;
