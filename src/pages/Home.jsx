import { Link } from 'react-router-dom'
import TechnologiesSection from '../components/TechnologiesSection'

function Home() {
  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 py-32 md:py-48">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="border border-gray-700 text-gray-400 px-4 py-2 rounded-full text-sm">
              Bienvenue sur mon portfolio
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Bonjour, je suis{' '}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Mathys Peypoux
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
            Développeur Full Stack utilisant{' '}
            <span className="text-white font-semibold">React</span> {' '}
            <span className="text-white font-semibold">Tailwind</span> {' '}
            <span className="text-white font-semibold">Laravel</span> {' '}
            <span className="text-white font-semibold">Php</span> {' '}
            <span className="text-white font-semibold">Django</span> et{' '}
            <span className="text-white font-semibold">SQL</span> {' '}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-200 transition transform hover:scale-105 font-medium text-lg"
            >
              Voir mes projets
            </Link>
            <Link
              to="/contact"
              className="border-2 border-gray-700 text-white px-8 py-4 rounded-lg hover:bg-gray-900 transition font-medium text-lg"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-900">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">7+</div>
              <div className="text-gray-400">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">3+</div>
              <div className="text-gray-400">Technologies maîtrisées</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">Loading...</div>
              <div className="text-gray-400">Still coding wait...</div>
            </div>
          </div>
        </div>
      </section>

      <TechnologiesSection />
    </div>
  )
}

export default Home