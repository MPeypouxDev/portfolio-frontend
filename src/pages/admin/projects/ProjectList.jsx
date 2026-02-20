import { useState, useEffect } from "react"
import projectService from "../../services/projectService"
import { useNavigate } from "react-router-dom"
import SEO from "../../components/SEO"

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
                setProjects(response.data)
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

    return (
        <>
        <SEO title="Projets | Admin" />
            <div>
                <button onClick={() => navigate('/admin/projects/new')}>Nouveau projet</button>
                <table>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id}>
                                <td>{project.title}</td>
                                <td>{project.type}</td>
                                <td>{project.status}</td>
                                <td>{project.date}</td>
                                <td>
                                    <button onClick={() => navigate(`/projects/${project.id}`)}>Voir</button>
                                    <button onClick={() => navigate(`/admin/projects/${project.id}`)}>Modifier</button>
                                    <button onClick={() => handleDelete(project.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProjectList