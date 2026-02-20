import { useState, useEffect, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { contactService } from '../../services/contactService'
import ErrorMessage from '../../components/ErrorMessage'
import SEO from "../../components/SEO"

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
            setContact(response.data)
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
            setError(null)
        } catch (err) {
            setError("Erreur lors de la suppression du message")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-gra-400">Chargement du message...</p>
            </div>
        )
    }

    if (error || !contact) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ErrorMessage message={error} onRetry={handleRetry}/>
            </div>
        )
    }

    return (
        <>
        <SEO title="Message | Admin" />
            <div className="min-h-screen py-20 transition-all duration-700">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div
                        className="
                        rounded-xl p-8 mb-8
                        bg-gradient-to-b from-gray-900/80 to-gray-950
                        border border-gray-800
                        shadow-lg shadow-black/40
                        "
                    >
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {contact.email}
                    </h1>

                        <div className="flex gap-2 flex-wrap mb-6">
                            <p>{contact.first_name} {contact.last_name}</p>
                            <p>{contact.email}</p>
                        </div>

                        <div
                            className="
                            rounded-xl p-8 mb-8
                            bg-gradient-to-b from-gray-900/80 to-gray-950
                            border border-gray-800
                            shadow-lg shadow-black/40
                            "
                        >
                            <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {contact.message}
                            </p>
                        </div>

                        <button onClick={() => navigate('/admin/contacts')}>Retour</button>
                        <button onClick={handleDelete}>Supprimer</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactDetail