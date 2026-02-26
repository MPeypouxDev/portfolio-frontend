import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import Background from './Background'
import { AnimatePresence, motion } from 'framer-motion'
import { Suspense }  from 'react'

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
                <Suspense fallback={
                  <div className="min-h-screen flex items-center justify-center">
                    <p className="text-gray-400">Chargement...</p>
                  </div>
                  }>
                  <Outlet />
                </Suspense>
              </main>
          </motion.div>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}

export default Layout