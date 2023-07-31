import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { Toaster } from 'react-hot-toast'
import DataProvider from '@/context/DataProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog App',
  description: 'Generated By Aadarsh Guru for learning next js and making a blog app.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          <div className="container">
            <header>
              <Navbar />
            </header>
            <Toaster />
            <main>
              {children}
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </DataProvider>
      </body>
    </html>
  )
}
