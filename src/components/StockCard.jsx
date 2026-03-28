import styles from "./StockCard.module.css"
function StockCard({ name, price, change }){
    const changeClass = change >= 0 ? styles.profit : styles.loss;
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
       <p>₹{price}</p>
        <span className={changeClass}>{change}%</span>
    </div>
  );
}
export default StockCard;
