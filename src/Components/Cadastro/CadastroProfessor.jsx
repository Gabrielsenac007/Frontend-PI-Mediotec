import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPlus, FaIdCard } from 'react-icons/fa';
import './Cadastro.css';
import { cadastrarAluno } from '../../services/api';

const Cadastro = () => {
    const [cpf, setCpf] = useState(""); // Estado para CPF
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [materias, setMaterias] = useState([""]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const usuarioData = {
            cpf, // Adiciona CPF ao objeto de dados
            nome,
            email,
            senha,
            materias,
        };

        try {
            await cadastrarAluno(usuarioData); // Enviar dados para a API
            alert('Cadastro realizado com sucesso!');
            navigate('/usuarios'); // Redireciona para a página de usuários
        } catch (error) {
            setError('Erro ao cadastrar: ' + error.message);
        }
    };

    // Função para adicionar uma nova matéria
    const addMateria = () => {
        setMaterias([...materias, ""]);
    };

    // Lista de opções de matérias (pode ser ajustada conforme necessário)
    const opcoesMaterias = [
        'Matemática',
        'Português',
        'História',
        'Geografia',
        'Biologia',
        'Inglês',
        'Educação Física',
        'TI',
        'Projeto de vida',
        'Química',
        'Física',
        'Filosofia',
        'Sociologia',
    ];

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Cadastro de Professor</h1>
                {error && <p className="error">{error}</p>}

                {/* Campo de CPF antes do Nome */}
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='CPF'
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                    <FaIdCard className='icon' /> {/* Ícone de CPF */}
                </div>

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

                {/* Campo de matérias como select */}
                {materias.map((materia, index) => (
                    <div className='input-field' key={index}>
                        <select
                            value={materia}
                            onChange={(e) => {
                                const newMaterias = [...materias];
                                newMaterias[index] = e.target.value;
                                setMaterias(newMaterias);
                            }}
                            required
                        >
                            <option value="">Selecione uma matéria</option>
                            {opcoesMaterias.map((opcao, i) => (
                                <option key={i} value={opcao}>
                                    {opcao}
                                </option>
                            ))}
                        </select>
                        {index === materias.length - 1 && (
                            <a
                                href="#"
                                className="add-materia-button"
                                onClick={(e) => {
                                    e.preventDefault(); // Previne o comportamento padrão de navegação do link
                                    addMateria(); // Função para adicionar uma nova matéria
                                }}
                            >
                                <FaPlus />
                            </a>
                        )}
                    </div>
                ))}

                <button type="submit" className='cadastro-bnt'>Cadastrar</button>
            </form>
        </div>
    );
};

export default Cadastro;
