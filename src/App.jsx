import './App.css';
import Header from './Components/Header/Header';
import HeaderProfessor from './Components/Header/HeaderProfessor';
import { Outlet, useLocation } from 'react-router-dom';
import { useRole } from './Components/Contexts/RoleContext';

function App() {
  const location = useLocation();

  //pegando a role passada pelo login no setRole
  const { role } = useRole();

  const isLoginRoute = location.pathname === '/';

  return (
    <div className="App">
      {!isLoginRoute && (
        <>
          {role === 'PROFESSOR' && <HeaderProfessor />}
          {(role === 'COORDENADOR' || role === 'ADMIN') && <Header />}
        </>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;