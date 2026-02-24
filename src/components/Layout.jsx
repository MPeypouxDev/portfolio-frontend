import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import Background from './Background'
import { AnimatePresence, motion } from 'framer-motion'

function Layout() {
  const location = useLocation()

  return (
    <>
      <Background />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <ScrollToTop />
        <AnimatePresence>
          <motion.div key={location.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <main className="flex-grow pt-16">
                <Outlet />
              </main>
          </motion.div>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}

export default Layout