import CryptoJS from "crypto-js";

export const numberCards = 50;
const password = "Valantis";
const port = 41000;
const limit = 70;
const baseURL = `https://api.valantis.store:${port}/`;
const timestamp = new Date().toISOString().slice(0, 10).split("-").join("");
const authString = CryptoJS.MD5(`${password}_${timestamp}`).toString();

const names = {
  Название: "product",
  Цена: "price",
  Бренд: "brand",
};

export const getIds = async (offset) => {
  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify({
      action: "get_ids",
      params: { offset, limit },
    }),
  })
    .then((data) => data.json())
    .then((data) => data.result);
  return res;
};

export const getItems = async (ids) => {
  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify({
      action: "get_items",
      params: { ids },
    }),
  })
    .then((data) => data.json())
    .then((data) => data.result);
  return res;
};

export const getFilteredItems = async (title, value) => {
  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify({
      action: "filter",
      params: { [names[title]]: names[title] === "price" ? +value : value },
    }),
  })
    .then((res) => res.json())
    .then((data) => data.result);
  return res;
};

export const getFields = async () => {
  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify({
      action: "get_fields",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
};

export function onError(error, reLoad, setError) {
  if (!reLoad) setError(true);
  console.log(error);
}

export function removeDuplicates(arr, amount) {
  const table = {};
  const res = arr
    .filter(({ id }) => !table[id] && (table[id] = 1))
    .filter((_, index) => index < amount);
  return res;
}

export function fillArray(arr, reserve, amount) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
  }

  if (result.length < amount)
    return removeDuplicates([...result, ...reserve], amount);
  else if (result.length > amount) result.splice(amount);

  return result;
}
