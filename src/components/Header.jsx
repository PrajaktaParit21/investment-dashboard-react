function Header() {
  return (
    <div style={{
      padding: "16px 24px",
      borderBottom: "1px solid var(--color-border)",
      marginBottom: "16px"
    }}>
      <h1 style={{ margin: 0 }}>Investment Dashboard</h1>
      <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
        Track your portfolio performance
      </p>
    </div>
  );
}

export default Header;