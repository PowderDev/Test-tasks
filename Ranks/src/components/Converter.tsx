import { useContext, useEffect, useState } from "react"
import { convertCurrencyList } from "../utils"
import ConverterInput from "./ConverterInput"
import { LoadingOverlay } from "@mantine/core"
import { useCurrency, useToggle } from "../utils/hooks"
import { SetCurrency } from "../types"
import { storeContext } from "../App"
import { api } from "../http"

const Converter = () => {
  const { baseCurrency } = useContext(storeContext)
  const {
    loading: firstLoading,
    currency: firstCurrency,
    setCurrency: setFirstCurrency,
    convertCurrency: convertFirstCurrency,
  } = useCurrency(baseCurrency)
  const {
    loading: secondLoading,
    currency: secondCurrency,
    setCurrency: setSecondCurrency,
    convertCurrency: convertSecondCurrency,
  } = useCurrency(baseCurrency === "RUB" ? "USD" : "RUB")
  const [currencyList, setCurrencyList] = useState([] as { value: string; label: string }[])

  useEffect(() => {
    api
      .get<{ currencies: any }>("/currencies")
      .then(({ data }) => {
        setCurrencyList(convertCurrencyList(data.currencies))
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const handleInputChange = async (name: string, setCurrency: SetCurrency, value: number) => {
    if (value === firstCurrency.value || value === secondCurrency.value || !value) return

    if (name === firstCurrency.name) {
      setSecondCurrency("value", value)
      await convertSecondCurrency(name, setCurrency, value)
    } else {
      setFirstCurrency("value", value)
      await convertFirstCurrency(name, setCurrency, value)
    }
  }

  useEffect(() => {
    convertFirstCurrency(secondCurrency.name, setSecondCurrency, firstCurrency.value).then(() => {
      console.log(`Converted from ${firstCurrency.name} to ${secondCurrency.name}`)
    })
  }, [firstCurrency.name, secondCurrency.name])

  return (
    <div className="flex gap-6 relative">
      <ConverterInput
        currency={firstCurrency}
        setCurrency={setFirstCurrency}
        currencyList={currencyList}
        handleInputChange={(value: number) =>
          handleInputChange(secondCurrency.name, setSecondCurrency, value)
        }
      />
      <ConverterInput
        currency={secondCurrency}
        setCurrency={setSecondCurrency}
        currencyList={currencyList}
        handleInputChange={(value: number) =>
          handleInputChange(firstCurrency.name, setFirstCurrency, value)
        }
      />
      <LoadingOverlay visible={firstLoading || secondLoading} />
    </div>
  )
}

export default Converter
