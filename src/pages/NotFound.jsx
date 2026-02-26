import { Link } from "react-router-dom"
import searching from '/icons/searching.svg'
import SEO from "../components/SEO"
import { motion } from 'framer-motion'

function NotFound() {
    return (
        <>
        <SEO title="Erreur 404 | Mathys Peypoux" />
            <div className="min-h-screen flex items-start justify-center px-4">
                <div className="relative max-w-4xl w-full">
                    <motion.img src={searching}
                        animate={{ y: -20 }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse"}}
                        alt="404_page"
                        className="w-full opacity-70"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 text-center px-4 bg-black/10">
                        <div className="flex flex-row gap-4">
                            <Link
                                to="/"
                                className="inline-block  bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700 px-8 py-4 transition transform hover:scale-105 font-medium text-lg"
                                >
                                    Retour à l'accueil
                            </Link>
                            <Link
                                to="/projects"
                                className="inline-block  bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700 px-8 py-4 transition transform hover:scale-105 font-medium text-lg"
                                >
                                    Retour aux projets
                            </Link>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg mt-8">
                                Oups, page introuvable
                        </h1>
                        <p className="text-lg md:text-xl text-white drop-shadow-lg mb-4">
                            Nous avons cherché partout, cette page semble avoir disparu.
                        </p>
                        <p className="text-lg md:text-xl text-white drop-shadow-lg mb-12">
                            Si nous retournions en terrain connu.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound