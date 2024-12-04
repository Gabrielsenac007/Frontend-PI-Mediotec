import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaIdCard } from 'react-icons/fa';
import './Cadastro.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { cadastrarCoordenador } from '../../services/api';
import InputMask from  "react-input-mask";

// Validação customizada para CPF
function isValidCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');

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
}

// Validação do formulário com Zod
const createUserFormSchema = z
  .object({
    email: z.string().min(1, 'Email é obrigatório').email('Formato de email inválido'),
    name: z.string().min(1, 'Nome é obrigatório'),
    cpf: z.string().min(1, 'CPF é obrigatório.').refine(isValidCPF, { message: 'Digite um CPF válido.' }),
    password: z
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres.')
      .refine((value) => /[A-Z]/.test(value), { message: 'A senha deve conter pelo menos uma letra maiúscula.' })
      .refine((value) => /[0-9]/.test(value), { message: 'A senha deve conter pelo menos um número.' })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: 'A senha deve conter pelo menos um caractere especial.',
      }),
  });

const CadastroCoordenador = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  const navigate = useNavigate();

  // Função para envio de dados
  function createUser(data) {
    const cleanData = {
      ...data,
      cpf: data.cpf.replace(/\D/g, ''), 
    };
    cadastrarCoordenador(cleanData);
    navigate('/coordenadores')
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(createUser)}>
        <h1>Cadastro de Coordenador</h1>

        {/* Campo de CPF */}
        <div className="input-field">
          <div className='input-ico'>
            <InputMask mask="999.999.999-99" type="text" placeholder="CPF" {...register('cpf')} />
            <FaIdCard className="icon" />
          </div>
          {errors.cpf && <p className="error">{errors.cpf.message}</p>}
        </div>

        {/* Campo de Nome */}
        <div className="input-field">
          <div className='input-ico'>
            <input type="text" placeholder="Nome" {...register('name')} />
            <FaUser className="icon" />
          </div>
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Campo de Email */}
        <div className="input-field">
          <div className="input-ico">
            <input type="email" placeholder="Email" {...register('email')} />
            <FaEnvelope className="icon" />
          </div>
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Campo de Senha */}
        <div className="input-field">
          <div className="input-ico">
            <input type={showPassword ? "text" : "password"} placeholder="Senha" {...register('password')} />
            <div
              className="password-icon"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <FaEyeSlash className="passwd-icon" /> : <FaEye className="passwd-icon" />}
            </div>
          </div>
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Botão de Cadastro */}
        <button type="submit" className="cadastro-bnt">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroCoordenador;
