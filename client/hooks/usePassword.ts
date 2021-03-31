import { AiOutlineEyeInvisible as Visibility } from "react-icons/ai";
import { AiOutlineEye as VisibilityOff} from "react-icons/ai";

import { useState } from "react";

export const usePassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const onClick = () => setIsShowPassword(prev => !prev)
  const onMouseDown = (e: React.MouseEvent) => e.preventDefault()
  return {
    input: {
      type: isShowPassword ? "text" : "password"
    },
    button: {
      onClick,
      onMouseDown
    },
    Icon: isShowPassword ? Visibility : VisibilityOff
  }
}