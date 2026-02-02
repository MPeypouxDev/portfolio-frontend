import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-black-900">
            <section className="container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-6">
                        <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                            Bienvenue sur mon portfolio
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Bonjour, je suis {' '}
                        <span className="text-gray-900">Mathys Peypoux</span>
                    </h1>

                    <p className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Développeur Full Stack {' '}
                        <span className="font-semibold text-gray-800">React</span> {' '}
                        <span className="font-semibold text-gray-800">Laravel</span> {' '}
                        <span className="font-semibold text-gray-800">Php</span> {' '}
                        <span className="font-semibold text-gray-800">Python</span>
                    </p>

                    <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                        Je crée des applications web modernes, performantes et élégantes. Découvrez mes projets et n'hésitez pas à me contacter !
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                        to="/projects"
                        className="bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-slate-100 transition transform hover:scale-105 font-medium text-lg shadow-lg">
                            Voir mes projets
                        </Link>
                        <Link
                        to="/contact"
                        className="bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-slate-100 transition transform hover:scale-105 font-medium text-lg shadow-lg">
                            Me contacter
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow-md text-center">
                        <div className="text-4xl font-bold text-gray-700 mb-2">3+</div>
                        <div className="text-gray-700">Projets réalisés</div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-md text-center">
                        <div className="text-4xl font-bold text-gray-700 mb-2">7+</div>
                        <div className="text-gray-700">Technologies maîtrisées</div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-md text-center">
                        <div className="text-4xl font-bold text-gray-700 mb-2">Loading...</div>
                        <div className="text-gray-700">Still coding wait...</div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home