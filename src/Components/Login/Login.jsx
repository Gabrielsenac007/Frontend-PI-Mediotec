import { FaUser, FaLock } from 'react-icons/fa'; // Importando ícones
import { useState } from 'react'; // Importando useState para gerenciar o estado dos inputs
import { useNavigate, Link } from 'react-router-dom'; // Importando useNavigate para navegação
import './Login.css'; // Estilos

const Login = () => {
  // Estado para armazenar o CPF e senha digitados
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  // Função para submeter o formulário e fazer a autenticação
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página

    try {
      // Faz uma requisição POST para o endpoint de login do backend
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, senha: password }), // Enviando CPF e senha
      });

      if (response.ok) {
        // Se a resposta for bem-sucedida (status 200)
        const data = await response.json();
        console.log('Login bem-sucedido:', data);
        navigate('/alunos'); // Redireciona para a página /alunos após login bem-sucedido
      } else {
        // Se a resposta não for bem-sucedida (status 4xx ou 5xx)
        const errorText = await response.text(); // Captura o erro como texto
        throw new Error(errorText); // Lança um erro com a mensagem do backend
      }
    } catch (error) {
      console.error('Erro:', error.message);
      alert('Erro ao autenticar: ' + error.message); // Exibe o erro para o usuário
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
            pattern="\d{11}" // Regex para aceitar apenas números e garantir 11 dígitos
            title="Digite um CPF válido com 11 números"
            required
          />
          <FaUser className="icon" /> {/* Ícone de usuário */}
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
          <FaLock className="icon" /> {/* Ícone de cadeado */}
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

        {/* Link para página de cadastro */}
        <div className="signup-link">
          <p>Não tem uma conta? <Link to="/cadastro">Cadastrar</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;