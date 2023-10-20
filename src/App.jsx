import 'tailwindcss/tailwind.css';
import List from "./components/list/List";
import { ThemeContext } from "./components/context/ThemeContext";
import ThemeToggle from "./components/context/ThemeToggle";
import { useContext } from "react";


const App = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "dark" ? "bg-[#222]" : "light";

  return (
    <div className={`px-16 py-7 h-[100vh] ${styles}`} >
      <ThemeToggle />
      <List />
    </div>
  );
};

export default App;
