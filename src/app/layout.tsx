import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TopSection from '@/components/TopSection'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Interno',
  description: 'Let your home be unique',
}

export async function fetchGlobalData() {
  try {
    const res = await fetch(`${process.env.baseURL}/api/global?populate=deep`)
    const data = await res.json()

    return data
  } catch (error) {
    return null
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">




      
      <body className={inter.className}>
        <TopSection globalData={await fetchGlobalData()} />
        <Navbar globalData={await fetchGlobalData()} />
        
          {children}

        <Footer globalData={await fetchGlobalData()}/>
      </body>
    </html>
  )
}
