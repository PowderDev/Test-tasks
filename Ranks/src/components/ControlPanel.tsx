import { Select } from "@mantine/core"
import { useContext, useMemo } from "react"
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs"
import { storeContext } from "../App"
import { useTheme } from "../utils/hooks"

const ControlPanel = () => {
  const { theme, setTheme } = useTheme()
  const { baseCurrency, setBaseCurrency } = useContext(storeContext)

  const currencies = useMemo(
    () => [
      { value: "USD", label: "USD" },
      { value: "EUR", label: "EUR" },
      { value: "RUB", label: "RUB" },
      { value: "TRY", label: "TRY" },
      { value: "CAD", label: "CAD" },
    ],
    []
  )

  return (
    <div className="flex items-center gap-5 fixed top-10 left-1/2 -translate-x-1/2">
      <Select
        data={currencies}
        value={baseCurrency}
        className="w-24"
        onChange={(val) => setBaseCurrency(val || baseCurrency)}
      />
      {theme === "light" ? (
        <BsMoonStarsFill size={24} cursor="pointer" onClick={() => setTheme("dark")} />
      ) : (
        <BsSunFill size={24} cursor="pointer" color="yellow" onClick={() => setTheme("light")} />
      )}
    </div>
  )
}

export default ControlPanel
