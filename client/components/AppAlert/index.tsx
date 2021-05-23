import React from 'react'
import { AiOutlineWarning as IconWarning} from "react-icons/ai"
import { MdErrorOutline as IconError} from "react-icons/md"
import { AiOutlineInfoCircle as IconInfo} from "react-icons/ai"
import { IoMdCheckmarkCircleOutline as IconSuccess} from "react-icons/io"

import styles from "./appAlert.module.scss"
import clsx from 'clsx'

export const Icons = {
  warning:IconWarning,
  success:IconSuccess,
  info:IconInfo,
  error:IconError,
}

export enum IAlert {
  WARNING="warning",
  SUCCESS="success",
  ERROR="error",
  INFO="info",
} 

interface AppAlertProps {
  type: IAlert,
  className?: string,
  title ?: string,
  children: React.ReactNode
}

export const AppAlert: React.FC<AppAlertProps> = ({ type, children, className = "",title }): React.ReactElement => {

  const Icon = Icons[type] 
  
  return (
    <div className={clsx(styles.alert, styles[`alert-${type}`], className)}>
      <Icon className={clsx(styles.icon, styles[`icon-${IAlert[type]}`])} />
      <div>
        {!!title && <h1 className={styles.title}>{title}</h1>}
        <p className={styles.text}>{children}</p>
      </div>
    </div>
  )
}