import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert'; // Importe o confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importe o estilo padrão
import './EditUsuario.css';
import { editarCoordenador } from '../../services/api'; // Importe a função de edição de coordenador

const EditarCoordenador = () => {
    const { id } = useParams(); // Pega o ID do coordenador da URL
    const [cpf, setCpf] = useState(""); // Campo CPF
    const [nome, setNome] = useState(""); // Campo Nome
    const [email, setEmail] = useState(""); // Campo Email
    const [password, setSenha] = useState(""); // Campo Senha
    const [error, setError] = useState(""); // Gerenciamento de erros
    const navigate = useNavigate(); // Hook de navegação


    // Função de envio do formulário após confirmação
    const handleSubmit = async () => {
        const coordenadorData = {
            cpf,
            name: nome,
            email,
            password, 
        };

        try {
            await editarCoordenador(id, coordenadorData); // Enviar dados para a API
            alert('Edição realizada com sucesso!');
            navigate('/coordenadores'); // Redireciona para a página de coordenadores
        } catch (error) {
            setError('Erro ao editar: ' + error.message);
        }
    };

    // Função para exibir o pop-up de confirmação
    const handleConfirm = (event) => {
        event.preventDefault();

        confirmAlert({
            title: 'Confirmação de Edição',
            message: 'Tem certeza que deseja editar este coordenador?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => handleSubmit() // Chama handleSubmit se confirmado
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
            <form onSubmit={handleConfirm}>
                <h1>Editar Coordenador</h1>
                {error && <p className="error">{error}</p>} {/* Mensagem de erro, se houver */}

                {/* Campo de CPF */}
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

                {/* Campo de Nome */}
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

                {/* Campo de Email */}
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

                {/* Campo de Senha */}
                <div className='input-field'>
                    <input
                        type="password"
                        placeholder='Senha (opcional)'
                        value={password}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <FaLock className='icon' />
                </div>

                {/* Botão de Edição */}
                <button type="submit" className='cadastro-bnt'>Salvar</button>
            </form>
        </div>
    );
};

export default EditarCoordenador;
