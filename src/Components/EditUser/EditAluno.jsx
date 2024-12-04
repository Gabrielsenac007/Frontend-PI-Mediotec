import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaEye, FaEyeSlash } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from 'react-input-mask';
import './EditUsuario.css'; // Estilo específico para edição
import { obterAluno, atualizarAluno, listarTurmas, obterAlunoPorId } from '../../services/api';
import axios from 'axios';

// Função para validar CPF
const isValidCPF = (cpf) => {
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
};

// Schema de validação com Zod
const editarAlunoSchema = z.object({
  cpf: z.string().min(1, 'CPF é obrigatório.').refine((value) => isValidCPF(value.replace(/\D/g, '')), { message: 'CPF inválido' }),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Formato de email inválido'),
  password: z.string().optional().refine(val => val === "" || val.length >= 6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  }).refine(val => val === "" || /[A-Z]/.test(val), {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
  }).refine(val => val === "" || /[0-9]/.test(val), {
    message: 'A senha deve conter pelo menos um número',
  }).refine(val => val === "" || /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: 'A senha deve conter pelo menos um caractere especial',
  }),
  turmaId: z.string().min(1, 'Selecione uma turma'),
  imgProfile: z.instanceof(File).optional(),
});

const EditarAluno = () => {
  const { id } = useParams(); // Pega o ID do aluno a partir da URL
  const [turmas, setTurmas] = useState([]);
  const [error, setError] = useState("");
  const [imgProfile, setImgProfile] = useState(null); // Para armazenar o arquivo de imagem
  const [currentImgProfile, setCurrentImgProfile] = useState(""); // Para armazenar a imagem de perfil atual
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // React Hook Form + Zod
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(editarAlunoSchema),
    defaultValues: {
        cpf: ''  // Defina um valor padrão vazio para o campo CPF
      }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aluno = await obterAlunoPorId(id);
        const turmasList = await listarTurmas();
  
        setValue('cpf', aluno.cpf || ''); 
        setValue('name', aluno.name);
        setValue('email', aluno.email);
        setValue('turmaId', aluno.studentClass.id); // Correção aqui, acessar studentClass.id
        setCurrentImgProfile(aluno.imgProfile || ''); 
  
        setTurmas(turmasList);
      } catch (error) {
        setError('Erro ao carregar os dados: ' + error.message);
      }
    };
  
    fetchData();
  }, [id, setValue]);
  
  
  const handleSubmitForm = async (data) => {
    const formData = new FormData();
    formData.append('cpf', data.cpf.replace(/\D/g, ''));
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password || '');
    formData.append('classeId', data.turmaId);
  

    if (imgProfile) {
      formData.append('imgProfile', imgProfile);
    }
  
    try {
      await axios.put(`http://localhost:8080/api/users/update/student/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',  
        },
      });
      alert('Aluno atualizado com sucesso!');
      navigate('/alunos');
    } catch (error) {
      setError('Erro ao atualizar o aluno: ' + error.message);
    }
  };

  const handleConfirm = (event) => {
    event.preventDefault();

    confirmAlert({
      title: 'Confirmação de Edição',
      message: 'Tem certeza que deseja salvar as alterações deste aluno?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleSubmit(handleSubmitForm)(),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="editar-aluno-wrapper">
      <form onSubmit={handleConfirm} className="editar-aluno-form">
        <h1>Editar Aluno</h1>
        {error && <p className="error-message">{error}</p>}

        {/* Campo de CPF com máscara */}
        <div className="input-wrapper">
          <InputMask mask="999.999.999-99" placeholder="CPF" {...register('cpf')} />
          <FaIdCard className="icon-cpf" />
          {errors.cpf && <p className="error">{errors.cpf.message}</p>}
        </div>

        {/* Campo de Nome */}
        <div className="input-wrapper">
          <input type="text" placeholder="Nome" {...register('name')} />
          <FaUser className="icon-name" />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Campo de Email */}
        <div className="input-wrapper">
          <input type="email" placeholder="Email" {...register('email')} />
          <FaEnvelope className="icon-email" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Campo de Senha */}
        <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            {...register('password')}
          />
          <div
            className="password-icon"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ cursor: 'pointer', marginLeft: '8px' }}
          >
            {showPassword ? <FaEyeSlash className="passwd-icon" /> : <FaEye className="passwd-icon" />}
          </div>
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Seleção de Turma */}
        <div className="input-wrapper">
          <label htmlFor="turma">Selecione a turma:</label>
          <select id="turma" {...register('turmaId')}>
        <option value="">Selecione uma turma</option>
        {turmas.map((turma) => (
            <option key={turma.id} value={turma.id} selected={turma.id === currentImgProfile}>
            {turma.nameClass}
            </option>
        ))}
        </select>
          {errors.turmaId && <p className="error">{errors.turmaId.message}</p>}
        </div>

        {/* Imagem de Perfil Atual */}
        {currentImgProfile && (
          <div className="input-wrapper">
            <label>Imagem de Perfil Atual:</label>
            <img src={currentImgProfile} alt="Imagem de Perfil" className="profile-image" />
          </div>
        )}

        {/* Upload de Nova Imagem */}
        <div className="input-wrapper">
          <input
            type="file"
            onChange={(e) => setImgProfile(e.target.files[0])}
            accept="image/*"
          />
        </div>

        <button type="submit" className="submit-btn">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditarAluno;
