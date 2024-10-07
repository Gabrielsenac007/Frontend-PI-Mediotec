import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Cadastro.css';
import { cadastrarAluno, listarTurmas } from '../../services/api';

const Cadastro = () => {
    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [turmas, setTurmas] = useState([]);
    const [selectedTurma, setSelectedTurma] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTurmas = async () => {
            try {
                const response = await listarTurmas();
                setTurmas(response);
            } catch (error) {
                setError('Erro ao carregar turmas: ' + error.message);
            }
        };
        fetchTurmas();
    }, []);

    const handleSubmit = async () => {
        // Formato de envio atualizado
        const usuarioData = {
            cpf,
            name,
            email,
            password,
            classeId: selectedTurma, // Alterado para o nome correto: 'classeId'
        };

        console.log('Dados do usuário:', usuarioData); // Log dos dados do usuário

        try {
            const response = await cadastrarAluno(usuarioData);
            console.log('Resposta do servidor:', response); // Log da resposta do servidor
            alert('Cadastro realizado com sucesso!');
            navigate('/alunos');
        } catch (error) {
            console.error('Erro ao cadastrar:', error); // Log detalhado do erro
            setError('Erro ao cadastrar: ' + error.message);
        }
    };

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
                    onClick: () => {}
                }
            ]
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleConfirm}>
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
                <div className='input-field'>
                    <label htmlFor="turma">Selecione a turma:</label>
                    <select
                        id="turma"
                        value={selectedTurma}
                        onChange={(e) => setSelectedTurma(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma turma</option>
                        {turmas.map((turma) => (
                            <option key={turma.id} value={turma.id}>{turma.nameClass}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default Cadastro;
