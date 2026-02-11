import useInView from '../hooks/useInView'
import SEO from '../components/SEO'
import { useEffect, useState } from 'react'
import { technologyService } from '../services/technologyService'

function About() {
  const [heroRef, , heroAnim] = useInView()
  const [bioRef, , bioAnim] = useInView()
  const [timelineRef, , timelineAnim] = useInView()
  const [trainingRef, , trainingAnim] = useInView()
  const [skillsRef, , skillsAnim] = useInView()
  const [technologies, setTechnologies] = useState([])
  const [_, setLoading] = useState(true)

  useEffect(() => {
    const fetchTechnologies = async () => {
        try {
            const response =  await technologyService.getAll()
            setTechnologies(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    fetchTechnologies()
  }, [])

  const timeline = [
    {
      year: '2026',
      title: 'Projets full-stack & portfolio',
      description:
        'Développement de projets concrets avec API, BDD relationnelle et déploiement.',
    },
    {
      year: '2025',
      title: 'Formation DWWM (Bac+2) — Développeur Web & Web Mobile',
      description:
        'Montée en compétences front-end & back-end, bonnes pratiques, architecture et travail en équipe.',
    },
  ]

  const trainings = [
    {
      title: 'Développeur Web & Web Mobile (DWWM)',
      org: 'Organisme de formation',
      year: '2025–2026',
      note: 'Bac+2 — développement front, back, bases de données et déploiement.',
    },
  ]

  const about_tech = new Set([
    'React',
    'JavaScript',
    'Tailwind CSS',
    'Laravel',
    'PHP',
    'MySQL',
    'Git',
    'API REST',
  ])

  const about_levels = {
    React: 'Débutant',
    JavaScript: 'Intermédiaire',
    'Tailwind CSS': 'Débutant',
    Laravel: 'Débutant',
    PHP: 'Intermédiaire',
    MySQL: 'Intermédiaire',
    Git: 'Intermédiaire',
    'API REST': 'Intermédiaire',
  }

  const displayedTechnologies = technologies
    .filter((t) => about_tech.has(t.name))

  const LevelPill = ({ level }) => {
  if (!level) return null

  const map = {
    Débutant: 'border-gray-700 text-gray-400',
    Intermédiaire: 'border-gray-600 text-gray-300',
    Avancé: 'border-gray-500 text-white',
    Expert: 'border-white/30 text-white',
  }

  return (
    <span className={`rounded-full border px-3 py-1 text-xs ${map[level] ?? map['Intermédiaire']}`}>
      {level}
    </span>
  )
}

  return (
    <>
      <SEO
        title="À propos | Mathys Peypoux"
        description="À propos de Mathys Peypoux : parcours, formations et compétences."
      />

      <div className="min-h-screen">
        <section
          ref={heroRef}
          className={`container mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24 transition-all duration-1000 ${heroAnim}`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex flex-col items-center gap-6 text-center">
              <div className="inline-block">
                <span className="border border-gray-700 text-gray-400 px-4 py-2 rounded-full text-sm">
                  À propos
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Mathys Peypoux
              </h1>
            </div>
          </div>
        </section>

        <section
          ref={bioRef}
          className={`border-t border-gray-900 transition-all duration-1000 ${bioAnim}`}
        >
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Bio</h2>
                <p className="mt-3 text-gray-400">
                  Quelques lignes pour comprendre mon approche, mon parcours, et ce
                  que j’apporte sur un projet.
                </p>
              </div>

              <div className="lg:col-span-8 space-y-6 text-gray-300 leading-relaxed">
                <div className=" rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/60 to-gray-950/80 p-6 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
                  <p className="text-lg md:text-xl text-gray-400">
                    Je suis un développeur web en formation (Bac+2), avec une pratique
                    régulière des technologies modernes du web. Je travaille beaucoup
                    sur le front-end, et je m’oriente de plus en plus vers des projets
                    full-stack.
                  </p>
                

                  <p className="text-lg md:text-xl text-white/90 mt-4">
                    J’aborde le développement avec une approche méthodique : comprendre
                    les mécanismes, privilégier la lisibilité, structurer proprement
                    (architecture, BDD, flux) et appliquer des bonnes pratiques au
                    quotidien.
                  </p>

                
                  <p className="text-lg md:text-xl text-gray-400 mt-4">
                    Je ne me positionne pas comme “expert”, mais comme un développeur
                    en consolidation. Je sais livrer des applications fonctionnelles,
                    maintenables et déployables, tout en restant lucide sur les sujets
                    avancés à approfondir. Mon objectif : intégrer une équipe, apprendre
                    vite et gagner en autonomie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={timelineRef}
          className={`border-t border-gray-900 transition-all duration-1000 ${timelineAnim}`}
        >
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-5xl mx-auto">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Parcours</h2>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-900" />
                <ul className="space-y-6">
                  {timeline.map((item) => (
                    <li key={`${item.year}-${item.title}`} className="relative pl-12">
                      <div className="absolute left-2 top-2 h-4 w-4 rounded-full border border-gray-700 bg-gray-950" />
                      <div className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/60 to-gray-950/80 p-6 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-30">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-sm text-gray-400 border border-gray-800 rounded-full px-3 py-1">
                            {item.year}
                          </span>
                          <h3 className="text-lg md:text-xl font-semibold text-white">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-3 text-gray-300/90">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={trainingRef}
          className={`border-t border-gray-900 transition-all duration-1000 ${trainingAnim}`}
        >
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Formations</h2>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {trainings.map((t) => (
                  <div
                    key={`${t.title}-${t.year}`}
                    className="group rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/80 to-gray-950 border border-gray-800 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-white">
                            {t.title}
                          </h3>
                          <p className="mt-1 text-gray-400">{t.org}</p>
                        </div>
                        <span className="rounded-full border border-gray-800 px-3 py-1 text-sm text-gray-300 w-40 text-center">
                          {t.year}
                        </span>
                      </div>

                      {t.note && (
                        <p className="mt-4 text-gray-300/90 leading-relaxed">{t.note}</p>
                      )}
                    </div>

                    <div className="h-px bg-gray-900" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          ref={skillsRef}
          className={`border-t border-gray-900 transition-all duration-1000 ${skillsAnim}`}
        >
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Compétences</h2>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedTechnologies.map((tech) => {
                    const level = about_levels[tech.name]

                return (
                    <div
                        key={tech.id}
                        className="rounded-2xl border border-gray-800 bg-gray-950/40 p-5"
                        style={{ boxShadow: `0 0 0 1px ${tech.color}30` }}
                    >
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <span
                            className="h-3 w-3 rounded-full shrink-0"
                            style={{ backgroundColor: tech.color }}
                            />
                            <span className="text-white font-medium truncate">{tech.name}</span>
                        </div>

                        <LevelPill level={level} />
                        </div>
                    </div>
                )
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="h-12" />
      </div>
    </>
  )
}

export default About