import { FaRegFileAlt, FaRegClipboard, FaPaperPlane, FaUsers } from 'react-icons/fa'; // Importando os novos ícones
import { Link } from 'react-router-dom';
import './Home.css'; // Importando o CSS

const Home = () => {
    return (
        <div className="home-container">
            <h1>Bem-vindo ao Sistema de Gestão</h1>
            <div className="card-container">
                <Link to="/cadastro" className="card">
                    <FaRegFileAlt size={48} /> {/* Ícone de Gerenciar Notas */}
                    <h2>Gerenciar Notas</h2>
                </Link>
                <Link to="/cadastroProfessor" className="card">
                    <FaRegClipboard size={48} /> {/* Ícone de Gerenciar Presenças */}
                    <h2>Gerenciar Presenças</h2>
                </Link>
                <Link to="/send-notice" className="card">
                    <FaPaperPlane size={48} /> {/* Ícone de Enviar Comunicado */}
                    <h2>Enviar Comunicado</h2>
                </Link>
                <Link to="/alunos" className="card"> {/* Novo link para ver alunos cadastrados */}
                    <FaUsers size={48} /> {/* Ícone de Ver Alunos Cadastrados */}
                    <h2>Ver Alunos Cadastrados</h2>
                </Link>
            </div>
        </div>
    );
};

export default Home;
