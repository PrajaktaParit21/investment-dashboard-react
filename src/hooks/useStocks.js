import { fetchStocks } from "../services/stockService";

import { useState, useEffect, useCallback } from "react";

export function useStocks() {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async ()=>{
    try {
      setIsLoading(true);
      const data = await fetchStocks();
      setError(null);
      setStocks(data);
    } catch (error) {
      setError(error.message || "Something went wrong");
      console.error("Failed to fetch stocks", error);
      
    } finally {
      setIsLoading(false);
    }
  },[])
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { stocks, isLoading, error, refetch: fetchData ,setStocks };
}
