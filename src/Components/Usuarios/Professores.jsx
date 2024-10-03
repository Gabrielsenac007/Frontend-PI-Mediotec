import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProfessores, deleteProfessor } from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Alumo.css'; // Certifique-se de que o arquivo CSS está nomeado corretamente

const ProfessorDisplay = () => {
    const navigate = useNavigate(); // Hook para navegação

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProfessores = async () => {
            try {
                const professores = await fetchProfessores();
                setData(professores);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProfessores();
    }, []);

    const handleEdit = (id) => {
        navigate(`/editar-professor/${id}`); // Redireciona para a tela de edição do professor
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar este professor?")) {
            try {
                await deleteProfessor(id);
                setData(data.filter(item => item.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleRedirect = () => {
        navigate('/cadastro-professor'); // Redireciona para a página de cadastro de professor
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="professor-display">
            <h1>Lista de Professores</h1>
            <ul className="data-list">
                {data.map(item => (
                    <li key={item.id} className="data-item">
                        <div className="data-info">
                            <h3>{item.nome}</h3>
                            <p>Email: {item.email}</p>
                            <p>Senha: {(item.senha)}</p>
                            <p>Tipo de Usuario: {item.tipo_usuario}</p>
                        </div>
                        <div className="action-icons">
                            <FaEdit className="icon edit" onClick={() => handleEdit(item.id)} />
                            <FaTrash className="icon delete" onClick={() => handleDelete(item.id)} />
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleRedirect}>Cadastrar Professor</button>
        </div>
    );
};

export default ProfessorDisplay;
