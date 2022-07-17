import React, { CSSProperties, useContext } from "react"
import { ThemeContext } from "../App"

interface Props {
  isTop?: boolean
  index: number
}

const AbacusBone: React.FC<Props> = ({ isTop = false, index }) => {
  const { boneDesignURL } = useContext(ThemeContext)

  return (
    <div className={`abacus-bone ${isTop ? "top" : ""}`} style={{ "--i": index } as CSSProperties}>
      <img src={boneDesignURL} />
    </div>
  )
}

export default AbacusBone
