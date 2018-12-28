export const getItemById = (list, id) => {
  const filteredList = list.filter(item => {
    return item.id === id;
  });
  if (filteredList.length === 0) {
    return null;
  }
  return filteredList[0];
};