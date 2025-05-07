import { FaFacebookF, FaInstagram, FaTwitter, FaGraduationCap  } from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="py-10 text-white bg-gray-900">
      <div className="grid grid-cols-1 gap-8 px-4 mx-auto max-w-7xl md:grid-cols-4">
        {/* Logo & Description */}
        <div>
          <h2 className="mb-2 text-2xl font-bold">        
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 transition-transform hover:scale-105">
                    <FaGraduationCap className="text-blue-500" />
                    <span>Jaspe <span className="font-light text-gray-600">Academy</span></span>
            </Link></h2>
          <p className="text-sm text-gray-400">
            Plateforme d'elearning dans le domaine des Réseaux Informatiques et Télécommunications.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-white">Accueil</a></li>
            <li><a href="/produits" className="hover:text-white">Formations</a></li>
            <li><a href="/apropos" className="hover:text-white">Shop</a></li>
          </ul>
        </div>

        {/* Catégories */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/categorie/poterie" className="hover:text-white">Bénin, Calavi , Bidossèssi</a></li>
            <li><a href="/categorie/tissage" className="hover:text-white">(+229)  01 99  00 18 03</a></li>
            <li><a href="/categorie/perles" className="hover:text-white">jaspe@gmail.com</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Suivez-nous</h3>
          <div className="flex space-x-4 text-xl text-gray-400">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-sm text-center text-gray-500">
        &copy; 2025 JaspeAcademy. Tous droits réservés.
      </div>
    </footer>
  );
}
