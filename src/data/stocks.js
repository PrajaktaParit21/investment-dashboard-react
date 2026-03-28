export const mockStocks = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Stock ${i + 1}`,
  price: Math.floor(Math.random() * 5000) + 100,
  change: (Math.random() * 10 - 5).toFixed(2),
}));