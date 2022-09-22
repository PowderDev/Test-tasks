import { useCallback, useEffect, useState } from "react"
import { changeTheme } from "."
import { api } from "../http"
import { ConvertCurrency, Currency, SetCurrency } from "../types"

export const useToggle = (initialState = false): [state: boolean, toggle: () => void] => {
  const [state, setState] = useState(initialState)
  const toggle = useCallback(() => setState((state) => !state), [])
  return [state, toggle]
}

export const useCurrency = (
  defaultCurrency: string
): {
  currency: Currency
  setCurrency: SetCurrency
  convertCurrency: ConvertCurrency
  loading: boolean
} => {
  const [loading, toggleLoading] = useToggle(false)
  const [currency, updateCurrency] = useState<Currency>({
    name: defaultCurrency,
    value: 1,
  })

  const setCurrency = useCallback<SetCurrency>((field, value) => {
    updateCurrency((prev) => ({ ...prev, [field]: value }))
  }, [])

  const convertCurrency = async (
    currencyConvertTo: string,
    setCovertToCurrency: SetCurrency,
    amount: number
  ) => {
    toggleLoading()
    const { data } = await api.get<{ result: { [index: string]: number } }>(
      `convert?from=${currency.name}&to=${currencyConvertTo}&amount=${amount}`
    )
    setCovertToCurrency("value", data.result[currencyConvertTo])
    toggleLoading()
  }

  return {
    currency,
    setCurrency,
    convertCurrency,
    loading,
  }
}

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as any) || "light"
  )

  useEffect(() => changeTheme(theme), [theme])

  return {
    theme,
    setTheme,
  }
}
