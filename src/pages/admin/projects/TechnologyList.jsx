import { useState, useEffect } from "react"
import technologyService from "../../services/"
import { useNavigate } from "react-router-dom"

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
                setTechnologies(response.data)
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
        <div>
            <button onClick={() => navigate('/admin/technologies/new')}>Nouvelle technologie</button>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Type</th>
                        <th>Couleur</th>
                        <th>Icône</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {technologies.map(technology => (
                        <tr key={technology.id}>
                            <td>{technology.name}</td>
                            <td>{technology.type}</td>
                            <td>{technology.color}</td>
                            <td>{technology.icon}</td>
                            <td>
                                <button onClick={() => navigate(`/admin/technologies/${technology.id}`)}>Modifier</button>
                                <button onClick={() => handleDelete(technology.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TechnologyList