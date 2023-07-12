function capitalize(str) {
  const arr = str.split(" ");
  const newArr = arr.map((item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  });
  return newArr.join(" ");
}

export default capitalize;
