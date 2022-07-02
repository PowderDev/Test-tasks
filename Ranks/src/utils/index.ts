export const convertCurrencyList = (currencies: { [key: string]: string }) => {
  return Object.keys(currencies).reduce<{ value: string; label: string }[]>((acc, key) => {
    acc.push({ value: key, label: currencies[key] })
    return acc
  }, [])
}

export const getConverterURL = (name1: string, name2: string, amount: number) => {
  return `https://api.fastforex.io/convert?from=${name1}&to=${name2}&amount=${amount}&api_key=bf363cfdd5-a0fc4609f1-ree2wt`
}

export const getCurrenciesURL = (baseCurrency: string) => {
  return `https://api.fastforex.io/fetch-multi?from=${baseCurrency}&to=EUR,GBP,RUB,TRY,KWD,OMR,CAD,SGD,NZD&api_key=bf363cfdd5-a0fc4609f1-ree2wt`
}

export const changeTheme = (theme: "light" | "dark") => {
  localStorage.theme = theme
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}
