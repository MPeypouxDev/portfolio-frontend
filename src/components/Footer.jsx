import { Link } from 'react-router-dom'

function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-black border-t border-gray-900">
            <div className="container mx-auto px-4 py-14">
                <div className="
                    rounded-xl p-8
                    bg-gradient-to-b from-gray-900/80 to-gray-950
                    border border-gray-800
                    shadow-lg shadow-black/40
                    "
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div>
                            <h3 className="text-white font-semibold text-lg">
                                Mathys Peypoux
                            </h3>
                            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                                Développeur Full Stack
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4">
                                Navigation
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/"
                                        className="text-gray-400 hover:text-indigo-300 transition text-sm"
                                        >
                                            Accueil
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                    to="/projects"
                                    className="text-gray-400 hover:text-indigo-300 transition text-sm"
                                    >
                                        Projets
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                    to="/contact"
                                    className="text-gray-400 hover:text-indigo-300 transition text-sm"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4">
                                Me suivre
                            </h3>

                            <div className="flex items-center gap-3">
                                <a 
                                href="https://github.com/MPeypouxDev"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="
                                    w-10 h-10 rounded-lg
                                    bg-gray-900 border border-gray-800
                                    flex items-center justify-center
                                    hover:bg-gray-800 hover:border-gray-700
                                    hover:shadow-lg hover:shadow-indigo-500/10
                                    transition-all
                                    "
                                >
                                    <svg className="w-5 h-5 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>

                                <a 
                                href="https://www.linkedin.com/in/ton-profil"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="
                                w-10 h-10 rounded-lg
                                bg-gray-900 border border-gray-800
                                flex items-center justify-center
                                hover:bg-gray-800 hover:border-gray-700
                                hover:shadow-lg hover:shadow-indigo-500/10
                                transition-all
                                "
                                >
                                    <svg className="w-5 h-5 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>

                                <a 
                                href="mailto:contact@mathyspeypoux.com"
                                aria-label="Email"
                                className="
                                w-10 h-10 rounded-lg
                                bg-gray-900 border border-gray-800
                                flex items-center justify-center
                                hover:bg-gray-800 hover:border-gray-700
                                hover:shadow-lg hover:shadow-indigo-500/10
                                transition-all
                                "
                                >
                                    <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </a>
                            </div>

                            <p className="text-gray-500 text-sm mt-4">
                                Disponible pour alternance / missions.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <p className="text-gray-500 text-sm">
                            © {year} Mathys Peypoux. Tous droits réservés.
                        </p>
                        <p className="text-gray-500 text-sm">
                            Construit avec React + Tailwind
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer