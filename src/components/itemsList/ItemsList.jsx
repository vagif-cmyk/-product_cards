import Item from "../item/Item";
import Loader from "../loader";
import styles from "./itemsList.module.css";

const ItemsList = ({ loading, items, count }) => {
  return (
    <ul className={styles.list}>
      {loading
        ? [...new Array(count)].map((_, i) => (
            <li className={styles.emptyCard} key={i}>
              <Loader />
            </li>
          ))
        : items && items.map((item) => <Item item={item} key={item.id} />)}
    </ul>
  );
};

export default ItemsList;
