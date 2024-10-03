import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'; // Importando o App
import Login from './Components/Login/Login.jsx';
import Equipe from './Components/Equipe/Equipe.jsx';
import Cadastro from './Components/Cadastro/Cadastro.jsx';
import CadastroProfessor from './Components/Cadastro/CadastroProfessor.jsx';
import DataDisplay from './Components/Usuarios/Alunos.jsx'
import EditUsuario from './Components/EditUser/EditUsuario.jsx';
import Home from './Components/Home/Home.jsx'
import HomeProf from './Components/Home/HomeProf.jsx'
import Comunicados from './Components/Comunicados/Comunicados.jsx';
import CadastroCoordenador from './Components/Cadastro/CadastroCoordenador.jsx';
import CadastroDisciplina from './Components/Cadastro/CadastroMateria.jsx';
import CadastroTurma from './Components/Cadastro/CadastroTurma.jsx';
import TurmasDisplay from './Components/Usuarios/Turmas.jsx';
import ProfessorDisplay from './Components/Usuarios/Professores.jsx';
import CoordenadoresDisplay from './Components/Usuarios/Coordenadores.jsx';


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
      },
      {
        path: 'edit',
        element:<EditUsuario/>
      },
      {
        path: 'home',
        element:<Home/>
      },
      {
        path: 'cadastroProfessor',
        element:<CadastroProfessor/>
      },
      {
        path: 'homeProf',
        element:<HomeProf/>
      },
      {
        path: 'comunicados',
        element:<Comunicados/>
      },
      {
        path: 'cadastroCoordenador',
        element:<CadastroCoordenador/>
      },
      {
        path: 'cadastroDisciplina',
        element:<CadastroDisciplina/>
      },
      {
        path: 'cadastroTurma',
        element:<CadastroTurma/>
      },
      {
        path: 'turmas',
        element:<TurmasDisplay/>
      },
      {
        path: 'professores',
        element:<ProfessorDisplay/>
      },
      {
        path: 'coordenadores',
        element:<CoordenadoresDisplay/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
