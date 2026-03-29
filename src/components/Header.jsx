import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
        padding: "var(--spacing-lg)",
        gap: "var(--spacing-lg)",
        backgroundColor: "var(--color-bg-primary)"
      }}
    >
      <h1>Investment Dashboard</h1>
      <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
        <ThemeToggle />
        {/* <button onClick={toggleTheme}>
          {isLight ? "🌙 Dark" : "☀️ Light"}
        </button> */}
        <button onClick={() => navigate("/about")}>About</button>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
}

export default Header;
