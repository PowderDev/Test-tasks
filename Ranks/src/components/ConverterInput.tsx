import { FC } from "react"
import { NumberInput, Select } from "@mantine/core"
import { Currency, SetCurrencyFN } from "../types"

interface Props {
  currency: Currency
  setCurrency: SetCurrencyFN
  currencyList: { value: string; label: string }[]
  handleInputChange: (value: number) => Promise<void>
}

const ConverterInput: FC<Props> = ({ currency, currencyList, setCurrency, handleInputChange }) => {
  return (
    <div className="flex flex-col gap-5 relative">
      <Select
        data={currencyList}
        searchable
        nothingFound="No options"
        onChange={(val) => setCurrency("name", val || currency.name)}
        value={currency.name}
      />
      <NumberInput
        className="dark:bg-gray-600 dark:text-gray-300"
        value={currency.value}
        onChange={handleInputChange}
        parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
        formatter={(value) => {
          return !Number.isNaN(parseFloat(value || ""))
            ? `${parseFloat(`${currency.value}`)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : ""
        }}
        min={1}
        size="xl"
        icon={currency.name}
      />
    </div>
  )
}

export default ConverterInput
