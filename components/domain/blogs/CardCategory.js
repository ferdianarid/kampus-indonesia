import backendApi from "configs/api/backendApi";
import React, { useState, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { ContainerCard, HeaderCard, BodyCard } from "../Card";
import { Controller } from "react-hook-form";

const CardCategory = ({ control, defaultCategories: defCat }) => {
  const { data, error } = useSWRImmutable("/categories", backendApi.get);
  const [categories, setCategory] = useState([]);
  const [isOpen, setIsOpen] = React.useState(true);
  const [activePage, setActivePage] = React.useState(0);

  useEffect(() => {
    if (data) {
      setCategory(data.data.data);
    }
  }, [data]);

  return (
    <ContainerCard>
      <HeaderCard
        title="Categories"
        setOpen={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      />
      {isOpen && (
        <BodyCard>
          <div className="flex">
            <button
              type="button"
              className={`px-4 py-2 ${activePage === 0 && "bg-[#F5F5F5]"}`}
              onClick={() => setActivePage(0)}
            >
              All Categories
            </button>
          </div>
          <div className="bg-[#F5F5F5]">
            <div className={`px-4 py-3 ${activePage !== 0 && "hidden"}`}>
              {categories.map((item, index) => (
                <Controller
                  key={item.id}
                  control={control}
                  name={`category[${item.id}]`}
                  defaultValue={!!defCat.find((cat) => cat.id === item.id)}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <CheckBoxItem
                      name={name}
                      onBlur={onBlur}
                      onChange={onChange}
                      checked={value}
                      ref={ref}
                    >
                      {item.name}
                    </CheckBoxItem>
                  )}
                />
              ))}
            </div>
          </div>
        </BodyCard>
      )}
    </ContainerCard>
  );
};

const CheckBoxItem = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <label className="flex items-center">
      <input ref={ref} type="checkbox" className="mr-2" {...props} />
      {children}
    </label>
  );
});

CheckBoxItem.displayName = "CheckBoxItem";

export default CardCategory;
