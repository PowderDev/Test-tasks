export interface Currency {
  value: number;
  name: string;
  error: string;
}

export type SetCurrencyFN = (field: "value" | "name" | "error", value: any) => void;
export type ConvertCurrencyFN = (
  otherCurrency: string,
  setOtherCurrency: SetCurrencyFN,
  amount: number
) => Promise<void>;
