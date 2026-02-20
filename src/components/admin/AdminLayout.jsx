import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

function AdminLayout() {
    const { logout } = useAuth()
    return (
        <div className="flex min-h-screen">
            <aside>
                <div>
                    <h3 className="text-white font-semibold text-lg mb-4">
                        Navigation Admin
                    </h3>
                    <ul className="space-z-2">
                        <li>
                            <Link
                            to="/admin/dashboard"
                            className="text-gray-400 hover:text-indigo-300 transition text-sm"
                            >
                                Stats
                            </Link>
                        </li>
                        <li>
                            <Link
                            to="/admin/projects"
                            className="text-gray-400 hover:text-indigo-300 transition text-sm"
                            >
                                Projets
                            </Link>
                        </li>
                        <li>
                            <Link
                            to="/admin/technologies"
                            className="text-gray-400 hover:text-indigo-300 transition text-sm"
                            >
                                Technologies
                            </Link>
                        </li>
                        <li>
                            <Link
                            to="/admin/messages"
                            className="text-gray-400 hover:text-indigo-300 transition text-sm"
                            >
                                Messages
                            </Link>
                        </li>
                        <li>
                            <button
                            type="button"
                            onClick={logout}
                            className="text-lg text-gray-400 hover:text-white transition border border-gray-800 rounded-lg px-3 py-2 hover:bg-gray-900/40">
                                Se déconnecter
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="flex flex-col flex-1">
                <header>
                    <button
                    type="button"
                    onClick={logout}
                    className="text-lg text-gray-400 hover:text-white transition border border-gray-800 rounded-lg px-3 py-2 hover:bg-gray-900/40">
                        Se déconnecter
                    </button>
                </header>
                <main><Outlet /></main>
            </div>
        </div>
    )
}

export default AdminLayout