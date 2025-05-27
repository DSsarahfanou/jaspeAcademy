import Link from 'next/link'
import AuthCard from '/src/app/(auth)/AuthCard'
import ApplicationLogo from '/src/components/ApplicationLogo'

export const metadata = {
    title: 'Laravel',
}

const Layout = ({ children }) => {
    return (
        <div>
            <div className="antialiased text-gray-900">
                <AuthCard
                    logo={
                        <Link href="/">
                            <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" />
                        </Link>
                    }>
                    {children}
                </AuthCard>
            </div>
        </div>
    )
}

export default Layout
