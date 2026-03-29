import { useEffect, useRef, useState } from "react";
import StockCard from "./StockCard";
import styles from "./StockExplorer.module.css";

function StockExplorer({ addStock, removeStock, mockStocks }) {
  const loaderRef = useRef(null);
  const isLoadingRef = useRef(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const visibleStocks = mockStocks.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || isLoadingRef.current) return;

        isLoadingRef.current = true;
        setTimeout(() => {
          setVisibleCount((prev) => prev + 10);
          isLoadingRef.current = false;
        }, 700);
      },
      {
        threshold: 0.9,
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Explore Stocks </h2>
      <span>
        Visible Stocks: ({visibleStocks.length}/{mockStocks.length}){" "}
      </span>

      <div className={styles.list}>
        {visibleStocks.map((stock) => (
          <StockCard
            key={stock.id}
            stock={stock}
            isSelected={false}
            onAdd={addStock}
            onRemove={removeStock}
          />
        ))}

        {visibleCount < mockStocks.length && (
          <div ref={loaderRef} className={styles.loader}>
            Loading more stocks...
          </div>
        )}
      </div>
    </div>
  );
}

export default StockExplorer;
