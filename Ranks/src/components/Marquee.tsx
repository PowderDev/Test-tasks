import axios from "axios"
import gsap from "gsap"
import { useContext, useEffect, useState } from "react"
import { storeContext } from "../App"
import { getCurrenciesURL } from "../utils"

const Marquee = () => {
  const [currencies, setCurrencies] = useState({})
  const { baseCurrency } = useContext(storeContext)

  useEffect(() => {
    axios(getCurrenciesURL(baseCurrency)).then(({ data }) => setCurrencies(data.results))
  }, [baseCurrency])

  useEffect(() => {
    const length = Object.keys(currencies).length
    const animate = async (i: number) => {
      const tl = gsap.timeline({ defaults: { ease: "none" } })
      tl.fromTo(`.tile-${i}`, { x: 0 }, { x: `-${110 * (i + 1)}%`, duration: 15 * (i || 0.4) })
      tl.fromTo(
        `.tile-${i}`,
        { x: `${110 * (length - (!i ? 0.05 : i - 0.35))}%` },
        { x: 0, duration: 15 * (length - (i || 0.45)) }
      )
      tl.repeat(100)
    }

    for (let i = 0; i < length; i++) animate(i)
  }, [currencies])

  return (
    <div className="flex w-full mt-14 gap-4 fixed bottom-10">
      {Object.keys(currencies).map((key, i) => {
        //@ts-expect-error
        const value = currencies[key]
        return (
          <div key={key} className={`currency-card tile-${i}`}>
            <div
              className={`currency-flag currency-flag-${key.toLowerCase()} h-12 w-12 rounded-full`}
            />
            <figure>
              {value.toFixed(2)} {key}
            </figure>
          </div>
        )
      })}
    </div>
  )
}

export default Marquee
