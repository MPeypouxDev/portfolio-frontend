import { useState, useEffect } from "react"
import { technologyService } from "../../../services/technologyService"
import { useNavigate, useParams } from "react-router-dom"
import SEO from "../../../components/SEO"

function TechnologyForm() {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        color: '',
        icon: '',
    })
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError(null)
            setSuccess(false)
            if (id) {
                await technologyService.update(id, formData)
            } else {
                await technologyService.create(formData)
            }
            setSuccess(true)
            navigate('/admin/technologies')
        } catch (err) {
            setError("Erreur lors de l'enregistrement de la technologie")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            const fetchTechnology = async () => {
                try {
                    const response = await technologyService.getById(id)
                    setFormData(response.data)
                } catch (err) {
                    setError("Erreur lors du chargement de la technologie")
                    console.error(err)
                }
            }
            fetchTechnology()
        }
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
            <SEO title={id ? "Modifier la technologie | Admin" : "Nouvelle technologie | Admin"} />
            <div className="p-8 max-w-2xl">

                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/admin/technologies')}
                        className="text-gray-500 hover:text-white transition text-sm"
                    >
                        ← Retour
                    </button>
                    <div>
                        <p className="text-indigo-400 text-xs font-medium tracking-widest uppercase mb-1">Administration</p>
                        <h1 className="text-3xl font-bold text-white">
                            {id ? 'Modifier la technologie' : 'Nouvelle technologie'}
                        </h1>
                    </div>
                </div>

                {success && (
                    <div className="mb-6 rounded-lg px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
                        Technologie enregistrée avec succès.
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

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Nom *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Ex: React" />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Type *</label>
                            <select name="type" value={formData.type} onChange={handleChange} required className={inputClass}>
                                <option value="">Sélectionner</option>
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="database">Base de données</option>
                                <option value="tools">Outils</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Couleur *</label>
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-9 h-9 rounded-lg border border-gray-700 shrink-0"
                                    style={{ backgroundColor: formData.color || '#1f2937' }}
                                />
                                <input
                                    type="text"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    required
                                    placeholder="#61DAFB"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Icône</label>
                            <input
                                name="icon"
                                type="file"
                                onChange={handleChange}
                                className="
                                    w-full rounded-lg px-4 py-2.5
                                    bg-gray-900/80 text-gray-400
                                    border border-gray-800
                                    file:mr-4 file:py-1 file:px-3
                                    file:rounded-md file:border-0
                                    file:text-xs file:font-medium
                                    file:bg-indigo-600/20 file:text-indigo-400
                                    hover:file:bg-indigo-600/30
                                    transition text-sm cursor-pointer
                                "
                            />
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
                                {id ? 'Modification en cours…' : 'Création en cours…'}
                            </>
                        ) : (
                            <span>{id ? 'Modifier la technologie' : 'Créer la technologie'}</span>
                        )}
                    </button>
                </form>
            </div>
        </>
    )
}

export default TechnologyForm