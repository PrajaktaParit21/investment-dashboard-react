import styles from "./StockCard.module.css";

function StockCard({ name, price, change }) {
  const changeClass = change >= 0 ? styles.profit : styles.loss;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{name}</h3>
      </div>

      <div className={styles.body}>
        <p className={styles.price}>₹{price.toLocaleString()}</p>
        <p className={`${styles.change} ${changeClass}`}>
          {change >= 0 ? "+" : ""}
          {change}%
        </p>
      </div>
    </div>
  );
}

export default StockCard;