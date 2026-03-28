import { useEffect, useState } from "react";

function Header() {
  const [isLight, setIsLight] = useState(localStorage.getItem("theme") == "light");
  
  useEffect(()=>{
    localStorage.setItem("theme",isLight? "light" :"dark" )
    document.body.classList.toggle("light",isLight);
  },[isLight])
  
  function toggleTheme(params) {
    setIsLight(!isLight)
  }

  return (
    <div>
      <h1>Investment Dashboard</h1>
      <button onClick={toggleTheme}>
        {isLight ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
}

export default Header;