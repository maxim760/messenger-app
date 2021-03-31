import { useState } from "react"

export const useChange = (initial = "", callback?: Function) => {
  const [value, setValue] = useState(initial)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    callback && callback(e.target.value)
  }
  const reset = () => setValue("")
  return {
    input: {
      value,
      onChange
    },
    reset 
  }
}