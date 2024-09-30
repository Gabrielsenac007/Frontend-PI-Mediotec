import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa'; // Adicionado FaIdCard para CPF
import './Cadastro.css';
import { cadastrarCoordenador } from '../../services/api'; // Importação da função de cadastro de coordenador

const CadastroCoordenador = () => {
    // Estados para os campos de cadastro
    const [cpf, setCpf] = useState(""); // Novo campo CPF
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(""); // Estado para gerenciar erros
    const navigate = useNavigate(); // Hook de navegação para redirecionamento

    // Função de envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Dados do coordenador a serem enviados
        const coordenadorData = {
            cpf,   // CPF do coordenador
            nome,
            email,
            senha,
        };

        try {
            await cadastrarCoordenador(coordenadorData); // Enviar dados para a API
            alert('Cadastro realizado com sucesso!');
            navigate('/coordenadores'); // Redireciona para a página de coordenadores cadastrados
        } catch (error) {
            setError('Erro ao cadastrar: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Cadastro de Coordenador</h1>
                {error && <p className="error">{error}</p>}
                
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
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>

                {/* Botão de Cadastro */}
                <button type="submit" className='cadastro-bnt'>Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastroCoordenador;
