export const handleCheckAll = ({ stateList, setStateCheckAll }) => {
  const checkCounter = stateList.reduce((prev, curr) => {
    if (curr.isChecked) prev++;
    return prev;
  }, 0);

  let isAll = false;
  // jika jumlah check tidak sama dgn panjang univ maka check semua
  if (checkCounter < stateList.length) isAll = true;

  setStateCheckAll(isAll);
};

export const handleChangeCheck = ({ id, stateList, setStateList }) => {
  const updatedStateList = stateList.map((item) => {
    if (item.id === id) {
      item.isChecked = !item.isChecked;
      return item;
    }

    return item;
  });

  setStateList(updatedStateList);
};
