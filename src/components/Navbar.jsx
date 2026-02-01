import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Mathys Peypoux
          </Link>

          <div className="flex gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Accueil
            </Link>
            <Link
              to="/projects"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Projets
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 transition"
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