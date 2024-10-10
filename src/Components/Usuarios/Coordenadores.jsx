import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCoordenadores, deleteCoordenador } from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Alunos.css';

const CoordenadoresDisplay = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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
        navigate(`/editCoord/${id}`);
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
        navigate('/cadastroCoordenador');
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="data-display">
            <h1>Coordenadores</h1>
            <input
                type="text"
                placeholder="Buscar coordenador pelo nome"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <ul className="data-list">
                {filteredData.map(item => (
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
            <button onClick={handleRedirect}>Cadastrar Coordenador</button>
        </div>
    );
};

export default CoordenadoresDisplay;
