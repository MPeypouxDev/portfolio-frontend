import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const navLinks = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/projects', label: 'Projets' },
    { to: '/admin/technologies', label: 'Technologies' },
    { to: '/admin/contacts', label: 'Messages' },
]

function AdminLayout() {
    const { logout } = useAuth()
    const location = useLocation()

    return (
        <div className="flex min-h-screen bg-black">

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

            <aside className="
                w-60 shrink-0 flex flex-col
                border-r border-gray-800/60
                bg-gray-950/60 backdrop-blur-sm
                sticky top-0 h-screen
            ">
                <div className="px-6 py-7 border-b border-gray-800/60">
                    <p className="text-xs text-indigo-400 font-medium tracking-widest uppercase mb-1">Portfolio</p>
                    <h2 className="text-white font-bold text-lg leading-tight">Admin</h2>
                </div>

                <nav className="flex-1 px-3 py-6 space-y-1">
                    {navLinks.map(link => {
                        const isActive = location.pathname === link.to
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                                    ${isActive
                                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="px-3 py-4 border-t border-gray-800/60">
                    <button
                        type="button"
                        onClick={logout}
                        className="
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                            text-gray-500 hover:text-rose-400 hover:bg-rose-500/10
                            border border-transparent hover:border-rose-500/20
                            transition
                        "
                    >
                        Se déconnecter
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout