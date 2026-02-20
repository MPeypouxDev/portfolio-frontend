import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import EmptyLayout from '../components/EmptyLayout'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import ProjectDetail from '../pages/ProjectDetail'
import Contact from '../pages/Contact'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import AdminLayout from '../components/admin/AdminLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import Dashboard from '../pages/admin/Dashboard'
import Login from '../pages/admin/Login'
import ContactDetail from '../pages/admin/contacts/ContactDetail'
import ContactList from '../pages/admin/contacts/ContactList'
import ProjectCreate from '../pages/admin/projects/ProjectCreate'
import ProjectEdit from '../pages/admin/projects/ProjectEdit'
import ProjectList from '../pages/admin/projects/ProjectList'
import TechnologyForm from '../pages/admin/technologies/TechnologyForm'
import TechnologyList from '../pages/admin/technologies/TechnologyList'


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
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <Login />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin', element: <Dashboard /> },
          { path: '/admin/projects', element: <ProjectList /> },
          { path: '/admin/projects/new', element: <ProjectCreate /> },
          { path: '/admin/projects/:id', element: <ProjectEdit /> },
          { path: '/admin/technologies/:id', element: <TechnologyForm /> },
          { path: '/admin/technologies', element: <TechnologyList /> },
          { path: '/admin/contacts', element: <ContactList /> },
          { path: '/admin/contacts/:id', element: <ContactDetail /> },
        ]
      }
    ]
  },
  {
    element: <EmptyLayout />,
    children: [
      { path: "*", element: <NotFound /> },
    ],
  },
])