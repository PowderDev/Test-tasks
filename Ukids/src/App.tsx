import { createContext, useMemo, useState } from "react"
import Abacus from "./components/Abacus"
import Controls from "./components/Controls"
import { getRandomNumber } from "./helpers"

export const ThemeContext = createContext({
  boneDesignURL: "",
  setBoneDesignURL: (val: string) => {},
  colDesignURL: "",
  setColDesignURL: (val: string) => {},
  colAmount: 0,
  setColAmount: (val: number) => {},
})

function App() {
  const [boneDesignURL, setBoneDesignURL] = useState(localStorage.boneDesign || "/images/3.png")
  const [colDesignURL, setColDesignURL] = useState(localStorage.colDesign || "/images/1.png")
  const [colAmount, setColAmount] = useState(getRandomNumber())

  return (
    <ThemeContext.Provider
      value={{
        boneDesignURL,
        setBoneDesignURL,
        colDesignURL,
        setColDesignURL,
        colAmount,
        setColAmount,
      }}
    >
      <Controls />
      <Abacus />
    </ThemeContext.Provider>
  )
}

export default App
