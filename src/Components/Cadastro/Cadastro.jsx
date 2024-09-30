import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa';
import './Cadastro.css';
import { cadastrarAluno } from '../../services/api'; // Importe sua função de cadastro

const Cadastro = () => {
    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
<<<<<<< HEAD
    const [senha, setSenha] = useState("");
    
=======
    const [password, setPassword] = useState("");
>>>>>>> ea739407eaf6b6fd51ae7f2fcb9b9b09d617d0be
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Para redirecionar após o cadastro

    const handleSubmit = async (event) => {
        event.preventDefault();

        const usuarioData = {
            cpf,
            name,
            email,
<<<<<<< HEAD
            senha,
            
=======
            password
>>>>>>> ea739407eaf6b6fd51ae7f2fcb9b9b09d617d0be
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
                        placeholder='CPF'
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                    <FaIdCard className='icon' /> 
                </div>
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>
<<<<<<< HEAD
            
=======

>>>>>>> ea739407eaf6b6fd51ae7f2fcb9b9b09d617d0be
                <button type="submit" >Cadastrar</button>
                <div className="signup-link">
                    
                </div>
            </form>
        </div>
    );
};

export default Cadastro;
