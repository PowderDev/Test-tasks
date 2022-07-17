import { createContext, useMemo, useState } from "react"
import Abacus from "./components/Abacus"
import Controls from "./components/Controls"

export const ThemeContext = createContext({
  boneDesignURL: "",
  setBoneDesignURL: (val: string) => {},
  colDesignURL: "",
  setColDesignURL: (val: string) => {},
})

function App() {
  const [boneDesignURL, setBoneDesignURL] = useState(localStorage.boneDesign || "/images/3.png")
  const [colDesignURL, setColDesignURL] = useState(localStorage.colDesign || "/images/1.png")

  const colAmount = useMemo(() => Math.round(Math.random() * (15 - 3) + 3), [])

  return (
    <ThemeContext.Provider
      value={{ boneDesignURL, setBoneDesignURL, colDesignURL, setColDesignURL }}
    >
      <Controls />
      <Abacus colAmount={colAmount} />
    </ThemeContext.Provider>
  )
}

export default App
