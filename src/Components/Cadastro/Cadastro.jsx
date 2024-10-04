import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert'; // Importe o confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importe o estilo padrão
import './Cadastro.css';
import { cadastrarAluno } from '../../services/api'; // Importe a função de cadastro

const Cadastro = () => {
    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const usuarioData = {
            cpf,
            name,
            email,
            password
        };

        try {
            await cadastrarAluno(usuarioData); // Envia os dados para a API
            alert('Cadastro realizado com sucesso!');
            navigate('/alunos'); // Redireciona para a página de alunos
        } catch (error) {
            setError('Erro ao cadastrar: ' + error.message);
        }
    };

    // Função que mostra o pop-up de confirmação
    const handleConfirm = (event) => {
        event.preventDefault();

        confirmAlert({
            title: 'Confirmação de Cadastro',
            message: 'Tem certeza que deseja cadastrar este aluno?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => handleSubmit()
                },
                {
                    label: 'Não',
                    onClick: () => {} // Não faz nada, apenas fecha o pop-up
                }
            ]
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleConfirm}> {/* Alterado para chamar handleConfirm */}
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
                <button type="submit">Cadastrar</button> {/* O botão de submissão */}
            </form>
        </div>
    );
};

export default Cadastro;
