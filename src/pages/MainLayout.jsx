import Dashboard from "../components/Dashboard";
import StockExplorer from "../components/StockExplorer";
import { useStocks } from "../hooks/useStocks";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";
import { mockStocks } from "../data/stocks";
import { useState } from "react";

function MainLayout() {
  const { error, isLoading, stocks, refetch, setStocks } = useStocks();
  const { toast, showToast } = useToast();
  const [exploreStocks, setExploreStocks] = useState(mockStocks);

  function addStock(stock) {
    setStocks((prev) => {
      if (prev.length >= 5) {
        showToast("⚠️ You can only select up to 5 stocks!");
        return prev;
      }
      setExploreStocks((prev) => prev.filter((s) => s.id != stock.id));
      return [...prev, stock];
    });
  }

  function removeStock(stock) {
    setStocks((prev) => prev.filter((s) => s.id != stock.id));
    setExploreStocks((prev) => [stock, ...prev]);
  }
  return (
    <>
      <div style={{ display: "flex" }}>
        <Dashboard
          error={error}
          isLoading={isLoading}
          stocks={stocks}
          refetch={refetch}
          onAdd={addStock}
          onRemove={removeStock}
        />
        <StockExplorer
          addStock={addStock}
          removeStock={removeStock}
          mockStocks={exploreStocks}
        />
      </div>
      {toast && <Toast message={toast} />}
    </>
  );
}

export default MainLayout;
