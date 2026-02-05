import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectService } from '../services/projectService'
import useInView from '../hooks/useInView'

function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [projectDetailRef, ProjectDetailInView] = useInView()

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true)
        const response = await projectService.getById(id)
        setProject(response.data)
        setError(null)
      } catch (err) {
        setError('Projet non trouvé')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-xl text-gray-400">Chargement du projet…</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">{error}</p>
          <Link
            to="/projects"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition"
          >
            ← Retour aux projets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div ref={projectDetailRef} className={`min-h-screen bg-black py-20 transition-all duration-700 ${ProjectDetailInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition mb-8"
        >
          <span className="transition group-hover:-translate-x-1">←</span>
          Retour aux projets
        </Link>

        <div
          className="
            rounded-xl p-8 mb-8
            bg-gradient-to-b from-gray-900/80 to-gray-950
            border border-gray-800
            shadow-lg shadow-black/40
          "
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            {project.title}
          </h1>

          <div className="flex gap-2 flex-wrap mb-6">
            {project.technologies?.map((tech) => (
              <span
                key={tech.id}
                className="
                  px-3 py-1 rounded-full text-sm font-medium
                  border border-gray-700
                "
                style={{
                  backgroundColor: `${tech.color}20`,
                  color: tech.color,
                }}
              >
                {tech.name}
              </span>
            ))}
          </div>

          {(project.start_date || project.end_date) && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 mb-6">
              {project.start_date && (
                <span>
                  Début :{' '}
                  {new Date(project.start_date).toLocaleDateString('fr-FR')}
                </span>
              )}
              {project.end_date && (
                <span>
                  Fin :{' '}
                  {new Date(project.end_date).toLocaleDateString('fr-FR')}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                  bg-gray-900 text-gray-200
                  border border-gray-800
                  hover:bg-gray-800 hover:border-gray-700
                  shadow-lg shadow-black/30
                  transition
                "
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Voir sur GitHub
              </a>
            )}

            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                  bg-indigo-600 text-white
                  hover:bg-indigo-500
                  shadow-lg shadow-indigo-600/20
                  transition
                "
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Voir la démo
              </a>
            )}
          </div>
        </div>

        <div
          className="
            rounded-xl p-8 mb-8
            bg-gradient-to-b from-gray-900/80 to-gray-950
            border border-gray-800
            shadow-lg shadow-black/40
          "
        >
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {project.content && (
          <div
            className="
              rounded-xl p-8 mb-8
              bg-gradient-to-b from-gray-900/80 to-gray-950
              border border-gray-800
              shadow-lg shadow-black/40
            "
          >
            <h2 className="text-2xl font-bold text-white mb-4">Détails</h2>
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {project.content}
            </div>
          </div>
        )}

        {project.images && project.images.length > 0 && (
          <div
            className="
              rounded-xl p-8
              bg-gradient-to-b from-gray-900/80 to-gray-950
              border border-gray-800
              shadow-lg shadow-black/40
            "
          >
            <h2 className="text-2xl font-bold text-white mb-6">Galerie</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.images.map((image) => (
                <div
                  key={image.id}
                  className="
                    group overflow-hidden rounded-xl aspect-video
                    bg-gray-900 border border-gray-800
                    shadow-lg shadow-black/30
                    hover:border-gray-700
                    transition
                    flex items-center justify-center
                  "
                >
                  <span className="text-gray-500 text-sm">
                    {image.name || 'Image du projet'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail
