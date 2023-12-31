import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wael',
  description: 'Welcome to my portfolio',
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




      
      <body className={`${inter.className} bg-light`}>
        <Navbar globalData={await fetchGlobalData()} />
        
          {children}

        <Footer globalData={await fetchGlobalData()}/>
      </body>
    </html>
  )
}
