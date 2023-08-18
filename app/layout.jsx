import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Background from '@/components/Background'

export const metadata = {
    title: 'Bartek&Szymon Blog',
    description: 'NEXTJS <3',
}

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
            <body className='font-mono text-slate-800'>
                <Navbar />
                <div className='mb-40'>
                    {children}
                </div>
                <Footer />
                <Background />
            </body>
        </html>
    )
}
