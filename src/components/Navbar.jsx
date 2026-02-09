import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black shadow-lg' 
        : 'bg-black/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-xl font-bold text-white hover:text-gray-300 transition"
          >
            Mathys Peypoux
          </Link>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden md:flex gap-8">
            <Link
              to="/"
              className={`transition font-medium ${
                location.pathname === '/' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/projects"
              className={`transition font-medium ${
                location.pathname.startsWith('/projects') 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Projets
            </Link>
            <Link
              to="/contact"
              className={`transition font-medium ${
                location.pathname === '/contact' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      {isMenuOpen && (
      <div className="md:hidden bg-black border-t border-gray-900">
        <div className="flex flex-col py-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-3 transition ${
                location.pathname === '/' 
                  ? 'text-white bg-gray-900' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/projects"
              className={`block px-4 py-3 transition ${
                location.pathname.startsWith('/projects') 
                  ? 'text-white bg-gray-900' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Projets
            </Link>
            <Link
              to="/contact"
              className={`block px-4 py-3 transition ${
                location.pathname === '/contact' 
                  ? 'text-white bg-gray-900' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
      </div>
    )}
    </nav>
  )
}

export default Navbar