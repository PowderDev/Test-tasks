import React, { useContext, useEffect, useMemo } from "react"
import { ThemeContext } from "../App"
import { getArrayWithKeys, getBones } from "../helpers"
import AbacusBone from "./AbacusBone"

interface Props {
  boneBottomAmount?: number
  boneTopAmount?: number
}

const Abacus: React.FC<Props> = ({ boneBottomAmount = 5, boneTopAmount = 2 }) => {
  const { colDesignURL, colAmount } = useContext(ThemeContext)

  const cols = useMemo(() => getArrayWithKeys(colAmount), [colAmount])
  const topBones = useMemo(() => getBones(colAmount, boneTopAmount), [colAmount])
  const bottomBones = useMemo(() => getBones(colAmount, boneBottomAmount), [colAmount])

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
