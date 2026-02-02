import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectService } from '../services/projectService'

function ProjectDetail() {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-xl text-gray-600">
                    Chargement du projet...
                </p>
            </div>
        )
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-red-600 mb-4">{error}</p>
                    <Link to="/projects"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← Retour aux projets
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link to="/projects"
                className="text-blue-600 hover:text-blue-700 font-medium mb-6 inline-block"
                >
                    ← Retour aux projets
                </Link>

                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {project.title}
                    </h1>

                    <div className="flex gap-2 flex-wrap mb-6">
                        {project.technologies?.map((tech) => (
                            <span
                            key={tech.id}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                            style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                            >
                                {tech.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4 text-sm text-gray-600 mb-4">
                        {project.start_date && (
                            <span>Début: {new
                            Date(project.start_date).toLocaleDateString('fr-FR')}</span>
                        )}
                        {project.end_date && (
                            <span>Début: {new
                            Date(project.end_date).toLocaleDateString('fr-FR')}</span>
                        )}
                    </div>

                    <div className="flex gap-4">
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition inline-flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    Voir sur Github
                            </a>
                        )}
                        {project.demo_url && (
                            <a
                             href={project.demo_url}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2"
                             >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Voir la démo
                             </a>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {project.description}
                    </p>
                    </div>

                    {project.content && (
                    <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Détails</h2>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {project.content}
                        </div>
                    </div>
                    )}

                    {project.images && project.images.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Galerie</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.images.map((image) => (
                            <div
                            key={image.id}
                            className="bg-gray-200 rounded-lg overflow-hidden aspect-video flex items-center justify-center"
                            >
                            <span className="text-gray-400">
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