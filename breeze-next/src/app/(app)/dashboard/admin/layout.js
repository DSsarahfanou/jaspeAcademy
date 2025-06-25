//breeze-next/src/app/(app)/dashboard/admin/layout.js
import Sidebar from "/src/components/dashboard/Sidebar";
import Footer from "/src/components/dashboard/Footer";
import Header from '/src/app/(app)/Header'



const DashLayout = ({ children }) => {
    return (
        <>
            {/*<Header title="Information"/>*/}
            <div className="flex min-h-screen bg-gray-50">
                <div className="sticky top-0 flex flex-col max-h-screen space-y-4 overflow-y-auto shadow p-4ounded">
                    <Sidebar />
                </div>
                

                <div className=" mt-24 flex flex-col flex-1">

                    <div className="flex-1 p-6 ">
                        {children}
                    </div>

                    <Footer />
                </div>
                </div>
        </>
    )
}

export default DashLayout