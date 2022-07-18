import React, { useContext } from "react"
import { ThemeContext } from "../App"
import { getRandomNumber } from "../helpers"
import Control from "./Control"

const colImages = ["/images/1.png", "/images/2.png"]
const boneImages = ["/images/3.png", "/images/4.png"]

const Controls = () => {
  const { setColDesignURL, setBoneDesignURL, colAmount, setColAmount } = useContext(ThemeContext)

  const handleChange = (type: "col" | "bone", src: string) => {
    localStorage.setItem(type + "Design", src)
    if (type == "col") {
      setColDesignURL(src)
    } else {
      setBoneDesignURL(src)
    }
  }

  const handleColsInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setColAmount(parseInt(event.target.value))
  }

  return (
    <div className="controls">
      <Control
        label="Choose columns theme:"
        items={colImages}
        onChange={(src) => handleChange("col", src)}
      />
      <Control
        label="Choose bones theme:"
        items={boneImages}
        onChange={(src) => handleChange("bone", src)}
      />

      <div className="input-control control">
        <label htmlFor="colAmount">The amount of the columns:</label>
        <input
          type="number"
          id="colAmount"
          value={colAmount}
          min={3}
          max={15}
          onChange={handleColsInput}
        />
      </div>

      <button onClick={() => setColAmount(getRandomNumber())}>Rebuild</button>
    </div>
  )
}

export default Controls
