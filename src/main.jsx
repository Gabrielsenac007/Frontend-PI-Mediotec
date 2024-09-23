import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'; // Importando o App
import Login from './Components/Login/Login.jsx';
import Equipe from './Components/Equipe/Equipe.jsx';
import Cadastro from './Components/Cadastro/Cadastro.jsx';
import DataDisplay from './Components/Alunos/Alunos.jsx'
import EditUsuario from './Components/EditUser/EditUsuario.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Renderiza o App
    children: [
      {
        path: '/',
        element: <Login /> // Login como rota padrão
      },
      {
        path: 'equipe',
        element: <Equipe />
      },
      {
        path: 'cadastro',
        element:<Cadastro/>
      },
      {
        path: 'alunos',
        element:<DataDisplay/>
      }
      ,
      {
        path: 'edit',
        element:<EditUsuario/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
