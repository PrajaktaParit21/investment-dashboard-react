import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";
function ThemeToggle() {
  const [isLight, setIsLight] = useState(
    localStorage.getItem("theme") == "light",
  );
  useEffect(() => {
    localStorage.setItem("theme", isLight ? "light" : "dark");
    document.body.classList.toggle("light", isLight);
  }, [isLight]);
  function toggleTheme() {
    setIsLight(!isLight);
  }
  return (
    <label className={styles.theme}>
      <span className={styles.theme__toggle_wrap}>
        <input
          id="theme"
          className={styles.theme__toggle}
          type="checkbox"
          role="switch"
          name="theme"
          checked={!isLight}
          //   value={isLight ? "light" : "dark"}
          value="light"
          onChange={() => {
            console.log("change triggered");
            
            toggleTheme();
          }}
        />
        <span className={styles.theme__icon}>
          <span className={styles.theme__icon_part}></span>
          <span className={styles.theme__icon_part}></span>
          <span className={styles.theme__icon_part}></span>
          <span className={styles.theme__icon_part}></span>
          <span className={styles.theme__icon_part}></span>
          <span className={styles.theme__icon_part}></span>
          <span className={styles.theme__icon_part}></span>
          <span className={styles.theme__icon_part}></span>
          <span className={styles.theme__icon_part}></span>
        </span>
      </span>
    </label>
  );
}

export default ThemeToggle;
