import Sidebar from "/src/components/dashboard/Sidebar";
import Footer from "/src/components/dashboard/Footer";
import Header from '/src/app/(app)/Header'



const DashLayout = ({ children }) => {
    return (
        <>
            <Header title="Information"/>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />

                <div className="flex flex-col flex-1 mt-5">

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