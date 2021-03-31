import React, { ReactNode } from 'react'
import Link from 'next/link'

interface AProps {
  children: ReactNode | React.ReactChildren | React.ReactElement,
  href: string
  className ?: string;
}

export const A: React.FC<AProps> = ({href, children, className = "" }) => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  )
}