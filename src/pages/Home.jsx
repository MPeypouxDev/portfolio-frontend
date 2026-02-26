import { Link } from 'react-router-dom'
import TechnologiesSection from '../components/TechnologiesSection'
import useInView from '../hooks/useInView'
import useCounter from '../hooks/useCounter'
import SEO from '../components/SEO'

function Home() {
  const [homeRef, _, homeAnimationClass] = useInView()
  const [statsRef, statsInView, statsAnimationClass] = useInView()

  const projectsCount = useCounter(4, 2000, statsInView)
  const technologiesCount = useCounter(3, 1500, statsInView)


  return (
    <>
      <SEO />
      
      <div className="min-h-screen">
        <section
          ref={homeRef}
          className={`container mx-auto px-4 py-32 md:py-48 transition-all duration-1000 ${homeAnimationClass}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="border border-white/10 ring-1 ring-white/10 text-gray-400 px-4 py-2 rounded-full text-sm">
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
              Développeur Full Stack, je construis des apps web avec{' '}
              <span className="text-white font-semibold">React</span>{' '}
              <span className="text-white font-semibold">Tailwind</span>{' '}
              <span className="text-white font-semibold">Laravel</span>{' '}
              <span className="text-white font-semibold">Php</span>{' '}
              <span className="text-white font-semibold">Django</span> et{' '}
              <span className="text-white font-semibold">SQL</span>
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
                className="border border-white/10 ring-1 ring-white/10 text-white px-8 py-4 rounded-lg hover:bg-white/5 transition font-medium text-lg"
              >
                Me contacter
              </Link>
            </div>
          </div>
        </section>

        <section
          ref={statsRef}
          className={`border-t border-white/10 transition-all duration-700 ${statsAnimationClass}`}
        >
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="
                text-center rounded-xl p-8
                bg-gray-950/70 backdrop-blur-md
                border border-white/10 ring-1 ring-white/10
                shadow-lg shadow-black/40
                hover:shadow-xl hover:shadow-indigo-500/10
                transition-all duration-300
              ">
                <div className="text-5xl font-bold text-white mb-2">{projectsCount}+</div>
                <div className="text-gray-400">Projets réalisés</div>
              </div>

              <div className="
                text-center rounded-xl p-8
                bg-gray-950/70 backdrop-blur-md
                border border-white/10 ring-1 ring-white/10
                shadow-lg shadow-black/40
                hover:shadow-xl hover:shadow-indigo-500/10
                transition-all duration-300
              ">
                <div className="text-5xl font-bold text-white mb-2">{technologiesCount}+</div>
                <div className="text-gray-400">Technologies maîtrisées</div>
              </div>

              <div className="
                text-center rounded-xl p-8
                bg-gray-950/70 backdrop-blur-md
                border border-white/10 ring-1 ring-white/10
                shadow-lg shadow-black/40
                hover:shadow-xl hover:shadow-indigo-500/10
                transition-all duration-300
              ">
                <div className="text-5xl font-bold text-white mb-2">Grenoble</div>
                <div className="text-gray-400">En recherche d'alternance</div>
              </div>

            </div>
          </div>
        </section>

        <TechnologiesSection />
      </div>
    </>
  )
}

export default Home