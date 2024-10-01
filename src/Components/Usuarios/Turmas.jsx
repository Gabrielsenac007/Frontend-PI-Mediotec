import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTurmas, deleteTurma } from '../../services/api'; // Ajustar as funções de API para turmas
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Alunos.css';

const TurmasDisplay = () => {
    const navigate = useNavigate(); // Hook para navegação

    const [data, setData] = useState([]); // Estado para armazenar as turmas
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Busca todas as turmas ao carregar o componente
    useEffect(() => {
        const getTurmas = async () => {
            try {
                const turmas = await fetchTurmas(); // Função que busca turmas da API
                setData(turmas);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getTurmas();
    }, []);

    // Função para redirecionar à tela de edição de uma turma específica
    const handleEdit = (id) => {
        navigate(`/edit/turma/${id}`);
    };

    // Função para deletar uma turma
    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar esta turma?")) {
            try {
                await deleteTurma(id); // Deleta a turma via API
                setData(data.filter(item => item.id !== id)); // Remove a turma da lista local
            } catch (err) {
                setError(err.message);
            }
        }
    };

    // Redireciona para a página de cadastro de turma
    const handleRedirect = () => {
        navigate('/cadastroTurma'); // Ajustar rota para cadastro de turma
    };

    // Condicionais de carregamento e erro
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="turmas-display">
            <h1>Turmas Cadastradas</h1>
            <ul className="turmas-list">
                {data.map(item => (
                    <li key={item.id} className="turma-item">
                        <div className="turma-info">
                            <h3>Nome da Turma: {item.nameClass}</h3>
                            <p>Ano Escolar: {item.schoolYear}</p>
                            <p>Turno: {item.shift}</p>
                            <p>Semestre: {item.semester}</p>
                        </div>
                        <div className="action-icons">
                            <FaEdit className="icon edit" onClick={() => handleEdit(item.id)} />
                            <FaTrash className="icon delete" onClick={() => handleDelete(item.id)} />
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleRedirect}>Cadastrar Nova Turma</button>
        </div>
    );
};

export default TurmasDisplay;
