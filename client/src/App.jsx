import React from 'react';
import { useRoutes } from 'react-router-dom';
import Navigation from './components/Navigation';
import ViewCakes from './pages/ViewCakes';
import EditCake from './pages/EditCake';
import CreateCake from './pages/CreateCake';
import CakeDetails from './pages/CakeDetails';
import './App.css';

const App = () => {
  const element = useRoutes([
    { path: '/', element: <CreateCake /> },
    { path: '/cakes', element: <ViewCakes /> },
    { path: '/cakes/new', element: <CreateCake /> },
    { path: '/cakes/:id', element: <CakeDetails /> },
    { path: '/cakes/:id/edit', element: <EditCake /> }
  ]);

  return (
    <div className="app">
      <Navigation />
      {element}
    </div>
  );
};

export default App;