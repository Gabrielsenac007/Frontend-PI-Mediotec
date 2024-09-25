import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock  } from 'react-icons/fa';
import './Cadastro.css';
import { cadastrarAluno } from '../../services/api'; // Importe sua função de cadastro

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("aluno"); // Valor padrão
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Para redirecionar após o cadastro

    const handleSubmit = async (event) => {
        event.preventDefault();

        const usuarioData = {
            nome,
            email,
            senha,
            tipo_usuario: tipoUsuario,
        };

        try {
            await cadastrarAluno(usuarioData); // Enviar dados para a API
            alert('Cadastro realizado com sucesso!');
            navigate('/usuarios'); // Redireciona para a página de usuários
        } catch (error) {
            setError('Erro ao cadastrar: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Cadastro de Aluno</h1>
                {error && <p className="error">{error}</p>}
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='Nome'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-field'>
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaEnvelope className='icon' />
                </div>
                <div className='input-field'>
                    <input
                        type="password"
                        placeholder='Senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>
                <div className='input-field'>
                    <select
                        value={tipoUsuario}
                        onChange={(e) => setTipoUsuario(e.target.value)}
                        required
                    >
                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                        <option value="coordenador">Coordenador</option>
                    </select>
                </div>
                <button type="submit" >Cadastrar</button>
                <div className="signup-link">
                    <p>Já tem uma conta? <Link to="/">Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Cadastro;
