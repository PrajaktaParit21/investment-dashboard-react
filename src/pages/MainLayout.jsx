import Dashboard from "../components/Dashboard";
import StockExplorer from "../components/StockExplorer";
import Toast from "../components/Toast";
import { useGlobals } from "../context/StockContext.jsx";
function MainLayout() {
  const { toast } = useGlobals();
  return (
    <>
      <div style={{ display: "flex" }}>
        <Dashboard />
        <StockExplorer />
      </div>
      {toast && <Toast message={toast} />}
    </>
  );
}

export default MainLayout;
