import { FaUserGraduate, FaChalkboardTeacher, FaUserTie, FaBullhorn, FaListAlt, FaSchool } from 'react-icons/fa'; // Importando o novo ícone
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
                <Link to="/cadastroProfessor" className="card">
                    <FaChalkboardTeacher size={48} />
                    <h2>Adicionar Professor</h2>
                </Link>
                <Link to="/cadastroCoordenador" className="card">
                    <FaUserTie size={48} />
                    <h2>Adicionar Coordenador</h2>
                </Link>
                <Link to="/cadastroDisciplina" className="card">
                    <FaBullhorn size={48} />
                    <h2>Cadastrar Disciplina</h2>
                </Link>
                <Link to="/alunos" className="card"> {/* Novo link para ver alunos cadastrados */}
                    <FaListAlt size={48} />
                    <h2>Ver Alunos Cadastrados</h2>
                </Link>
                <Link to="/cadastroTurma" className="card"> {/* Novo link para ver alunos cadastrados */}
                    <FaSchool size={48} />
                    <h2>Cadastrar Novas Turmas</h2>
                </Link>
                <Link to="/" className="card"> {/* Novo link para ver alunos cadastrados */}
                    <FaSchool size={48} />
                    <h2>Ver Professores Cadastrados</h2>
                </Link>
            </div>
        </div>
    );
};

export default Home;
