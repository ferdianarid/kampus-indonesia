export const handleCheckAll = ({
  setStateList,
  stateList,
  setStateCheckAll,
}) => {
  const checkCounter = stateList.reduce((prev, curr) => {
    if (curr.isChecked) prev++;
    return prev;
  }, 0);

  let isAll = false;
  // jika jumlah check tidak sama dgn panjang univ maka check semua
  if (checkCounter < stateList.length) isAll = true;

  const newList = stateList.map((item) => {
    item.isChecked = isAll;
    return item;
  });
  setStateList(newList);
  setStateCheckAll(isAll);
};

export const handleChangeCheck = ({
  id,
  setCheckAll,
  stateList,
  setStateList,
}) => {
  let isAll = true;
  const updatedList = stateList.map((item) => {
    if (item.id === id) {
      item.isChecked = !item.isChecked;
    }

    if (!item.isChecked) isAll = false;

    return item;
  });
  console.log(isAll);

  setCheckAll(isAll);
  setStateList(updatedList);
};
