import React, { useContext, useEffect, useMemo } from "react"
import { ThemeContext } from "../App"
import { getArrayWithKeys, getBones } from "../helpers"
import AbacusBone from "./AbacusBone"

interface Props {
  colAmount?: number
  boneBottomAmount?: number
  boneTopAmount?: number
}

const Abacus: React.FC<Props> = ({ colAmount = 10, boneBottomAmount = 5, boneTopAmount = 2 }) => {
  const cols = useMemo(() => getArrayWithKeys(colAmount), [colAmount])
  const topBones = useMemo(() => getBones(colAmount, boneTopAmount), [])
  const bottomBones = useMemo(() => getBones(colAmount, boneBottomAmount), [])
  const { colDesignURL } = useContext(ThemeContext)

  useEffect(() => {
    console.log("Updated")
  }, [])

  return (
    <div className="abacus">
      {cols.map((key, i) => (
        <div className="abacus-col" key={key}>
          <img src={colDesignURL} />
          {topBones[i].map((key, i) => (
            <AbacusBone key={key} index={i} isTop />
          ))}
          {bottomBones[i].map((key, i) => (
            <AbacusBone key={key} index={i} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Abacus
