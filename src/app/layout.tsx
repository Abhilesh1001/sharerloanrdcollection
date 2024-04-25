import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import AppProvider from '@/redux/Providers'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShareHolder RD Loan Collection',
  description: 'ShareHolder RD Loan Collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <AppProvider >
          <Navbar />
          <div className='relative lg:top-8 top-8 text-base-content font-sans'>
        {children}
          </div>
        <Footer />
        </AppProvider>
        </body>
    </html>
  )
}