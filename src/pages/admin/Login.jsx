import { useState, useEffect } from "react"
import { authService } from '../../services/authService'
import SEO from "../../components/SEO"
import { useNavigate } from "react-router-dom"
import useInView from '../../hooks/useInView'
import { useAuth } from '../../hooks/useAuth'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [ref, _, animationClass] = useInView()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin')
    }
  }, [isAuthenticated])

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
      const response = await authService.login(formData)
      authService.saveToken(response.data.access_token)
      navigate('/admin')
      setSuccess(true)
      setFormData({ email: '', password: '' })
    } catch (err) {
      setError("Identifiants incorrects. Veuillez réessayer.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Me Connecter | Mathys Peypoux" />

      <div className="fixed inset-0 -z-10 bg-black pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(900px 500px at 20% 10%, rgba(99,102,241,0.28), transparent 55%),' +
              'radial-gradient(700px 500px at 80% 40%, rgba(59,130,246,0.18), transparent 60%),' +
              'radial-gradient(900px 700px at 50% 90%, rgba(168,85,247,0.18), transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),' +
              'linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div
        ref={ref}
        className={`min-h-screen flex items-center justify-center px-4 transition-all duration-700 ${animationClass}`}
      >
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <p className="text-indigo-400 text-xs font-medium tracking-widest uppercase mb-3">Portfolio</p>
            <h1 className="text-3xl font-bold text-white mb-2">Administration</h1>
            <p className="text-gray-500 text-sm">Connectez-vous pour accéder au dashboard</p>
          </div>

          {success && (
            <div className="mb-6 rounded-lg px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
              Connexion réussie.
            </div>
          )}
          {error && (
            <div className="mb-6 rounded-lg px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="
              rounded-2xl p-8
              bg-gradient-to-b from-gray-900/80 to-gray-950/80
              border border-gray-800
              shadow-2xl shadow-black/60
              backdrop-blur-sm
            "
          >
            <div className="space-y-5 mb-8">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 tracking-wide uppercase">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@portfolio.com"
                  className="
                    w-full rounded-lg px-4 py-3
                    bg-gray-900/80 text-gray-200
                    border border-gray-800
                    placeholder-gray-700
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                    focus:border-indigo-500
                    transition text-sm
                  "
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 tracking-wide uppercase">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="
                    w-full rounded-lg px-4 py-3
                    bg-gray-900/80 text-gray-200
                    border border-gray-800
                    placeholder-gray-700
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                    focus:border-indigo-500
                    transition text-sm
                  "
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-lg font-medium text-sm
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
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Connexion en cours…
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login