import { useState } from 'react'
import { contactService } from '../services/contactService'
import useInView from '../hooks/useInView'
import SEO from '../components/SEO'

function Contact() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    messages: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [ref, _, animationClass] = useInView()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)
      await contactService.send(formData)
      setSuccess(true)
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        messages: '',
      })
    } catch (err) {
      setError("Erreur lors de l'envoi du message")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <SEO title="Me Contacter | Mathys Peypoux" />
      <div ref={ref} className={`min-h-screen py-20 transition-all duration-700 ${animationClass}`}>
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-12">
            Me contacter
          </h1>

          {success && (
            <div className="
              mb-6 rounded-lg px-4 py-3
              bg-emerald-500/10 border border-emerald-500/30
              text-emerald-400
            ">
              Message envoyé avec succès. Je vous répondrai rapidement.
            </div>
          )}

          {error && (
            <div className="
              mb-6 rounded-lg px-4 py-3
              bg-red-500/10 border border-red-500/30
              text-red-400
            ">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="
              rounded-xl p-8
              bg-gradient-to-b from-gray-900/80 to-gray-950
              border border-gray-800
              shadow-lg shadow-black/40
            "
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="
                    w-full rounded-lg px-4 py-2.5
                    bg-gray-900 text-gray-200
                    border border-gray-800
                    placeholder-gray-600
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                    focus:border-indigo-500
                    transition
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="
                    w-full rounded-lg px-4 py-2.5
                    bg-gray-900 text-gray-200
                    border border-gray-800
                    placeholder-gray-600
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                    focus:border-indigo-500
                    transition
                  "
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full rounded-lg px-4 py-2.5
                  bg-gray-900 text-gray-200
                  border border-gray-800
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                  focus:border-indigo-500
                  transition
                "
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="
                  w-full rounded-lg px-4 py-2.5
                  bg-gray-900 text-gray-200
                  border border-gray-800
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                  focus:border-indigo-500
                  transition
                "
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Message *
              </label>
              <textarea
                name="messages"
                value={formData.messages}
                onChange={handleChange}
                required
                rows="6"
                className="
                  w-full rounded-lg px-4 py-3
                  bg-gray-900 text-gray-200
                  border border-gray-800
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                  focus:border-indigo-500
                  transition
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-lg font-medium
                bg-indigo-600 text-white
                hover:bg-indigo-500
                shadow-lg shadow-indigo-600/20
                transition
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Envoi en cours…
                </>
              ) : (
                'Envoyer le message'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact
