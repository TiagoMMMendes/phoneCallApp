var x = (value) => {
  console.log(value);
};
const we = {};
we["1"] = setTimeout(() => {
  x("x");
}, 1000);

console.log(we["1"]);
