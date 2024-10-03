import { Link } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie, FaBullhorn, FaListAlt, FaSchool, FaUsers, FaBookOpen, FaClipboardList, FaClipboardCheck } from 'react-icons/fa';
import './Home.css'; // Certifique-se de incluir o CSS criado acima

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
                <Link to="/alunos" className="card">
                    <FaListAlt size={48} />
                    <h2>Alunos Cadastrados</h2>
                </Link>
                <Link to="/cadastroTurma" className="card">
                    <FaSchool size={48} />
                    <h2>Cadastrar Novas Turmas</h2>
                </Link>
                <Link to="/professores" className="card">
                    <FaUsers size={48} /> {/* Ícone alterado */}
                    <h2>Professores Cadastrados</h2>
                </Link>
                <Link to="/coordenadores" className="card"> {/* Atualizei o link e o ícone */}
                    <FaBookOpen size={48} /> {/* Ícone alterado */}
                    <h2>Coordenadores Cadastrados</h2>
                </Link>
                <Link to="/turmas" className="card"> {/* Atualizei o link e o ícone */}
                    <FaClipboardList size={48} /> {/* Ícone alterado */}
                    <h2>Turmas Cadastradas</h2>
                </Link>
                <Link to="/materias" className="card"> {/* Atualizei o link e o ícone */}
                    <FaClipboardCheck size={48} /> {/* Ícone alterado */}
                    <h2>Matérias Cadastradas</h2>
                </Link>
            </div>
        </div>
    );
};

export default Home;
