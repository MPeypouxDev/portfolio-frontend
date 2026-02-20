import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { technologyService } from '../../../services/technologyService'
import { projectService } from '../../../services/projectService'
import SEO from "../../../components/SEO"

function ProjectCreate() {
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
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await projectService.create(formData)
            const projectId = response.data.id
            setSuccess(true)
            navigate('/admin/projects')
        } catch (err) {
            setError("Erreur lors de la création du projet")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await technologyService.getAll()
                setTechnologies(response.data.data ?? response.data)
            } catch (err) {
                setError("Erreur lors de la récupération des technologies")
                console.error(err)
            }
        }
        fetchTechnologies()
    }, [])

    const inputClass = `
        w-full rounded-lg px-4 py-2.5
        bg-gray-900/80 text-gray-200
        border border-gray-800
        placeholder-gray-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
        focus:border-indigo-500
        transition text-sm
    `

    return (
        <>
            <SEO title="Nouveau projet | Admin" />
            <div className="p-8 max-w-3xl">

                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/admin/projects')}
                        className="text-gray-500 hover:text-white transition text-sm"
                    >
                        ← Retour
                    </button>
                    <div>
                        <p className="text-indigo-400 text-xs font-medium tracking-widest uppercase mb-1">Administration</p>
                        <h1 className="text-3xl font-bold text-white">Créer un projet</h1>
                    </div>
                </div>

                {success && (
                    <div className="mb-6 rounded-lg px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
                        Projet créé avec succès.
                    </div>
                )}
                {error && (
                    <div className="mb-6 rounded-lg px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="rounded-xl p-8 bg-gray-900/60 border border-gray-800 shadow-lg shadow-black/20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Titre *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required className={inputClass} />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Description *</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className={inputClass} />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Type *</label>
                            <select name="type" value={formData.type} onChange={handleChange} required className={inputClass}>
                                <option value="">Sélectionner</option>
                                <option value="frontend">Frontend</option>
                                <option value="fullstack">Fullstack</option>
                                <option value="backend">Backend</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Statut *</label>
                            <select name="status" value={formData.status} onChange={handleChange} required className={inputClass}>
                                <option value="">Sélectionner</option>
                                <option value="draft">Brouillon</option>
                                <option value="published">Publié</option>
                                <option value="archived">Archivé</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Date de réalisation *</label>
                            <input type="date" name="realisation_date" value={formData.realisation_date} onChange={handleChange} required className={inputClass} />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Ordre *</label>
                            <input type="number" name="order" value={formData.order} onChange={handleChange} required className={inputClass} />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">URL GitHub</label>
                            <input type="text" name="github_url" value={formData.github_url} onChange={handleChange} className={inputClass} />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">URL Demo</label>
                            <input type="text" name="demo_url" value={formData.demo_url} onChange={handleChange} className={inputClass} />
                        </div>

                        <div className="md:col-span-2 flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="is_featured"
                                id="is_featured"
                                checked={formData.is_featured}
                                onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                                className="w-4 h-4 accent-indigo-500"
                            />
                            <label htmlFor="is_featured" className="text-sm text-gray-400">Projet mis en avant</label>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">Technologies</label>
                            <div className="flex flex-wrap gap-2">
                                {technologies.map(tech => {
                                    const isSelected = formData.technologies.includes(tech.id)
                                    return (
                                        <label
                                            key={tech.id}
                                            className={`
                                                flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer border transition
                                                ${isSelected
                                                    ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30'
                                                    : 'text-gray-400 border-gray-700 hover:border-gray-600'
                                                }
                                            `}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => {
                                                    const selected = isSelected
                                                        ? formData.technologies.filter(id => id !== tech.id)
                                                        : [...formData.technologies, tech.id]
                                                    setFormData({...formData, technologies: selected})
                                                }}
                                                className="hidden"
                                            />
                                            {tech.name}
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full py-3 rounded-lg font-medium text-sm
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
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Création en cours…
                            </>
                        ) : (
                            'Créer le projet'
                        )}
                    </button>
                </form>
            </div>
        </>
    )
}

export default ProjectCreate