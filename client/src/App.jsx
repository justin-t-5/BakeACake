import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCakes from './pages/ViewCakes'
import EditCake from './pages/EditCake'
import CreateCake from './pages/CreateCake'
import CakeDetails from './pages/CakeDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateCake title='BakeACake | Customize' />
    },
    {
      path:'/customcars',
      element: <ViewCakes title='BakeACake | Custom Cakes' />
    },
    {
      path: '/customcars/:id',
      element: <CakeDetails title='BakeACake | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCake title='BakeACake | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App