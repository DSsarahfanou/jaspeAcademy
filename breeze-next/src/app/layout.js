import { Nunito } from 'next/font/google'
import './global.css'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className="dark ">
            <body className="antialiased">{children}</body>
        </html>
    )
}

export const metadata = {
    title: 'JaspeAcademy',
}

export default RootLayout
