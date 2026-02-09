import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

function Layout() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout