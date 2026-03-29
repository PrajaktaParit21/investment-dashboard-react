import { useParams, useNavigate } from "react-router-dom";
import PortfolioChart from "../components/PortfolioChart";
import styles from "./StockDetails.module.css";
import { useGlobals } from "../context/StockContext";

function StockDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {exploreStocks, selectedStocks} = useGlobals();

  const stock = [...exploreStocks,...selectedStocks].find((s) => s.id == id);
  if (!stock) {
    return (
      <div className={styles.container}>
         <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>
        <p>Stock not found</p>
      </div>
    );
  }
  const chartData = Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    price: +(stock.price + Math.random() * 200 - 100).toFixed(2),
  }));

  const changeClass = stock.change >= 0 ? styles.profit : styles.loss;

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.card}>
        <h2>{stock.name}</h2>

        <p className={styles.price}>₹{stock.price.toLocaleString()}</p>

        <span className={changeClass}>
          {stock.change >= 0 ? "+" : ""}
          {stock.change}%
        </span>
      </div>

      {/* Chart */}
      <div className={styles.chart}>
        <PortfolioChart data={chartData} />
      </div>
    </div>
  );
}

export default StockDetails;
