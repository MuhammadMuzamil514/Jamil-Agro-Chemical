import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import { ADMIN_LOGIN_PATH, ADMIN_DASHBOARD_PATH } from '../utils/routes'

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Products = lazy(() => import('../pages/Products'))
const Pesticides = lazy(() => import('../pages/Pesticides'))
const Fertilizers = lazy(() => import('../pages/Fertilizers'))
const CropSolutions = lazy(() => import('../pages/CropSolutions'))
const Contact = lazy(() => import('../pages/Contact'))
const OrderNow = lazy(() => import('../pages/OrderNow'))
const TrackOrder = lazy(() => import('../pages/TrackOrder'))
const AdminLogin = lazy(() => import('../pages/AdminLogin'))
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'))
const NotFound = lazy(() => import('../pages/NotFound'))

function AppRouter({ fallback = null }) {
  const routes = [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'products', element: <Products /> },
        { path: 'pesticides', element: <Pesticides /> },
        { path: 'fertilizers', element: <Fertilizers /> },
        { path: 'crop-solutions', element: <CropSolutions /> },
        { path: 'order-now', element: <OrderNow /> },
        { path: 'track-order', element: <TrackOrder /> },
        { path: 'contact', element: <Contact /> },
      ],
    },
    {
      path: ADMIN_LOGIN_PATH,
      element: <AdminLogin />,
    },
    {
      path: ADMIN_DASHBOARD_PATH,
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <AdminDashboard /> },
      ],
    },
    {
      path: '/404',
      element: <NotFound />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]

  return useRoutes(routes) ?? fallback
}

export default AppRouter
