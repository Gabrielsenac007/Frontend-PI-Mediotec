import { useState, useRef, useEffect } from 'react'; // Importa useState, useRef e useEffect
import { FaUser } from 'react-icons/fa'; // Importando o ícone do usuário
import { IoMenu } from "react-icons/io5"; // Importando o ícone do menu
import { Link } from 'react-router-dom'; // Importando o componente Link
import './Header.css'; // Certifique-se de importar o CSS

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar a visibilidade do menu
  const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
  const menuRef = useRef(null); // Cria uma referência para o contêiner do menu

  // Função para alternar a visibilidade do menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna o estado entre verdadeiro e falso
  };

  // Função para detectar cliques fora do menu
  const handleClickOutside = (event) => {
    // Verifica se o clique foi fora do menu usando a referência
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false); // Fecha o menu se o clique for fora
    }
  };

  // Adiciona o listener ao montar o componente e remove ao desmontar
  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside); // Adiciona o listener
    } else {
      document.removeEventListener('mousedown', handleClickOutside); // Remove o listener
    }

    // Remove o listener ao desmontar o componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // useEffect para recuperar o nome do usuário do localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('authData'));
    if (userData) {
      setUserName(userData.name); // Armazena o nome do usuário no estado
    }
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <FaUser className="login-icon" />
        <h1>{userName || 'Nome do Usuário'}</h1> {/* Exibe o nome do usuário */}
      </div>
      <nav>
        <IoMenu className='mobile-menu' onClick={toggleMenu} />

        {/* Adiciona a classe 'active' quando o menu está aberto */}
        <ul ref={menuRef} className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/homeProf">Turmas</Link></li>
          <li><Link to="/professor">Equipe</Link></li>
          <li><Link to="/alunos">Alunos</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
