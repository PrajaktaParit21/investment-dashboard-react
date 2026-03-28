import StockCard from "../components/StockCard";
import styles from "./Dashboard.module.css";
import { useStocks } from "../hooks/useStocks";
import { useDebounce } from "../hooks/useDebounce";
import { useMemo, useState, useRef, useEffect } from "react";
import PortfolioChart from "../components/PortfolioChart";
import Header from "../components/Header";

function Dashboard() {
  const { error, isLoading, stocks, refetch } = useStocks();
  const { searchInput, searchResult, handleSearchChange } = useDebounce();
  const [sortBy, setSortBy] = useState("price-high");
  const [showSort, setShowSort] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowSort(false);
    }
  }
  function handleEsc(e) {
    if (e.key === "Escape") {
      setShowSort(false);
    }
  }

  document.addEventListener("click", handleClickOutside);
 document.addEventListener("keydown", handleEsc);
  return () => {
    document.removeEventListener("click", handleClickOutside);
     document.removeEventListener("keydown", handleEsc);
  };
}, []);

  const options = [
    { label: "Price: High → Low", value: "price-high" },
    { label: "Price: Low → High", value: "price-low" },
    { label: "Top Gainers", value: "change-high" },
    { label: "Top Losers", value: "change-low" },
  ];

  const filteredStocks = useMemo(() => {
    if (!searchResult) return stocks;
    return stocks.filter((stock) =>
      stock.name.toLowerCase().includes(searchResult.toLowerCase()),
    );
  }, [stocks, searchResult]);

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
    <>
      <Header />

      <div className={styles.box}>
        {isLoading ? (
          <p>Stocks are Loading...</p>
        ) : stocks.length > 0 ? (
          <div className={styles.searchList}>
            <div className={styles.controls}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search for stock name"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
              />

              <div className={styles.sortWrapper} ref={dropdownRef}>
                <button
                  className={styles.sortButton}
                  onClick={() => setShowSort((prev) => !prev)}
                >
                  Sort ▾
                </button>

                {showSort && (
                  <div className={styles.sortDropdown}>
                    {options.map((opt) => (
                      <div
                        key={opt.value}
                        className={styles.sortItem}
                        onClick={() => {
                          setSortBy(opt.value);
                          setShowSort(false);
                        }}
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.value && <span>✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
            <PortfolioChart data={filteredStocks} />

            <div className={styles.rowContainer}>
              {filteredStocks.length > 0 ? (
                sortedStocks.map((stock) => (
                  <StockCard key={stock.id} {...stock} />
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
