import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAlunos, deleteAluno } from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Alunos.css';

const DataDisplay = () => {
    const navigate = useNavigate(); // Hook para navegação

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAlunos = async () => {
            try {
                const alunos = await fetchAlunos();
                setData(alunos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getAlunos();
    }, []);

    const handleEdit = (id) => {
        navigate(`/editar-usuario/${id}`); // Redireciona para a tela de edição
    };


    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar este aluno?")) {
            try {
                await deleteAluno(id);
                setData(data.filter(item => item.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleRedirect = () => {
        navigate('/cadastro'); // Redireciona para a página de cadastro
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="data-display">
            <h1>Dados Recebidos</h1>
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
            <button onClick={handleRedirect}>Cadastrar Aluno</button>
        </div>
    );
};

export default DataDisplay;
