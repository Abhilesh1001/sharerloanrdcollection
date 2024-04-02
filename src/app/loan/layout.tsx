import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Loan : Loan Create / Update / View',
  description: ' Loan Provided to Person',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <>{children}</>
  )
}