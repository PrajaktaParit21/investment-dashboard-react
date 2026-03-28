import StockCard from "../components/StockCard";
import styles from "./Dashboard.module.css";
import { useStocks } from "../hooks/useStocks";
import { useDebounce } from "../hooks/useDebounce";
import { useMemo } from "react";
import PortfolioChart from "../components/PortfolioChart";
import Header from "../components/Header";

function Dashboard() {
  const { error, isLoading, stocks, refetch } = useStocks();
  const { searchInput, searchResult, handleSearchChange } = useDebounce();

  const filteredStocks = useMemo(() => {
    if (!searchResult) return stocks;
    return stocks.filter((stock) =>
      stock.name.toLowerCase().includes(searchResult.toLowerCase()),
    );
  }, [stocks, searchResult]);

  const { totalInvestment, avgChange } = useMemo(() => {
    let totalInvestment = 0;
    let netChange = 0;
    filteredStocks.forEach((stock) => {
      totalInvestment += stock.price;
      netChange += stock.change;
    });
    const avgChange = netChange / filteredStocks.length;

    return { totalInvestment, avgChange };
  }, [filteredStocks]);

  if (error) {
    return (
      <>
       <Header />
      <div className={styles.box}>
        <div className={styles.rowContainer}>
          <span>{error}</span>
          <button onClick={refetch} disabled={isLoading}>
            {isLoading ? "Retrying..." : "Retry"}
          </button>
        </div>
      </div>
      </>
    );
  }

  const changeClass = avgChange >= 0 ? "profit" : "loss";
  return (
    <div className={styles.box}>
      {isLoading ? (
        <p>Stocks are Loading...</p>
      ) : stocks.length > 0 ? (
        <div className={styles.searchList}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search for stock name"
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <div className={styles.columnContainer}>
            <p>
              <strong>Total Investment</strong> ₹
              {totalInvestment.toLocaleString()}
            </p>
            <p>
              <strong>Net change</strong>{" "}
              <span className={changeClass}>{avgChange.toFixed(2)}%</span>
            </p>
          </div>
          <div className={styles.rowContainer}>
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <StockCard key={stock.id} {...stock} />
              ))
            ) : (
              <p>
                No stocks found for name "<strong>{searchResult}</strong>".
                Please ensure to add correct name
              </p>
            )}
          </div>
          <PortfolioChart data={filteredStocks} />
        </div>
      ) : (
        <p>Currently no stocks available</p>
      )}
    </div>
  );
}
export default Dashboard;
