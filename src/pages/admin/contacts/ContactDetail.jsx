import { useState, useEffect, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { contactService } from '../../../services/contactService'
import ErrorMessage from '../../../components/ErrorMessage'
import SEO from "../../../components/SEO"

function ContactDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [contact, setContact] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const loadContact = useCallback(async () => {
        try {
            setLoading(true)
            const response = await contactService.getById(id)
            setContact(response.data.data ?? response.data)
            contactService.markAsRead(id)
            setError(null)
        } catch (err) {
            setError("Message non trouvé")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        loadContact()
    }, [loadContact])

    const handleRetry = () => {
        setError(null)
        loadContact()
    }

    const handleDelete = async () => {
        try {
            setLoading(true)
            await contactService.delete(id)
            navigate('/admin/contacts')
        } catch (err) {
            setError("Erreur lors de la suppression du message")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-400 text-sm">Chargement du message…</p>
            </div>
        )
    }

    if (error || !contact) {
        return (
            <div className="flex items-center justify-center h-64">
                <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
        )
    }

    return (
        <>
            <SEO title="Message | Admin" />
            <div className="p-8 max-w-3xl">

                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/admin/contacts')}
                        className="text-gray-500 hover:text-white transition text-sm"
                    >
                        ← Retour
                    </button>
                    <div>
                        <p className="text-indigo-400 text-xs font-medium tracking-widest uppercase mb-1">Administration</p>
                        <h1 className="text-3xl font-bold text-white">Message</h1>
                    </div>
                </div>

                <div className="rounded-xl bg-gray-900/60 border border-gray-800 shadow-lg shadow-black/20 p-6 mb-6">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Expéditeur</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Prénom</p>
                            <p className="text-white text-sm font-medium">{contact.first_name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Nom</p>
                            <p className="text-white text-sm font-medium">{contact.last_name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Email</p>
                            <p className="text-indigo-400 text-sm">{contact.email}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-gray-900/60 border border-gray-800 shadow-lg shadow-black/20 p-6 mb-6">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Message</p>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                        {contact.messages}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin/contacts')}
                        className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700 transition"
                    >
                        ← Retour à la liste
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:text-white hover:bg-rose-500/20 border border-rose-500/30 transition disabled:opacity-50"
                    >
                        Supprimer le message
                    </button>
                </div>
            </div>
        </>
    )
}

export default ContactDetail