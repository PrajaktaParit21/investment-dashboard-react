import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2>🚀 Overview</h2>
        <p>
          This project is a responsive investment dashboard designed to help
          users explore stocks, build a selected portfolio, and visualize
          performance through interactive charts. It focuses on delivering a
          smooth user experience while maintaining scalable and maintainable
          architecture.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🏗️ Architecture & Design Decisions</h2>
        <ul>
          <li>
            <strong>Global State Management:</strong> Managed using React Context
            to share selected stocks across Dashboard, Explorer, and Details pages.
          </li>
          <li>
            <strong>Custom Hooks:</strong> Built reusable hooks like useStocks,
            useDebounce, and useToast for cleaner logic separation.
          </li>
          <li>
            <strong>Component-Based Design:</strong> Modular components for
            scalability and maintainability.
          </li>
          <li>
            <strong>Layout-Based Routing:</strong> Maintains shared UI while supporting
            multiple routes.
          </li>
          <li>
            <strong>Lazy Loading:</strong> Improves performance by loading pages only when needed.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>⚡ Performance Optimizations</h2>
        <ul>
          <li>Used useMemo for filtering and calculations</li>
          <li>Implemented Intersection Observer for infinite scrolling</li>
          <li>Reduced unnecessary re-renders</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>🎯 Key Features</h2>
        <ul>
          <li>🔍 Debounced search</li>
          <li>♾️ Infinite scrolling</li>
          <li>➕ Add / ➖ Remove stocks</li>
          <li>📊 Chart visualization</li>
          <li>🔔 Toast notifications</li>
          <li>🌗 Light / Dark mode</li>
          <li>🔄 Retry on API failure</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>🔮 Future Enhancements</h2>
        <ul>
          <li>Real-time stock API integration</li>
          <li>Persistent portfolio</li>
          <li>Advanced charts</li>
          <li>User authentication</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>💡 Conclusion</h2>
        <p>
          This project focuses on building a real-world frontend application with
          proper architecture, performance considerations, and user-centric design.
        </p>
      </section>
    </div>
  );
}

