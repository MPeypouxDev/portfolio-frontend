import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
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
              className="text-white hover:text-gray-400 transition font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/projects"
              className="text-white hover:text-gray-400 transition font-medium"
            >
              Projets
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-400 transition font-medium"
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
              className="block px-4 py-3 text-white hover:bg-gray-900 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/projects"
              className="block px-4 py-3 text-white hover:bg-gray-900 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Projets
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3 text-white hover:bg-gray-900 transition"
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