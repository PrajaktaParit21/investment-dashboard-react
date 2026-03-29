import { createContext, useContext, useState } from "react";
import { useStocks } from "../hooks/useStocks";
import { useToast } from "../hooks/useToast";
import { mockStocks } from "../data/stocks";

const StockContext = createContext();

export function StockProvider({ children }) {
  const { error, isLoading, selectedStocks, refetch, setSelectedStocks } =
    useStocks();

  const { toast, showToast } = useToast();
  const [exploreStocks, setExploreStocks] = useState(mockStocks);

  function addStock(stock) {
    setSelectedStocks((prev) => {
      if (prev.length >= 5) {
        showToast("⚠️ You can only select up to 5 stocks!");
        return prev;
      }
      setExploreStocks((prev) => prev.filter((s) => s.id != stock.id));
      return [...prev, stock];
    });
  }

  function removeStock(stock) {
    setSelectedStocks((prev) => prev.filter((s) => s.id != stock.id));
    setExploreStocks((prev) => [stock, ...prev]);
  }

  return (
    <StockContext.Provider
      value={{
        error,
        isLoading,
        refetch,
        selectedStocks,
        addStock,
        removeStock,
        toast,
        exploreStocks,
        mockStocks
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useGlobals() {
  return useContext(StockContext);
}
