import { useState, useEffect } from "react"
import { projectService } from "../../../services/projectService"
import { useNavigate } from "react-router-dom"
import SEO from "../../../components/SEO"

function ProjectList() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const projectData = async () => {
            try {
                setLoading(true)
                const response = await projectService.getAll()
                setProjects(response.data.data ?? response.data)
            } catch (err) {
                setError("Erreur lors du chargement des données projets")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        projectData()
    }, [])

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            await projectService.delete(id)
            setProjects(projects.filter(p => p.id !== id))
        } catch (err) {
            setError("Erreur lors de la suppression du projet")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const statusStyle = (status) => {
        if (status === 'published') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        if (status === 'draft') return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }

    return (
        <>
            <SEO title="Projets | Admin" />
            <div className="p-8">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-indigo-400 text-xs font-medium tracking-widest uppercase mb-1">Administration</p>
                        <h1 className="text-3xl font-bold text-white">Projets</h1>
                    </div>
                    <button
                        onClick={() => navigate('/admin/projects/new')}
                        className="
                            px-4 py-2.5 rounded-lg text-sm font-medium
                            bg-indigo-600 text-white
                            hover:bg-indigo-500
                            shadow-lg shadow-indigo-600/20
                            transition flex items-center gap-2
                        "
                    >
                        + Nouveau projet
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
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Titre</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Type</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Statut</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Date</th>
                                <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/60">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-gray-500 text-sm">Chargement…</td>
                                </tr>
                            ) : projects.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-gray-500 text-sm">Aucun projet</td>
                                </tr>
                            ) : (
                                projects.map(project => (
                                    <tr key={project.id} className="hover:bg-gray-800/30 transition">
                                        <td className="px-6 py-4 text-white text-sm font-medium">{project.title}</td>
                                        <td className="px-6 py-4 text-gray-400 text-sm capitalize">{project.type}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyle(project.status)}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">{project.realisation_date ?? '—'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => navigate(`/projects/${project.id}`)}
                                                    className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700 transition"
                                                >
                                                    Voir
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin/projects/${project.id}`)}
                                                    className="px-3 py-1.5 rounded-lg text-xs text-indigo-400 hover:text-white hover:bg-indigo-600/20 border border-indigo-500/30 transition"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
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

export default ProjectList