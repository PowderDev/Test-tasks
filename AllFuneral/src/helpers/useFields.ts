import React, { useEffect, useRef } from "react"
import { UseFieldsReturn } from "../types"

function useFields<T>(initState: T | null): UseFieldsReturn<T> {
  const fieldsRef = useRef(initState)

  useEffect(() => {
    if (initState) {
      fieldsRef.current = initState
    }
  }, [initState])

  const setField = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    divider?: string,
    targetField?: string
  ) => {
    if (target.name.includes(":") && divider) {
      const pieces = target.name.split(":")
      const values = target.value.split(divider)

      values.forEach((val, i) => {
        if (targetField) {
          //@ts-expect-error
          fieldsRef.current[targetField][pieces[i]] = val
        } else {
          //@ts-expect-error
          fieldsRef.current[pieces[i]] = val
        }
      })
      return
    } else if (divider) {
      const values = target.value.split(divider).map((v) => v.trim())
      //@ts-expect-error
      fieldsRef.current[target.name] = values
      return
    }
    //@ts-expect-error
    fieldsRef.current[target.name] = target.value
  }

  return [setField, fieldsRef.current]
}

export default useFields
