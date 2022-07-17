import React, { useContext } from "react"
import { ThemeContext } from "../App"

const colImages = ["/images/1.png", "/images/2.png"]
const boneImages = ["/images/3.png", "/images/4.png"]

const Controls = () => {
  const { setColDesignURL, setBoneDesignURL } = useContext(ThemeContext)

  const handleChange = (type: "col" | "bone", src: string) => {
    localStorage.setItem(type + "Design", src)
    if (type == "col") {
      setColDesignURL(src)
    } else {
      setBoneDesignURL(src)
    }
  }

  return (
    <div className="controls">
      <div className="control">
        <h3>Choose columns theme:</h3>
        <div className="items-container">
          {colImages.map((src) => (
            <div className="control-item" key={src} onClick={() => handleChange("col", src)}>
              <img src={src} />
            </div>
          ))}
        </div>
      </div>

      <div className="control">
        <h3>Choose bones theme:</h3>
        <div className="items-container">
          {boneImages.map((src) => (
            <div className="control-item" key={src} onClick={() => handleChange("bone", src)}>
              <img src={src} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Controls
