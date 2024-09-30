import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Função para submeter o formulário e fazer a autenticação
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página

    try {
      // Faz uma requisição POST para o endpoint de login com CPF e senha no cabeçalho
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
<<<<<<< HEAD
          'CPF': cpf, // Envia o CPF no cabeçalho
          'Password': password // Envia a senha no cabeçalho
        }
=======
        },
        body: JSON.stringify({
          cpf: cpf,
          password: password
        })
>>>>>>> ea739407eaf6b6fd51ae7f2fcb9b9b09d617d0be
      });

      // Verifica se a resposta é bem-sucedida (status 200)
      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido:', data);

        // Armazena o token no localStorage (ou sessionStorage)
        localStorage.setItem('authToken', data.token);

        // Navega para a rota '/alunos' após login bem-sucedido
        navigate('/alunos');
      } else {
        // Lida com falhas na autenticação
        throw new Error('Falha na autenticação: ' + response.statusText);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao autenticar: ' + error.message); // Alerta ao usuário em caso de erro
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o Sistema</h1>

        {/* Campo de entrada para o CPF */}
        <div className="input-field">
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            pattern="\d{11}"
            title="Digite um CPF válido com 11 números"
            required
          />
          <FaUser className="icon" />
        </div>

        {/* Campo de entrada para a senha */}
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>

        {/* Checkbox "Lembre de mim" e link para recuperação de senha 
        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>
          */}
        {/* Botão de submissão do formulário */}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
