import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProfessores, deleteProfessor } from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert'; // Importar a biblioteca para pop-up
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importar o CSS padrão do pop-up
import './Alunos.css'; // Usar o CSS fornecido no arquivo Alunos.css, aplicando as classes corretamente

const ProfessorDisplay = () => {
    const navigate = useNavigate(); // Hook para navegação
    const [data, setData] = useState([]); // Dados dos professores
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const [filter, setFilter] = useState(''); // Estado do filtro de busca

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
        navigate(`/editProf/${id}`); // Redireciona para a tela de edição do professor
    };

    const handleDelete = async (id) => {
        confirmAlert({
            title: 'Confirmação',
            message: 'Tem certeza que deseja deletar este professor?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        try {
                            await deleteProfessor(id);
                            setData(data.filter(item => item.id !== id));
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
        navigate('/cadastroProfessor'); // Redireciona para a página de cadastro de professor
    };

    // Filtra os professores com base no nome
    const filteredProfessores = data.filter(professor =>
        professor.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="data-display">
            <h1>Lista de Professores</h1>
            <input
                type="text"
                placeholder="Buscar por nome..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)} // Atualiza o estado do filtro
                className="search-input" // Classe CSS para o campo de busca
            />
            <ul className="data-list">
                {filteredProfessores.map(item => (
                    <li key={item.id} className="data-item">
                        <div className="data-info">
                            <h3>Nome: {item.name}</h3>
                            <p>Email: {item.email}</p>
                            {/* Exibir apenas o nome da disciplina associada ao professor */}
                            {item.disciplines && item.disciplines.length > 0 && (
                                <div>
                                    <strong>Disciplina:</strong> {item.disciplines[0].disciplineName}
                                </div>
                            )}
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
