export const required = str => {
  return !!str
}
export const isYear = str => /^[1-9]\d*/.test(str) && +str <= new Date().getFullYear()

export const isText = str => /^[a-zA-Zа-яА-Я \-]*$/.test(str)
