import { numberCards } from "../../api/getStore";
import Arrow from "../svg/Arrow";
import styles from "./pagination.module.css";

const Pagination = ({ offset, setOffset, items }) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.prev}
        onClick={() => setOffset((prev) => prev - numberCards)}
        disabled={offset <= 0}
      >
        <Arrow />
      </button>
      <button
        className={styles.next}
        onClick={() => setOffset((prev) => prev + numberCards)}
        disabled={!items || !items.length}
      >
        <Arrow />
      </button>
    </div>
  );
};

export default Pagination;
