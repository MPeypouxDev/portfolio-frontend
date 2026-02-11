import { Link } from "react-router-dom";
import searching from '/icons/searching.svg'

function NotFound() {
    return (
        <>
        <SEO title="Erreur 404 | Mathys Peypoux" />
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="relative max-w-4xl w-full">
                    <img src={searching}
                        alt="404_page"
                        className="w-full opacity-70"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/10">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                                Oups, page introuvable
                        </h1>
                        <p className="text-lg md:text-xl text-black mb-4">
                            Nous avons cherché partout, cette page semble avoir disparu.
                        </p>
                        <p className="text-lg md:text-xl text-black mb-12">
                            Si nous retournions en terrain connu.
                        </p>
                        <Link
                        to="/"
                        className="inline-block bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-200 transition transform hover:scale-105 font-medium text-lg"
                        >
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound