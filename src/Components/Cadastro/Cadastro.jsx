import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaEye, FaEyeSlash } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from 'react-input-mask';
import './Cadastro.css';
import { cadastrarAluno, listarTurmas } from '../../services/api';

// Função para validar CPF
const isValidCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf[10]);
};

// Schema de validação com Zod
const cadastroAlunoSchema = z.object({
  cpf: z
    .string()
    .min(1, 'CPF é obrigatório.')
    .refine((value) => isValidCPF(value.replace(/\D/g, '')), { message: 'CPF inválido' }),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Formato de email inválido'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial'),
  turmaId: z.string().min(1, 'Selecione uma turma'),
});

const Cadastro = () => {
  const navigate = useNavigate();
  const [turmas, setTurmas] = useState([]);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form + Zod
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(cadastroAlunoSchema),
  });

  // Busca as turmas disponíveis
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

  // Envio do formulário
  const createUser = async (data) => {
    const alunoData = {
      cpf: data.cpf.replace(/\D/g, ''), // Remove a máscara do CPF
      name: data.name,
      email: data.email,
      password: data.password,
      classeId: data.turmaId, // ID da turma
    };

    try {
      const response = await cadastrarAluno(alunoData);
      alert('Cadastro realizado com sucesso!');
      navigate('/alunos');
    } catch (error) {
      setError('Erro ao cadastrar: ' + error.message);
    }
  };

  // Função para confirmar o cadastro
  const handleConfirm = (event) => {
    event.preventDefault();

    confirmAlert({
      title: 'Confirmação de Cadastro',
      message: 'Tem certeza que deseja cadastrar este aluno?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleSubmit(onSubmit)(),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(createUser)}>
        <h1>Cadastro de Aluno</h1>
        {error && <p className="error">{error}</p>}

        {/* Campo de CPF com máscara */}
        <div className="input-field">
          <div className="input-ico">
            <InputMask
              mask="999.999.999-99"
              placeholder="CPF"
              {...register('cpf')}
            />
            <FaIdCard className="icon" />
          </div>
          {errors.cpf && <p className="error">{errors.cpf.message}</p>}
        </div>

        {/* Campo de Nome */}
        <div className="input-field">
          <div className="input-ico">
            <input
              type="text"
              placeholder="Nome"
              {...register('name')}
            />
            <FaUser className="icon" />
          </div>
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Campo de Email */}
        <div className="input-field">
          <div className="input-ico">
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
            />
            <FaEnvelope className="icon" />
          </div>
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Campo de Senha */}
        <div className="input-field">
          <div className="input-ico">
            <input
              type={showPassword ? "text" : "password"} // Altera entre "text" e "password"
              placeholder="Senha"
              {...register('password')}
            />
            <div
              className="password-icon"
              onClick={() => setShowPassword((prev) => !prev)} // Alterna o estado
              style={{ cursor: 'pointer', marginLeft: '8px' }} // Garante espaçamento
            >
              {showPassword ? <FaEyeSlash className="icon" /> : <FaEye className="icon" />}
            </div>
          </div>
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Seleção de Turma */}
        <div className="input-field">
          <label htmlFor="turma">Selecione a turma:</label>
          <select id="turma" {...register('turmaId')}>
            <option value="">Selecione uma turma</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nameClass}
              </option>
            ))}
          </select>
          {errors.turmaId && <p className="error">{errors.turmaId.message}</p>}
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
