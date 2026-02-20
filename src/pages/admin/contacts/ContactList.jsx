import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import contactService from "../../services/contactService"

function ContactList() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const contactData = async () => {
            try {
                setLoading(true)
                const response = await contactService.getAll()
                setContacts(response.data)
            } catch (err) {
                setError("Erreur lors du chargement des messages")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        contactData()
    }, [])

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            await contactService.delete(id)
            setContacts(contacts.filter(c => c.id !== id))
        } catch (err) {
            setError("Erreur lors de la suppression du message")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <td>
                                {contact.first_name}
                                {!contact.read_at && (
                                    <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">Non lu</span>
                                )}
                            </td>
                            <td>{contact.last_name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.message}</td>
                            <td>
                                <button onClick={() => navigate(`/admin/contacts/${contact.id}`)}>Voir le message</button>
                                <button onClick={() => handleDelete(contact.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ContactList