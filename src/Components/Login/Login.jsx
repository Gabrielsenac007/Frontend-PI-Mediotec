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
      // Faz uma requisição POST para o endpoint de login com CPF e senha no corpo
      const response = await fetch('https://sam-light-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf: cpf,
          password: password,
        }),
      });

      // Verifica se a resposta é bem-sucedida (status 200)
      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido:', data);

        // Armazena o token e o nome do usuário no localStorage
        localStorage.setItem('token', data.token); // Armazena o nome do usuário
        localStorage.setItem('id', data.id); // Armazena o nome do usuário

        // Exibe um alerta com a role do usuário
        // alert('Role do usuário: ' + data.role + data.id ) ;

        // Verifica o papel do usuário (role) para redirecionamento
        if (data.role === 'PROFESSOR') {
          navigate('/homeProf'); // Redireciona para a home do professor
        } else if (data.role === 'gestor') {
          navigate('/home'); // Redireciona para a home do gestor
        } else {
          // Se o role não for reconhecido, redireciona para uma página padrão
          navigate('/home');
        }
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

        {/* Botão de submissão do formulário */}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
