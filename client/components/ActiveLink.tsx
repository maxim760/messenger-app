import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'

interface ActiveLinkProps {
  children: ReactNode,
  href: string
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href }): React.ReactElement => {
  const router = useRouter()
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black',
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}


