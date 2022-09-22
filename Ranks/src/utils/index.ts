export const convertCurrencyList = (currencies: { [key: string]: string }) => {
  return Object.keys(currencies).reduce<{ value: string; label: string }[]>((acc, key) => {
    acc.push({ value: key, label: currencies[key] })
    return acc
  }, [])
}

export const changeTheme = (theme: "light" | "dark") => {
  localStorage.theme = theme
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}
