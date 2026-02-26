import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { contactService } from "../../../services/contactService"
import SEO from "../../../components/SEO"

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
                setContacts(response.data.data ?? response.data)
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

    const unreadCount = contacts.filter(c => !c.read_at).length

    return (
        <>
            <SEO title="Messages | Admin" />
            <div className="p-8">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-indigo-400 text-xs font-medium tracking-widest uppercase mb-1">Administration</p>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            Messages
                            {unreadCount > 0 && (
                                <span className="text-sm font-medium px-2.5 py-1 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                                    {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
                                </span>
                            )}
                        </h1>
                    </div>
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
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Prénom</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Nom</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Email</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Message</th>
                                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/60">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-gray-500 text-sm">Chargement…</td>
                                </tr>
                            ) : contacts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-gray-500 text-sm">Aucun message</td>
                                </tr>
                            ) : (
                                contacts.map(contact => (
                                    <tr key={contact.id} className={`hover:bg-gray-800/30 transition ${!contact.read_at ? 'bg-indigo-500/5' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white text-sm font-medium">{contact.first_name}</span>
                                                {!contact.read_at && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 whitespace-nowrap shrink-0">
                                                        Non lu
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300 text-sm">{contact.last_name}</td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">{contact.email}</td>
                                        <td className="px-6 py-4 text-gray-400 text-sm max-w-xs">
                                            <p className="truncate">{contact.messages}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => navigate(`/admin/contacts/${contact.id}`)}
                                                    className="px-3 py-1.5 rounded-lg text-xs text-indigo-400 hover:text-white hover:bg-indigo-600/20 border border-indigo-500/30 transition"
                                                >
                                                    Voir
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(contact.id)}
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

export default ContactList