const addDashes = (num) => {
  num = String(num);

  let res = num[0];

  for (let i = 1; i < num.length; i++) {
    if (Number(num[i]) % 2 !== Number(num[i - 1]) % 2) {
      res += '-';
    }

    res += num[i];
  }

  return res;
};
