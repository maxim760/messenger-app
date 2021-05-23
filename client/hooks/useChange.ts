import { useState } from "react"

export const useChange = (initial = "") => {
  const [value, setValue] = useState(initial)
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  const reset = () => setValue("")
  return {
    input: {
      value,
      onChange
    },
    reset,
    setValue
  }
}