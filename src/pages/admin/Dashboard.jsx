import { useState, useEffect } from "react"
import { technologyService } from "../../services/technologyService"
import { contactService } from "../../services/contactService"
import { projectService } from "../../services/projectService"
import SEO from "../../components/SEO"

function Dashboard() {
    const [projects, setProjects] = useState([])
    const [technologies, setTechnologies] = useState([])
    const [contacts, setContacts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [projectsData, techData, contactsData] = await Promise.all([
                    projectService.getAll(),
                    technologyService.getAll(),
                    contactService.getAll(),
                ])
                setProjects(projectsData.data.data ?? projectsData.data)
                setTechnologies(techData.data.data ?? techData.data)
                setContacts(contactsData.data.data ?? contactsData.data)
            } catch (err) {
                setError("Erreur lors du chargement des données")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const statCards = [
        {
            label: "Total projets",
            value: projects.length,
            accent: "from-indigo-500/20 to-indigo-500/5",
            border: "border-indigo-500/30",
            dot: "bg-indigo-400",
        },
        {
            label: "Publiés",
            value: projects.filter(p => p.status === 'published').length,
            accent: "from-emerald-500/20 to-emerald-500/5",
            border: "border-emerald-500/30",
            dot: "bg-emerald-400",
        },
        {
            label: "Brouillons",
            value: projects.filter(p => p.status === 'draft').length,
            accent: "from-amber-500/20 to-amber-500/5",
            border: "border-amber-500/30",
            dot: "bg-amber-400",
        },
        {
            label: "Technologies",
            value: technologies.length,
            accent: "from-violet-500/20 to-violet-500/5",
            border: "border-violet-500/30",
            dot: "bg-violet-400",
        },
        {
            label: "Messages non lus",
            value: contacts.filter(c => c.read_at === null).length,
            accent: "from-rose-500/20 to-rose-500/5",
            border: "border-rose-500/30",
            dot: "bg-rose-400",
        },
    ]

    return (
        <>
            <SEO title="Dashboard | Admin" />
            <div className="p-8 min-h-screen">

                <div className="mb-10">
                    <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-1">Administration</p>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
                    {statCards.map((card) => (
                        <div
                            key={card.label}
                            className={`
                                relative rounded-xl p-5
                                bg-gradient-to-b ${card.accent}
                                border ${card.border}
                                shadow-lg shadow-black/20
                                overflow-hidden
                            `}
                        >
                            <div className={`w-2 h-2 rounded-full ${card.dot} mb-4`} />
                            <p className="text-4xl font-bold text-white mb-1">{card.value}</p>
                            <p className="text-gray-400 text-xs font-medium tracking-wide uppercase">{card.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="rounded-xl bg-gray-900/60 border border-gray-800 shadow-lg shadow-black/20 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                            <h2 className="text-white font-semibold text-sm tracking-wide uppercase">Derniers messages</h2>
                            <span className="text-gray-600 text-xs">{contacts.length} total</span>
                        </div>
                        <div className="divide-y divide-gray-800/60">
                            {contacts.length === 0 ? (
                                <p className="text-gray-500 text-sm px-6 py-8 text-center">Aucun message</p>
                            ) : (
                                contacts.slice(0, 5).map(contact => (
                                    <div key={contact.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-800/30 transition">
                                        <div>
                                            <p className="text-white text-sm font-medium">
                                                {contact.first_name} {contact.last_name}
                                            </p>
                                            <p className="text-gray-500 text-xs mt-0.5">{contact.email}</p>
                                        </div>
                                        {!contact.read_at && (
                                            <span className="text-xs bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                                                Non lu
                                            </span>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl bg-gray-900/60 border border-gray-800 shadow-lg shadow-black/20 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                            <h2 className="text-white font-semibold text-sm tracking-wide uppercase">Derniers projets</h2>
                            <span className="text-gray-600 text-xs">{projects.length} total</span>
                        </div>
                        <div className="divide-y divide-gray-800/60">
                            {projects.length === 0 ? (
                                <p className="text-gray-500 text-sm px-6 py-8 text-center">Aucun projet</p>
                            ) : (
                                projects.slice(0, 5).map(project => (
                                    <div key={project.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-800/30 transition">
                                        <div>
                                            <p className="text-white text-sm font-medium">{project.title}</p>
                                            <p className="text-gray-500 text-xs mt-0.5 capitalize">{project.type}</p>
                                        </div>
                                        <span className={`
                                            text-xs px-2 py-0.5 rounded-full border
                                            ${project.status === 'published'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                : project.status === 'draft'
                                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                : 'bg-gray-500/10 text-gray-400 border-gray-500/30'
                                            }
                                        `}>
                                            {project.status}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard