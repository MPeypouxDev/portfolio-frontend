import { useState, useEffect } from "react"
import { technologyService } from "../../../services/technologyService"
import { useNavigate } from "react-router-dom"
import SEO from "../../../components/SEO"

function TechnologyList() {
    const [technologies, setTechnologies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const techData = async () => {
            try {
                setLoading(true)
                const response = await technologyService.getAll()
                setTechnologies(response.data.data ?? response.data)
            } catch (err) {
                setError("Erreur lors de la récupération des technologies")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        techData()
    }, [])

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            await technologyService.delete(id)
            setTechnologies(technologies.filter(t => t.id !== id))
        } catch (err) {
            setError("Erreur lors de la suppression de la technologie")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SEO title="Technologies | Admin" />
            <div className="p-8">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-indigo-400 text-xs font-medium tracking-widest uppercase mb-1">Administration</p>
                        <h1 className="text-3xl font-bold text-white">Technologies</h1>
                    </div>
                    <button
                        onClick={() => navigate('/admin/technologies/new')}
                        className="
                            px-4 py-2.5 rounded-lg text-sm font-medium
                            bg-indigo-600 text-white
                            hover:bg-indigo-500
                            shadow-lg shadow-indigo-600/20
                            transition flex items-center gap-2
                        "
                    >
                        + Nouvelle technologie
                    </button>
                </div>

                {error && (
                    <div className="mb-6 rounded-lg px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="rounded-xl bg-gray-900/60 border border-gray-800 shadow-lg shadow-black/20 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Nom</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Type</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Couleur</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Icône</th>
                                <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/60">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-gray-500 text-sm">Chargement…</td>
                                </tr>
                            ) : technologies.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-gray-500 text-sm">Aucune technologie</td>
                                </tr>
                            ) : (
                                technologies.map(technology => (
                                    <tr key={technology.id} className="hover:bg-gray-800/30 transition">
                                        <td className="px-6 py-4 text-white text-sm font-medium">{technology.name}</td>
                                        <td className="px-6 py-4 text-gray-400 text-sm capitalize">{technology.type}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-4 h-4 rounded-full border border-gray-700"
                                                    style={{ backgroundColor: technology.color }}
                                                />
                                                <span className="text-gray-400 text-sm">{technology.color}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">{technology.icon ?? '—'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => navigate(`/admin/technologies/${technology.id}`)}
                                                    className="px-3 py-1.5 rounded-lg text-xs text-indigo-400 hover:text-white hover:bg-indigo-600/20 border border-indigo-500/30 transition"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(technology.id)}
                                                    className="px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:text-white hover:bg-rose-500/20 border border-rose-500/30 transition"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TechnologyList