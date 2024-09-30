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
      // Faz uma requisição POST para o endpoint de login
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CPF': cpf, // Adiciona o CPF no cabeçalho
          'Password': password, // Adiciona a senha no cabeçalho
        }
      });

      // Verifica se a resposta é bem-sucedida (status 200)
      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido:', data);

        // Navega para a rota '/alunos' após login bem-sucedido
        navigate('/alunos');
      } else {
        // Lida com falhas na autenticação
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao autenticar: ' + error.message); // Alerta ao usuário em caso de erro
    }
    console.log(password, cpf);
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

        {/* Checkbox "Lembre de mim" e link para recuperação de senha */}
        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>

        {/* Botão de submissão do formulário */}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
