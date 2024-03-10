import styles from "./item.module.css";

const Item = ({ item }) => {
  return (
    <li className={styles.card}>
      <h2 className={styles.cardTitle}>{item.product}</h2>
      <div className={styles.id}>
        <span>id:</span>
        <p>{item.id}</p>
      </div>
      <div className={styles.price}>
        <span>цена:</span>
        <p>{item.price}</p>
      </div>
      <div className={styles.brand}>
        <span>бренд:</span>
        <p>{item.brand || "уточняем"}</p>
      </div>
    </li>
  );
};

export default Item;
