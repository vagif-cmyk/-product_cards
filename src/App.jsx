import { useEffect, useState } from "react";
import styles from "./app.module.css";
import ItemsList from "./components/itemsList/ItemsList";
import {
  fillArray,
  getFilteredItems,
  getIds,
  getItems,
  numberCards,
  removeDuplicates,
} from "./api/getStore";
import Pagination from "./components/pagination/Pagination";
import Form from "./components/form/form";

function App() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [filterName, setFilterName] = useState("Название");
  const [inputValue, setInputValue] = useState("");
  const [searchUnsuccessful, setSearchUnsuccessful] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const ids = await getIds(offset);
      const items = await getItems(ids);
      const uniqueItems = removeDuplicates(items, 50);
      setItems(uniqueItems);
      setLoading(false);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
      fetchData();
    }
  }, [offset]);

  const handleSelect = (e) => {
    setFilterName(e.target.value);
    setInputValue("");
    setSearchUnsuccessful(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      try {
        setLoading(true);
        const filteredItems = await getFilteredItems(filterName, inputValue);
        if (filteredItems.length === 0) {
          setLoading(false);
          setSearchUnsuccessful(true);
          return;
        }
        const values = await getItems(filteredItems);
        const uniqueItems = removeDuplicates(values, 50);
        const filledArray = fillArray(uniqueItems, items, 50);
        setItems(filledArray);
      } catch (error) {
        console.log(error);
        handleSubmit(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Список товаров</h1>
      <div className={styles.header}>
        <Pagination
          offset={offset}
          setOffset={setOffset}
          items={items}
          loading={loading}
        />
        <Form
          handleSubmit={handleSubmit}
          handleSelect={handleSelect}
          inputValue={inputValue}
          filterName={filterName}
          setInputValue={setInputValue}
          searchUnsuccessful={searchUnsuccessful}
          setSearchUnsuccessful={setSearchUnsuccessful}
        />
      </div>
      <ItemsList loading={loading} items={items} count={numberCards} />
    </main>
  );
}

export default App;
