import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAlunos, deleteAluno } from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert'; // Importa o react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Estilo padrão para o pop-up
import './Alunos.css'; // Utilize o CSS já existente

const AlunoDisplay = () => {
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
        navigate(`/editar-aluno/${id}`); // Redireciona para a tela de edição do aluno
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirmação',
            message: 'Tem certeza que deseja deletar este aluno?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        try {
                            await deleteAluno(id); // Chama a função para deletar aluno
                            setData(data.filter(item => item.id !== id)); // Atualiza a lista de alunos, removendo o deletado
                        } catch (err) {
                            setError(err.message);
                        }
                    }
                },
                {
                    label: 'Não',
                    onClick: () => {} // Não faz nada, apenas fecha o pop-up
                }
            ]
        });
    };

    const handleRedirect = () => {
        navigate('/cadastro'); // Redireciona para a página de cadastro de aluno
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">Erro: {error}</div>;

    return (
        <div className="data-display">
            <h1>Lista de Alunos</h1>
            <ul className="data-list">
                {data.map(item => (
                    <li key={item.id} className="data-item">
                        <div className="data-info">
                            <h3>Nome: {item.name}</h3>
                            <p>Email: {item.email}</p>
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

export default AlunoDisplay;
