import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectService } from '../services/projectService'
import useInView from '../hooks/useInView'
import ProjectCardSkeleton from '../components/ProjectCardSkeleton'
import SEO from '../components/SEO'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ref, _, animationClass ] = useInView()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const response = await projectService.getAll()
      setProjects(response.data)
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des projets')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <SEO title="Mes Projets | Mathys Peypoux" />
        <div className="min-h-screen bg-black py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-12">
              Mes Projets
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
      <SEO title="Erreur | Mathys Peypoux" />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      </>
    )
  }

  return (
    <>
    <SEO title="Mes projets | Mathys Peypoux" />
      <div ref={ref} className={`min-h-screen bg-black py-20 transition-all duration-700 ${animationClass}`}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-12">
            Mes Projets
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="
                  group rounded-xl overflow-hidden
                  bg-gradient-to-b from-gray-900/80 to-gray-950
                  border border-gray-800
                  shadow-lg shadow-black/40
                  hover:shadow-xl hover:shadow-indigo-500/10
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                <div className="
                  h-48 bg-gray-900
                  flex items-center justify-center
                  border-b border-gray-800
                  text-gray-500 text-sm
                ">
                  Image du projet
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h2>

                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech.id}
                        className="
                          text-xs px-2.5 py-1 rounded-full
                          bg-gray-800 text-gray-300
                          border border-gray-700
                        "
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/projects/${project.id}`}
                    className="
                      inline-flex items-center gap-1
                      text-indigo-400 font-medium
                      group-hover:text-indigo-300
                      transition
                    "
                  >
                    Voir le projet
                    <span className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects
