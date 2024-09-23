import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUsuario, editarUsuario } from '../../services/api'; // Importar funções da API
import './EditUsuario.css';

const EditUsuario = () => {
    const { id } = useParams(); // Obtém o ID do usuário da URL
    const navigate = useNavigate();
    
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        senha: '',
        tipo_usuario: 'aluno', // Valor padrão
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const getUsuario = async () => {
            try {
                const data = await fetchUsuario(id); // Buscar os dados do usuário
                setUsuario(data);
            } catch (err) {
                setError('Erro ao buscar usuário: ' + err.message);
            }
        };
        getUsuario();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editarUsuario(id, usuario); // Enviar dados para a API
            alert('Usuário editado com sucesso!');
            navigate('/usuarios'); // Redireciona para a lista de usuários
        } catch (err) {
            setError('Erro ao editar usuário: ' + err.message);
        }
    };

    return (
        <div className="edit-usuario">
            <h1>Edição de Usuário</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={usuario.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={usuario.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        value={usuario.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-field">
                    <select
                        name="tipo_usuario"
                        value={usuario.tipo_usuario}
                        onChange={handleChange}
                        required
                    >
                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                        <option value="coordenador">Coordenador</option>
                    </select>
                </div>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default EditUsuario;
