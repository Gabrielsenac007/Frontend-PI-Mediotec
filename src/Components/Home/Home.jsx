import { FaUserGraduate, FaChalkboardTeacher, FaUserTie, FaBullhorn, FaListAlt } from 'react-icons/fa'; // Importando o novo ícone
import { Link } from 'react-router-dom';
import './Home.css'; // Importando o CSS

const Home = () => {
    return (
        <div className="home-container">
            <h1>Bem-vindo ao Sistema de Gestão</h1>
            <div className="card-container">
                <Link to="/cadastro" className="card">
                    <FaUserGraduate size={48} />
                    <h2>Adicionar Aluno</h2>
                </Link>
                <Link to="/add-teacher" className="card">
                    <FaChalkboardTeacher size={48} />
                    <h2>Adicionar Professor</h2>
                </Link>
                <Link to="/add-coordinator" className="card">
                    <FaUserTie size={48} />
                    <h2>Adicionar Coordenador</h2>
                </Link>
                <Link to="/send-notice" className="card">
                    <FaBullhorn size={48} />
                    <h2>Enviar Comunicado</h2>
                </Link>
                <Link to="/alunos" className="card"> {/* Novo link para ver alunos cadastrados */}
                    <FaListAlt size={48} />
                    <h2>Ver Usuários Cadastrados</h2>
                </Link>
            </div>
        </div>
    );
};

export default Home;
