import { useState, useEffect } from "react"
import { contactService, projectService, technologyService } from "../../services"

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
                setProjects(projectsData.data)
                setTechnologies(techData.data)
                setContacts(contactsData.data)
            } catch (err) {
                setError("Erreur lors du chargement des données")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-gray-400 text-sm mb-2">Total projets</h3>
                    <p className="text-white text-3xl font-bold">{projects.length}</p>
                </div>
                <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-gray-400 text-sm mb-2">Projets publiés</h3>
                    <p className="text-white text-3xl font-bold">{projects.filter(p => p.status === 'published').length}</p>
                </div>
                <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-gray-400 text-sm mb-2">Projets brouillons</h3>
                    <p className="text-white text-3xl font-bold">{projects.filter(p => p.status === 'draft').length}</p>
                </div>
                <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-gray-400 text-sm mb-2">Nombre de technologies</h3>
                    <p className="text-white text-3xl font-bold">{technologies.length}</p>
                </div>
                <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-gray-400 text-sm mb-2">Messages non lus</h3>
                    <p className="text-white text-3xl font-bold">{contacts.filter(c => c.read_at === null).length}</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-white font-semibold text-lg mb-4">Derniers messages</h2>
                <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
                    {contacts.slice(0, 5).map(contact => (
                        <div key={contact.id} className="border-b border-gray-800 py-3">
                            <p className="text-white">{contact.first_name} {contact.last_name}</p>
                            <p className="text-gray-400 text-sm">{contact.email}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-white font-semibold text-lg mb-4">Derniers projets modifiés</h2>
                <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
                    {projects.slice(0, 5).map(project => (
                        <div key={project.id} className="border-b border-gray-800 py-3">
                            <p className="text-white">{project.id} {project.title}</p>
                            <p className="text-gray-400 text-sm">{project.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard