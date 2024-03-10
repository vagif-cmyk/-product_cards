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
  let res;
  async function fetchData() {
    return await fetch(baseURL, {
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
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => data.result);
  }
  try {
    res = await fetchData();
    return res;
  } catch (e) {
    console.log(e);
    res = await fetchData();
    return res;
  }
};

export const getItems = async (ids) => {
  let res;
  async function fetchData() {
    return await fetch(baseURL, {
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
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => data.result);
  }
  try {
    res = await fetchData();
    return res;
  } catch (e) {
    console.log(e);
    res = await fetchData();
    return res;
  }
};

export const getFilteredItems = async (title, value) => {
  let res;
  async function fetchData() {
    return await fetch(baseURL, {
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
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => data.result);
  }
  try {
    res = await fetchData();
    return res;
  } catch (e) {
    console.log(e);
    res = await fetchData();
    return res;
  }
};



