import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './EditUsuario.css';
import { editarCoordenador, buscarCoordenadorPorId } from '../../services/api'; // Funções da API
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema de validação com Zod
const coordenadorSchema = z.object({
  cpf: z
    .string()
    .min(11, 'CPF deve ter no mínimo 11 caracteres.')
    .max(14, 'CPF deve ter no máximo 14 caracteres.'),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres.'),
  email: z.string().email('Formato de email inválido.'),
  password: z.string().optional(), // Senha é opcional
});

const EditarCoordenador = () => {
  const { id } = useParams(); // Pega o ID do coordenador da URL
  const navigate = useNavigate(); // Hook de navegação
  const [error, setError] = useState(''); // Gerenciamento de erros

  // Hook Form integrado ao Zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(coordenadorSchema),
  });

  // Preenche os campos com os dados do coordenador ao carregar a página
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const coordenador = await buscarCoordenadorPorId(id); // Busca dados do coordenador
        // Define os valores iniciais no formulário
        setValue('cpf', coordenador.cpf);
        setValue('name', coordenador.name);
        setValue('email', coordenador.email);
        setValue('password', ''); // Campo de senha vazio
      } catch (error) {
        setError('Erro ao carregar dados do coordenador: ' + error.message);
      }
    };
    carregarDados();
  }, [id, setValue]);

  // Função de envio do formulário
  const onSubmit = async (data) => {
    try {
      await editarCoordenador(id, data); // Envia os dados para a API
      alert('Edição realizada com sucesso!');
      navigate('/coordenadores'); // Redireciona para a página de coordenadores
    } catch (error) {
      setError('Erro ao editar: ' + error.message);
    }
  };

  // Função para exibir o pop-up de confirmação
//   const handleConfirm = (event) => {
//     event.preventDefault();
//     confirmAlert({
//       title: 'Confirmação de Edição',
//       message: 'Tem certeza que deseja editar este coordenador?',
//       buttons: [
//         {
//           label: 'Sim',
//           onClick: () => handleSubmit(onSubmit)(),
//         },
//         {
//           label: 'Não',
//           onClick: () => {},
//         },
//       ],
//     });
//   };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Editar Coordenador</h1>
        {error && <p className="error">{error}</p>} {/* Mensagem de erro, se houver */}

        {/* Campo de CPF */}
        <div className="input-field">
          <input
            type="text"
            placeholder="CPF"
            {...register('cpf')}
          />
          <FaIdCard className="icon" />
          {errors.cpf && <p className="error">{errors.cpf.message}</p>}
        </div>

        {/* Campo de Nome */}
        <div className="input-field">
          <input
            type="text"
            placeholder="Nome"
            {...register('name')}
          />
          <FaUser className="icon" />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Campo de Email */}
        <div className="input-field">
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          <FaEnvelope className="icon" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Campo de Senha */}
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha (opcional)"
            {...register('password')}
          />
          <FaLock className="icon" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Botão de Edição */}
        <button type="submit" className="cadastro-bnt">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditarCoordenador;
