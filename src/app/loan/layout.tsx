import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Person : Person Create / Update / View',
  description: 'Crete Person',
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