import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import Background from './Background'

function Layout() {
  return (
    <>
      <Background />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <ScrollToTop />
        <main className="flex-grow pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout