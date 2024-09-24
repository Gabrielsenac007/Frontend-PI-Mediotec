import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom'; // Importando useNavigate

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook para navegação

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/alunos/login', { // Altere para a URL correta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, senha: password }),
            });

            if (!response.ok) {
                throw new Error('Erro ao autenticar: ' + response.statusText);
            }

            const data = await response.json();
            console.log('Login bem-sucedido:', data);

            // Navegue para a página desejada após o login bem-sucedido
            navigate('/alunos'); // Altere para a rota desejada
        } catch (error) {
            console.error(error);
            alert('Erro ao autenticar: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Acesse o Sistema</h1>
                <div className='input-field'>
                    <input type="email" placeholder='E-mail'
                        onChange={(e) => setUsername(e.target.value)} required />
                    <FaEnvelope className='icon' />
                </div>
                <div className='input-field'>
                    <input type="password" placeholder='Senha'
                        onChange={(e) => setPassword(e.target.value)} required />
                    <FaLock className='icon' />
                </div>

                <div className="recall-forget">
                    <label>
                        <input type="checkbox" />
                        Lembre de mim
                    </label>
                    <a href="#">Esqueceu a senha?</a>
                </div>

                <Link to="/alunos">
                    <button>Entrar</button>
                </Link>

                <div className="signup-link">
                    <p>Não tem uma conta? <Link to="/cadastro">Cadastrar</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
