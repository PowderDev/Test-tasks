import { createContext, useEffect, useState } from "react";
import ControlPanel from "./components/ControlPanel";
import Converter from "./components/Converter";
import Marquee from "./components/Marquee";

export const storeContext = createContext({
  baseCurrency: "USD",
  setBaseCurrency: (val: string) => {},
});

function App() {
  const [baseCurrency, setBaseCurrency] = useState("USD");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [localStorage.theme]);

  return (
    <storeContext.Provider value={{ baseCurrency, setBaseCurrency }}>
      <ControlPanel />
      <div className="flex flex-col justify-center items-center h-full dark:bg-gray-900">
        <Converter />
      </div>
      <Marquee />
    </storeContext.Provider>
  );
}

export default App;
