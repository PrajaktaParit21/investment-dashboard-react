import MainLayout from "./pages/MainLayout"
import Header from "./components/Header";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import StockDetails from "./pages/StockDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout/>} />
        <Route path="/stock/:id" element={<StockDetails/>} />
      </Routes>
    </>
      
  )
}

export default App
