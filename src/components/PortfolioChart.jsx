import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import styles from "./PortfolioChart.module.css";

function PortfolioChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="price"
            fill="var(--color-accent)"
            radius={[6, 6, 0, 0]}
            onMouseOver={(data, index, e) => {
              e.target.style.fill = "#60a5fa"; // lighter blue
            }}
            onMouseOut={(data, index, e) => {
              e.target.style.fill = "var(--color-accent)";
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PortfolioChart;
