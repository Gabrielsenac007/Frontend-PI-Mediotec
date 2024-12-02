import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAlunos, deleteAluno } from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './Alunos.css'; 

const AlunoDisplay = () => {
    const navigate = useNavigate(); 
    const [data, setData] = useState([]); // Estado para armazenar os alunos
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca

    useEffect(() => {
        const getAlunos = async () => {
            try {
                const response = await fetchAlunos();
                console.log("Resposta completa da API:", response);
    
               
                if (!Array.isArray(response)) {
                    throw new Error("O formato da resposta da API não é um array.");
                }

                setData(response);
            } catch (error) {
                console.error("Erro ao buscar alunos:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        getAlunos();
    }, []);
    

    const handleEdit = (id) => {
        navigate(`/edit/${id}`); // Caminho correto para navegação
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
                            await deleteAluno(id); // Deleção do aluno
                            setData(data.filter(item => item.id !== id)); // Atualiza a lista removendo o aluno deletado
                        } catch (err) {
                            setError(err.message); // Captura de erro ao deletar
                        }
                    }
                },
                {
                    label: 'Não',
                    onClick: () => {} // Não faz nada
                }
            ]
        });
    };

    const handleRedirect = () => {
        navigate('/cadastro'); // Navegação para a página de cadastro
    };

    // Filtrar os alunos com base no termo de busca
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtro pelo nome
    );

    // Exibe loading, erro ou a lista de alunos
    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">Erro: {error}</div>;

    return (
        <div className="data-display">
            <h1>Lista de Alunos</h1>
            {/* Campo de entrada para filtro */}
            <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
                className="search-input"
            />
            <ul className="data-list">
                {filteredData.length > 0 ? (
                    filteredData.map(item => (
                        <li key={item.id} className="data-item">
                            <div className='first-info'>
                                {item.imgProfile && <div className="img-profile"><img className='foto' src={item.imgProfile} alt="" /></div>}
                                <div className="data-info">
                                    <h3>Nome: {item.name}</h3>
                                    <p>Email: {item.email}</p>
                                    {/*<p>Turma: {item.studentClass?.nameClass || 'N/A'}</p>  Verifica se a turma existe */}
                                </div>
                            </div>
                            <div className="action-icons">
                                <FaEdit className="icon edit" onClick={() => handleEdit(item.id)} />
                                <FaTrash className="icon delete" onClick={() => handleDelete(item.id)} />
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="data-item">Nenhum aluno encontrado.</li>
                )}
            </ul>
            <button onClick={handleRedirect}>Cadastrar Aluno</button>
        </div>
    );
};

export default AlunoDisplay;
