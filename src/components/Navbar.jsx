import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  
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

          <div className="flex gap-8">
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
    </nav>
  )
}

export default Navbar