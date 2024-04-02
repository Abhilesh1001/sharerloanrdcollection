import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Signup Form : Signup Form',
  description: 'Create Purchase Order Purchase Request',
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