import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { convertCurrencyList } from "../utils";
import ConverterInput from "./ConverterInput";
import { LoadingOverlay } from "@mantine/core";
import { useCurrency, useToggle } from "../utils/hooks";
import { SetCurrencyFN } from "../types";
import { storeContext } from "../App";

const Converter = () => {
  const { baseCurrency } = useContext(storeContext);
  const [firstCurrency, setFirstCurrency, convertFirstCurrency] = useCurrency(baseCurrency);
  const [secondCurrency, setSecondCurrency, convertSecondCurrency] = useCurrency(
    baseCurrency === "RUB" ? "USD" : "RUB"
  );
  const [currencyList, setCurrencyList] = useState([] as { value: string; label: string }[]);
  const [loading, toggleLoading] = useToggle(false);

  useEffect(() => {
    const get = async () => {
      const URL = "https://api.fastforex.io/currencies?api_key=71e2b35b8d-76b0650cd4-rc4xma";
      const { data } = await axios.get<{ currencies: any }>(URL);
      setCurrencyList(convertCurrencyList(data.currencies));
    };
    get();
  }, []);

  const handleInputChange = async (name: string, setCurrency: SetCurrencyFN, value: number) => {
    if (
      value === Math.ceil(firstCurrency.value) ||
      value === Math.ceil(secondCurrency.value) ||
      !value
    )
      return;
    toggleLoading();
    if (name === firstCurrency.name) {
      setSecondCurrency("value", value);
      await convertSecondCurrency(name, setCurrency, value);
    } else {
      setFirstCurrency("value", value);
      await convertFirstCurrency(name, setCurrency, value);
    }
    toggleLoading();
  };

  useEffect(() => {
    const get = async () => {
      await convertFirstCurrency(secondCurrency.name, setSecondCurrency, firstCurrency.value);
    };
    toggleLoading();
    get();
    toggleLoading();
  }, [firstCurrency.name, secondCurrency.name]);

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
      <LoadingOverlay visible={loading} />
    </div>
  );
};

export default Converter;
