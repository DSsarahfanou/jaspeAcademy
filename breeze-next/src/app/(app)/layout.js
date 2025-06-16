//home/danae/stage_jaspe/breeze-next/src/app/(app)/layout.js
'use client'

import { useAuth } from '/src/hooks/auth'
import Navigation from '/src/app/(app)/Navigation'
import Loading from '/src/app/(app)/Loading'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100">
           <div className="fixed top-0 left-0 w-full bg-white border-blue-500 ">
             <Navigation user={user} />
           </div>

            <main>{children}</main>
        </div>
    )
}

export default AppLayout
