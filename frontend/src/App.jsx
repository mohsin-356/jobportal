import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/companies';
import CompanyCreate from './components/admin/CompanyCreate';
const appRouter = createBrowserRouter([
  //for student side
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path:"/description/:id",
    element:<JobDescription />
  },
  //for recruiter side
  {
    path:"/admin/companies",
    element:<Companies/>
  },
  {
    path:"/admin/companies/create",
    element:<CompanyCreate/>
  }
]);
function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
