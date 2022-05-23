import axios from "axios";
import { useCallback, useState } from "react";
import { getConverterURL } from ".";
import { ConvertCurrencyFN, Currency, SetCurrencyFN } from "../types";

export const useToggle = (initialState = false): [state: boolean, toggle: () => void] => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
};

export const useCurrency = (
  defaultCurrency: string
): [c: Currency, sc: SetCurrencyFN, cc: ConvertCurrencyFN] => {
  const [currency, updateCurrency] = useState<Currency>({
    name: defaultCurrency,
    value: 1,
    error: "",
  });

  const setCurrency = useCallback<SetCurrencyFN>((field, value) => {
    updateCurrency((prev) => ({ ...prev, [field]: value }));
  }, []);

  const convertCurrency = async (
    otherCurrency: string,
    setOtherCurrency: SetCurrencyFN,
    amount: number
  ) => {
    const URL = getConverterURL(currency.name, otherCurrency, amount);
    const { data } = await axios.get<{ result: { [index: string]: number } }>(URL);
    setOtherCurrency("value", data.result[otherCurrency]);
  };

  return [currency, setCurrency, convertCurrency];
};
