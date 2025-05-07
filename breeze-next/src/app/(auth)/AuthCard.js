import Footer from "/src/components/dashboard/Footer"
import LoginLinks from "../LoginLinks"

const AuthCard = ({ logo, children }) => (
  <>
      <LoginLinks/>
      <div className="flex items-center justify-center w-full min-h-screen p-4  bg-[url('/image/background_login.jpg')] bg-cover bg-center">
        <div className="flex w-full max-w-5xl overflow-hidden bg-white shadow-2xl rounded-2xl">
          {children}
        </div>
      </div>
      <Footer/>
  </>
)

export default AuthCard
