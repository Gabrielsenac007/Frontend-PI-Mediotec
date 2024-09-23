import './App.css';
import Header from './Components/Header/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet /> {/* Aqui renderiza o conteúdo da rota correspondente */}
      </main>
    </div>
  );
}

export default App;
