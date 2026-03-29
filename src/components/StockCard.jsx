import { useNavigate } from "react-router-dom";
import styles from "./StockCard.module.css";
import { useGlobals } from "../context/StockContext.jsx";

function StockCard({ stock, isSelected }) {
  const { addStock, removeStock } = useGlobals();
  const { name, price, change } = stock;
  const changeClass = change >= 0 ? styles.profit : styles.loss;
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/stock/${stock.id}`)} className={styles.card}>
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
      {isSelected ? (
        <button
          className={styles.removeBtn}
          onClick={(e) => {
            e.stopPropagation();
            removeStock(stock);
          }}
        >
          Remove
        </button>
      ) : (
        <button
          className={styles.addBtn}
          onClick={(e) => {
            e.stopPropagation();
            addStock(stock);
          }}
        >
          Add
        </button>
      )}
    </div>
  );
}

export default StockCard;
