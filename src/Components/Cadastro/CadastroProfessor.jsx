import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPlus, FaIdCard, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from 'react-input-mask';
import './Cadastro.css';
import Swal from 'sweetalert2'
import { Toast } from '../Swal';

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
const cadastroProfessorSchema = z.object({
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
  materias: z
    .array(
      z.object({
        disciplinaId: z.string().min(1, 'Selecione uma matéria válida'),
      })
    )
    .min(1, 'Selecione pelo menos uma matéria'),
});

const Cadastro = () => {
  const navigate = useNavigate();
  const [opcoesMaterias, setOpcoesMaterias] = useState([]);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cadastroProfessorSchema),
    defaultValues: {
      materias: [{ disciplinaId: "" }],
    },
  });

  const materias = watch('materias');

  const fetchDisciplinas = async () => {
    try {
      const response = await fetch('https://sis-medio-production.up.railway.app/api/disciplines/getAll');
      const data = await response.json();
      setOpcoesMaterias(data);
    } catch (error) {
      setError('Erro ao carregar disciplinas: ' + error.message);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const onSubmit = async (data) => {
    const professorData = {
      professor: {
        cpf: data.cpf.replace(/\D/g, ''),
        name: data.name,
        email: data.email,
        password: data.password,
      },
      disciplina: data.materias,
    };

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://sis-medio-production.up.railway.app/api/users/register/professor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(professorData),
      });

      if (!response.ok) {
        Toast.fire({
          icon:'error',
          text:'Algo deu errado no cadastro!'

        })
        throw new Error('Erro ao cadastrar o professor');
      }

      Swal.fire({
        icon:'success',
        title:'Cadastro realizado com sucesso!',
        showConfirmButton: true,
        confirmButtonText:'Entendido',
        confirmButtonColor:'green'
      })
      navigate('/professores');
    } catch (error) {
      console.error(error)
      Toast.fire({
        icon:'error',
        text:'Algo deu errado no cadastro!'

      })
    }
  };

  const addMateria = () => {
    setValue('materias', [...materias, { disciplinaId: '' }]);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastro de Professor</h1>
        {error && <p className="error">{error}</p>}

        {/* Campo de CPF */}
        <div className="input-field">
          <div className="input-ico">
            <InputMask mask="999.999.999-99" placeholder="CPF" {...register('cpf')} />
            <FaIdCard className="icon" />
          </div>
          {errors.cpf && <p className="error">{errors.cpf.message}</p>}
        </div>

        {/* Campo de Nome */}
        <div className="input-field">
          <div className="input-ico">
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

        {/* Campo de Matérias */}
        {materias.map((materia, index) => (
          <div className="input-field" key={index}>
            <select {...register(`materias.${index}.disciplinaId`)}>
              <option value="">Selecione uma matéria</option>
              {opcoesMaterias.map((disciplina) => (
                <option key={disciplina.id} value={disciplina.id}>
                  {disciplina.disciplineName}
                </option>
              ))}
            </select>
            {index === materias.length - 1 && (
              <a
                href="#"
                className="add-materia-button"
                onClick={(e) => {
                  e.preventDefault();
                  addMateria();
                }}
              >
                <FaPlus />
              </a>
            )}
          </div>
        ))}

        <button type="submit" className="cadastro-bnt">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
