import { useEffect, useRef, useState } from "react";
import styles from "../components/Dashboard.module.css";

function SortPanel({ sortBy, setSortBy }) {
  const [showSort, setShowSort] = useState(false);
  const dropdownRef = useRef(null);
  const options = [
    { label: "Price: High → Low", value: "price-high" },
    { label: "Price: Low → High", value: "price-low" },
    { label: "Top Gainers", value: "change-high" },
    { label: "Top Losers", value: "change-low" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
  return (
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
  );
}

export default SortPanel;
