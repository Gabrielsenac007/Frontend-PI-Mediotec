import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa'; // Ícones para os campos de input
import { confirmAlert } from 'react-confirm-alert'; // Importe o confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importe o estilo padrão
import './Cadastro.css';
import { cadastrarCoordenador } from '../../services/api'; // Importe a função de cadastro de coordenador
import { useForm } from 'react-hook-form';
import {z} from 'zod'

const createUserFormSchema = z.object({})


const CadastroCoordenador = () => {

    const {register} = useForm({
        resolver
    });


    const [cpf, setCpf] = useState(""); // Campo CPF
    const [nome, setNome] = useState(""); // Campo Nome
    const [email, setEmail] = useState(""); // Campo Email
    const [password, setSenha] = useState(""); // Campo Senha
    const [error, setError] = useState(""); // Gerenciamento de erros
    const navigate = useNavigate(); // Hook de navegação


    function createUser(data){
        console.log(data)
    }
    // Função de envio do formulário após confirmação
    const handleSubmit = async () => {
        const coordenadorData = {
            cpf,
            name: nome,
            email,
            password,
        };

        try {
            await cadastrarCoordenador(coordenadorData); // Enviar dados para a API
            alert('Cadastro realizado com sucesso!');
            navigate('/coordenadores'); // Redireciona para a página de coordenadores
        } catch (error) {
            setError('Erro ao cadastrar: ' + error.message);
        }
    };

    // Função para exibir o pop-up de confirmação
    const handleConfirm = (event) => {
        event.preventDefault();

        confirmAlert({
            title: 'Confirmação de Cadastro',
            message: 'Tem certeza que deseja cadastrar este coordenador?',
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
            <form onSubmit={handleConfirm}> {/* Substitui handleSubmit por handleConfirm */}
                <h1>Cadastro de Coordenador</h1>
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
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>

                {/* Botão de Cadastro */}
                <button type="submit" className='cadastro-bnt'>Cadastrar</button> {/* O botão agora chama handleConfirm */}
            </form>
        </div>
    );
};

export default CadastroCoordenador;
