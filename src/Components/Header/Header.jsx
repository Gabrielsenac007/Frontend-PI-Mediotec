import { useState } from 'react'; // Importa o useState para controle de estado
import { FaUser } from 'react-icons/fa'; // Importando o ícone do usuário
import { IoMenu } from "react-icons/io5"; // Importando o ícone do menu
import { Link } from 'react-router-dom'; // Importando o componente Link
import './Header.css'; // Certifique-se de importar o CSS

const Header = () => {
    // Estado para controlar a visibilidade do menu mobile
    const [menuOpen, setMenuOpen] = useState(false);

    // Função para alternar a visibilidade do menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Alterna o estado entre verdadeiro e falso
    };

    return (
        <header className="header">
            <div className="logo">
                <FaUser className="login-icon" />
                <h1>Nome do Usuário</h1>
            </div>
            <nav>
                
                <IoMenu className='mobile-menu' onClick={toggleMenu} />
                
                {/* Adiciona a classe 'active' quando o menu está aberto */}
                <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/homeProf">Turmas</Link></li>
                    <li><Link to="/equipe">Equipes</Link></li>
                    <li><Link to="/alunos">Alunos</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
