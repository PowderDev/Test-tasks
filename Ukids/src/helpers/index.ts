export const getArrayWithKeys = (length = 5) => {
  return Array.from({ length }).map(() => (Math.random() * 10000).toFixed())
}

export const getRandomArrayWithKeys = (maxLength = 5) => {
  const length = Math.round(Math.random() * (maxLength - 1) + 1)
  return Array.from({ length }).map(() => (Math.random() * 10000).toFixed())
}

export const getBones = (colAmount = 5, maxBoneAmount = 5) => {
  return Array.from({ length: colAmount }).map(() => getRandomArrayWithKeys(maxBoneAmount))
}
