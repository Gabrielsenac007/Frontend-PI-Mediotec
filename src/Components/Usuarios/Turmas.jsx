import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTurmas, deleteTurma } from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Alunos.css';

const TurmasDisplay = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Busca todas as turmas ao carregar o componente
    useEffect(() => {
        const getTurmas = async () => {
            try {
                const turmas = await fetchTurmas();
                setData(turmas);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getTurmas();
    }, []);

    const handleEdit = (id) => {
        navigate(`/editTurma/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar esta turma?")) {
            try {
                await deleteTurma(id);
                setData(data.filter(item => item.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleRedirect = () => {
        navigate('/cadastroTurma');
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="data-display">
            <h1>Turmas Cadastradas</h1>
            <ul className="data-list">
                {data.map(item => (
                    <li key={item.id} className="data-item">
                        <div className="data-info">
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
