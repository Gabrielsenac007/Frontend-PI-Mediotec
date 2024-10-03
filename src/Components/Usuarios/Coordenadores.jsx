import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCoordenadores, deleteCoordenador } from '../../services/api'; // Supondo que você tenha essas funções
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Alunos.css'; // Estilos específicos para a tela de coordenadores

const CoordenadoresDisplay = () => {
    const navigate = useNavigate(); // Hook para navegação

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCoordenadores = async () => {
            try {
                const coordenadores = await fetchCoordenadores();
                setData(coordenadores);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getCoordenadores();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-coordenador/${id}`); // Redireciona para a tela de edição
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar este coordenador?")) {
            try {
                await deleteCoordenador(id);
                setData(data.filter(item => item.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleRedirect = () => {
        navigate('/cadastroCoordenador'); // Redireciona para a página de cadastro de coordenador
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="data-display"> {/* Adicione a classe para aplicar estilos */}
            <h1>Coordenadores</h1>
            <ul className="data-list">
                {data.map(item => (
                    <li key={item.id} className="data-item">
                        <div className="data-info">
                            <h3>{item.nome}</h3>
                            <p>Email: {item.email}</p>
                            <p>Tipo de Usuario: {item.tipo_usuario}</p>
                        </div>
                        <div className="action-icons">
                            <FaEdit className="icon edit" onClick={() => handleEdit(item.id)} />
                            <FaTrash className="icon delete" onClick={() => handleDelete(item.id)} />
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleRedirect}>Cadastrar Coordenador</button>
        </div>
    );
};

export default CoordenadoresDisplay;
