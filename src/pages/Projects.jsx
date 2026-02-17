import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectService } from '../services/projectService'
import { technologyService } from '../services/technologyService'
import useInView from '../hooks/useInView'
import ProjectCardSkeleton from '../components/ProjectCardSkeleton'
import SEO from '../components/SEO'
import ProjectFilters from '../components/ProjectFilters'
import ErrorMessage from '../components/ErrorMessage'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [technologies, setTechnologies] = useState([])
  const [filters, setFilters] = useState({ category: null, technology: null })
  const [ref, _, animationClass] = useInView()

  useEffect(() => {
    loadProjects()
    loadTechnologies()
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchCategory = filters.category === null || project.type === filters.category
    const matchTechnology = filters.technology === null || 
      project.technologies?.some(tech => Number(tech.id) === Number(filters.technology))
    return matchCategory && matchTechnology
  })

  const handleFilterChange = (nextFilters) => {
    setFilters(nextFilters)
  }

  const loadTechnologies = async () => {
    try {
      const response = await technologyService.getAll()
      setTechnologies(response.data.data)
    } catch (err) {
      console.error("Erreur lors du chargement des technologies", err)
    }
  }

  const loadProjects = async () => {
    try {
      setLoading(true)
      const response = await projectService.getAll()
      setProjects(response.data.data)
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des projets')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

   const  handleRetry = async () => {
    setError(null)
    loadProjects()
  }

  if (loading) {
    return (
      <>
        <SEO title="Mes Projets | Mathys Peypoux" />
        <div className="min-h-screen py-20">
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
        <div className="min-h-screen flex items-center justify-center">
          <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
      </>
    )
  }

  return (
    <>
      <SEO title="Mes projets | Mathys Peypoux" />
      <div ref={ref} className={`min-h-screen py-20 transition-all duration-700 ${animationClass}`}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-12">
            Mes Projets
          </h1>

          <ProjectFilters 
            technologies={technologies} 
            onFilterChange={handleFilterChange}
          />

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-white mb-2">
                Aucun projet trouvé
              </h3>
              <p className="text-gray-400 mb-6">
                Essayez de modifier vos filtres pour voir plus de projets
              </p>
              <button
                onClick={() => handleFilterChange({ category: null, technology: null })}
                className="px-6 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700 transition"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
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
                  <div className="h-48 bg-gray-900 border-b border-gray-800 overflow-hidden">
                    {project.images && project.images.length > 0 ? (
                      <img 
                        src={project.images[0].path}
                        alt={project.images[0].alt_text || project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                        Pas d'image
                      </div>
                    )}
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
          )}
        </div>
      </div>
    </>
  )
}

export default Projects