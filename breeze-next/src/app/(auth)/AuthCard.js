import Footer from "/src/components/dashboard/Footer";
import LoginLinks from "../LoginLinks";

const AuthCard = ({ logo, image, children }) => (
  <>
    <LoginLinks />
    <div className="flex items-center justify-center w-full min-h-screen p-4 ">
      <div className="flex w-full max-w-5xl overflow-hidden shadow-2xl mt-7 bg-white/10 backdrop-blur-md rounded-2xl">
        {/* Colonne gauche : Image (si elle est fournie) */}
        {image && (
          <div className="hidden w-1/2 md:block">
            <img
              src={image}
              alt="Auth Illustration"
              className="object-cover w-full h-full bg-blue-600"
            />
          </div>
        )}

        {/* Colonne droite : Formulaire */}
        <div className={`${image ? "w-full md:w-1/2" : "w-full"} p-8 flex flex-col justify-center  `}>
          {children}
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default AuthCard;
