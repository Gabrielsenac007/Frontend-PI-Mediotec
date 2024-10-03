import './App.css';
import Header from './Components/Header/Header';
import HeaderProfessor from './Components/Header/HeaderProfessor';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  // Condições para não exibir cabeçalhos em determinadas rotas ou escolher qual cabeçalho exibir
  const isLoginRoute = location.pathname === '/';
  const isProfessorLogin = location.pathname === '/login/professor';
  const isCoordenadorLogin = location.pathname === '/login/coordenador';

  return (
    <div className="App">
      {/* Renderizar cabeçalhos baseados na rota */}
      {!isLoginRoute && ( // Não exibir cabeçalho na tela de login
        <>
          {isProfessorLogin && <HeaderProfessor />}
          {isCoordenadorLogin && <Header />}
          {!isProfessorLogin && !isCoordenadorLogin && <Header />}
        </>
      )}
      <main>
        <Outlet /> {/* Renderiza os componentes correspondentes às rotas */}
      </main>
    </div>
  );
}

export default App;