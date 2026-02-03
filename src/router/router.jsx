import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import EmptyLayout from '../components/EmptyLayout'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import ProjectDetail from '../pages/ProjectDetail'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'projects/:id',
        element: <ProjectDetail />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
  {
    element: <EmptyLayout />,
    children: [
      { path: "*", element: <NotFound /> },
    ],
  },
])