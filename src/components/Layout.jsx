import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout