import styles from "./form.module.css";

const notFoundText = "По данному запросу товаров не найдено";

const Form = ({
  handleSubmit,
  handleSelect,
  inputValue,
  filterName,
  setInputValue,
  searchUnsuccessful,
  setSearchUnsuccessful,
}) => {
  const handleChangeInput = (e) => {
    setSearchUnsuccessful(false);
    setInputValue(e.target.value);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>Фильтровать</h3>
      <div className={styles.controls}>
        <p
          className={`${styles.notFound} ${
            searchUnsuccessful ? styles.show : ""
          }`}
        >
          {notFoundText}
        </p>
        <select className={styles.select} name="select" onChange={handleSelect}>
          <option className={styles.option} value={"Название"} defaultValue>
            По названию
          </option>
          <option className={styles.option} value={"Цена"}>
            По цене
          </option>
          <option className={styles.option} value={"Бренд"}>
            По бренду
          </option>
        </select>
        <div className={styles.search}>
          <input
            className={styles.input}
            value={inputValue}
            type={filterName === "Цена" ? "number" : "text"}
            placeholder={filterName}
            onChange={handleChangeInput}
          />
          <button
            className={styles.searchBtn}
            disabled={inputValue ? false : true}
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
