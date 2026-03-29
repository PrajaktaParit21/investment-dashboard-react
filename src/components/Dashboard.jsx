import StockCard from "./StockCard";
import styles from "./Dashboard.module.css";
import { useDebounce } from "../hooks/useDebounce";
import { useMemo, useState } from "react";
import PortfolioChart from "./PortfolioChart";
import SortPanel from "./SortPanel";
import { useGlobals } from "../context/StockContext.jsx";

function Dashboard() {
  const {error, isLoading, selectedStocks, refetch} = useGlobals()
  const { searchInput, searchResult, handleSearchChange } = useDebounce();
  const [sortBy, setSortBy] = useState("price-high");

  const filteredStocks = useMemo(() => {
    if (!searchResult) return selectedStocks;
    return selectedStocks.filter((stock) =>
      stock.name.toLowerCase().includes(searchResult.toLowerCase()),
    );
  }, [selectedStocks, searchResult]);

  let { totalInvestment, avgChange } = useMemo(() => {
    let totalInvestment = 0;
    let netChange = 0;
    let avgChange = 0;
    filteredStocks.forEach((stock) => {
      totalInvestment += stock.price;
      netChange += stock.change;
    });

    if (filteredStocks.length) avgChange = netChange / filteredStocks.length;

    return { totalInvestment, avgChange };
  }, [filteredStocks]);

  const sortedStocks = useMemo(() => {
    let sorted = [...filteredStocks];

    if (sortBy === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "change-high") {
      sorted.sort((a, b) => b.change - a.change);
    } else if (sortBy === "change-low") {
      sorted.sort((a, b) => a.change - b.change);
    }

    return sorted;
  }, [filteredStocks, sortBy]);
  if (error) {
    return (
      <>
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
    <>
      <div className={styles.box}>
        {isLoading ? (
          <p>Stocks are Loading...</p>
        ) : selectedStocks.length > 0 ? (
          <div className={styles.searchList}>
            <div className={styles.controls}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search for stock name"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
              />

              {sortedStocks.length > 0 && (
                <SortPanel sortBy={sortBy} setSortBy={setSortBy} />
              )}
            </div>
            <div className={styles.columnContainer}>
              <div className={styles.summaryCard}>
                <p>Total Investment</p>
                <h2>₹{totalInvestment.toLocaleString()}</h2>
              </div>

              <div className={styles.summaryCard}>
                <p>Net Change</p>
                <h2 className={changeClass}>{avgChange.toFixed(2)}%</h2>
              </div>
            </div>
            <PortfolioChart data={sortedStocks} />

            <div className={styles.rowContainer}>
              {sortedStocks.length > 0 ? (
                sortedStocks.map((stock) => (
                  <StockCard
                    key={stock.id}
                    stock={stock}
                    isSelected={true}
                  />
                ))
              ) : (
                <p style={{ color: "var(--color-text-secondary)" }}>
                  No results found for "<strong>{searchResult}</strong>"
                </p>
              )}
            </div>
          </div>
        ) : (
          <p>Currently no stocks available</p>
        )}
      </div>
    </>
  );
}
export default Dashboard;
