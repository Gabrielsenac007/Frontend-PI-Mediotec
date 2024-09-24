import { FaUser } from 'react-icons/fa'; // Importando o ícone do usuário
import { Link } from 'react-router-dom'; // Importando o componente Link
import './Header.css'; // Certifique-se de importar o CSS

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <FaUser className="login-icon" />
                <h1>Nome do Usuário</h1>
            </div>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/turmas">Turmas</Link></li>
                    <li><Link to="/equipe">Equipes</Link></li>
                    <li><Link to="/alunos">Alunos</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;