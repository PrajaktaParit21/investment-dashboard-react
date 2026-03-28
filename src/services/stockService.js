export const fetchStocks = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = 0; 
      // const shouldFail = Math.random() < 0.5; //50% failure
      if (shouldFail) {
        reject(new Error("API resulted in failure. Please try again"));
      } else {
        resolve([
          { id: 1, name: "TCS", price: 3500, change: 2.5 },
          { id: 2, name: "Infosys", price: 1500, change: -1.2 },
          { id: 3, name: "HDFC Bank", price: 1600, change: 0.8 },
        ]);
      }
    }, 1000);
  });
};
