import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { technologyService } from '../../../services/technologyService'
import { projectService } from '../../../services/projectService'
import SEO from "../../../components/SEO"

function ProjectEdit() {
    const { id } = useParams()
        const [formData, setFormData] = useState({
            title: '',
            description: '',
            type: '',
            status: '',
            realisation_date: '',
            github_url: '',
            demo_url: '',
            is_featured: false,
            order: 0,
            technologies: [],
        })
        const [loading, setLoading] = useState(false)
        const [success, setSuccess] = useState(false)
        const [error, setError] = useState(null)
        const [images, setImages] = useState([])
        const [technologies, setTechnologies] = useState([])
        const navigate = useNavigate()

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            })
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                setLoading(true)
                const response = await projectService.update(id, formData)
                const projectId = response.data.id
                setSuccess(true)
                navigate('/admin/projects')
            } catch (err) {
                setError("Erreur lors de la modification du projet")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        useEffect(() => {
            const fetchTechnologies = async () => {
                try {
                    setLoading(true)
                    const response = await technologyService.getAll()
                    setTechnologies(response.data)
                } catch (err) {
                    setError("Erreur lors de la récupérations des technologies")
                    console.error(err)
                } finally {
                    setLoading(false)
                }
            }
            fetchTechnologies()

            const fetchProject = async () => {
                const response = await projectService.getById(id)
                setFormData(response.data)
            }
            fetchProject()
        }, [])


        return (
            <>
            <SEO title="Modifier le projet | Admin" />
                <div className="min-h-screen py-20 transition-all duration-700">
                    <div className="container mx-auto px-4 max-w-2xl">
                        <h1 className="text-4xl font-bold text-white mb-12">
                            Modifier le projet
                        </h1>

                        {success && (
                            <div className="
                            mb-6 rounded-lg px-4 py-3
                            bg-emerald-500/10 border border-emerald-500/30
                            text-emerald-400
                            ">
                                Projet crée avec succès.
                            </div>
                        )}

                        {error && (
                            <div className="
                            mb-6 rounded-lg px-4 py-3
                            bg-red-500/10 border-red-500/30
                            text-red-400
                            ">
                                {error}
                            </div>
                        )}

                        <form
                        onSubmit={handleSubmit}
                        className="
                            rounded-xl p-8
                            bg-gradient-to-b from-gray-900/80 to-fray-950
                            border border-gray-800
                            shadow-lg shadow-black/40
                            "
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Titre *
                                    </label>
                                    <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full rounded-lg px-4 py-2.5
                                        bg-gray-900 text-gray-200
                                        border border-gray-800
                                        placeholder-gray-600
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                        focus:border-indigo-500
                                        transition
                                    "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full rounded-lg px-4 py-2.5
                                        bg-gray-900 text-gray-200
                                        border border-gray-800
                                        placeholder-gray-600
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                        focus:border-indigo-500
                                        transition
                                    "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Type *
                                    </label>
                                    <select
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full rounded-lg px-4 py-2.5
                                        bg-gray-900 text-gray-200
                                        border border-gray-800
                                        placeholder-gray-600
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                        focus:border-indigo-500
                                        transition
                                    "
                                    >
                                        <option value="">Sélectionner</option>
                                        <option value="frontend">Frontend</option>
                                        <option value="fullstack">Fullstack</option>
                                        <option value="backend">Backend</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Statut *
                                    </label>
                                    <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full rounded-lg px-4 py-2.5
                                        bg-gray-900 text-gray-200
                                        border border-gray-800
                                        placeholder-gray-600
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                        focus:border-indigo-500
                                        transition
                                    ">
                                        <option value="">Sélectionner</option>
                                        <option value="draft">Brouillon</option>
                                        <option value="published">Publié</option>
                                        <option value="archived">Archivé</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Date de réalisation *
                                    </label>
                                    <input
                                    type="date"
                                    name="realisation_date"
                                    value={formData.realisation_date}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full rounded-lg px-4 py-2.5
                                        bg-gray-900 text-gray-200
                                        border border-gray-800
                                        placeholder-gray-600
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                        focus:border-indigo-500
                                        transition
                                    "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        URL GitHub *
                                    </label>
                                    <input
                                    type="text"
                                    name="github_url"
                                    value={formData.github_url}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full rounded-lg px-4 py-2.5
                                        bg-gray-900 text-gray-200
                                        border border-gray-800
                                        placeholder-gray-600
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                        focus:border-indigo-500
                                        transition
                                    "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        URL Demo *
                                    </label>
                                    <input
                                    type="text"
                                    name="demo_url"
                                    value={formData.demo_url}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full rounded-lg px-4 py-2.5
                                        bg-gray-900 text-gray-200
                                        border border-gray-800
                                        placeholder-gray-600
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                        focus:border-indigo-500
                                        transition
                                    "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Ordre *
                                    </label>
                                    <input
                                    type="number"
                                    name="order"
                                    value={formData.order}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full rounded-lg px-4 py-2.5
                                        bg-gray-900 text-gray-200
                                        border border-gray-800
                                        placeholder-gray-600
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                        focus:border-indigo-500
                                        transition
                                    "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        En collaboration *
                                    </label>
                                    <input
                                    type="checkbox"
                                    name="is_featured"
                                    value={formData.is_featured}
                                    onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                                    required
                                    className="
                                        w-full rounded-lg px-4 py-2.5
                                        bg-gray-900 text-gray-200
                                        border border-gray-800
                                        placeholder-gray-600
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                        focus:border-indigo-500
                                        transition
                                    "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Technologies
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {technologies.map(tech => (
                                            <label key={tech.id} className="flex items-center gap-2 text-gray-300 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.technologies.includes(tech.id)}
                                                    onChange={() => {
                                                        const selected = formData.technologies.includes(tech.id)
                                                            ? formData.technologies.filter(id => id !== tech.id)
                                                            : [...formData.technologies, tech.id]
                                                        setFormData({...formData, technologies: selected})
                                                    }}
                                                />
                                                {tech.name}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full py-3 rounded-lg font-medium
                                    bg-indigo-600 text-white
                                    hover:bg-indigo-500
                                    shadow-lg shadow-indigo-600/20
                                    transition
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    flex items-center justify-center gap-2
                                "
                                >
                                {loading ? (
                                    <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle 
                                        className="opacity-25" 
                                        cx="12" 
                                        cy="12" 
                                        r="10" 
                                        stroke="currentColor" 
                                        strokeWidth="4"
                                        fill="none"
                                        />
                                        <path 
                                        className="opacity-75" 
                                        fill="currentColor" 
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Modification en cours…
                                    </>
                                ) : (
                                    'Modifier le projet'
                                )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

export default ProjectEdit