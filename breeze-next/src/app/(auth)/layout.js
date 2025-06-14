import Link from 'next/link'
import AuthCard from '/src/app/(auth)/AuthCard'
import ApplicationLogo from '/src/components/ApplicationLogo'

export const metadata = {
    title: 'Laravel',
}

const Layout = ({ children }) => {
    return (
        <div >
            <div className="antialiased text-gray-900 ">

                    {children}

            </div>
        </div>
    )
}

export default Layout
