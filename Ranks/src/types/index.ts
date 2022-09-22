export interface Currency {
  value: number
  name: string
}

export type SetCurrency = (field: "value" | "name" | "error", value: any) => void
export type ConvertCurrency = (
  otherCurrency: string,
  setOtherCurrency: SetCurrency,
  amount: number
) => Promise<void>
