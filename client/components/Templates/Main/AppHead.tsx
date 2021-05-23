import Head from 'next/head'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCountNotifies } from '../../../store/ducks/notify/selectors'

interface AppHeadProps {
  title: string,
  keywords ?: string
}
const notifyToText = (count: number) => {
  if (count === 0) {
    return ""
  }
  return ` (${count})`
}

export const AppHead: React.FC<AppHeadProps> = ({ title, keywords }): React.ReactElement => {
  const notifyCount = useSelector(selectCountNotifies)
  return (
    <Head>
      <title>{title}{ notifyToText(notifyCount) }</title>
        <meta
          name="keywords"
          content={`чат,мессенджер${keywords && "," + keywords}`}
        />
        <meta
          name="description"
          content="Описание, Это приложение на основе next js, Работает быстро, оптимизировано, также кроссплатформенность и кроссбраузерность поддерживаются, с информацией о пользователях"
        />
      </Head>
      
  )
}