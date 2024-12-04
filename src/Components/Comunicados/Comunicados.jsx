import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import './Comunicados.css';

// Esquema de validação com Zod
const comunicadoSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório').max(100, 'O título não pode ultrapassar 100 caracteres'),
  content: z.string().min(1, 'O conteúdo é obrigatório').max(500, 'O conteúdo não pode ultrapassar 500 caracteres'),
  classId: z.string().uuid('Selecione uma turma válida'),
});

const Comunicados = () => {
  const [turmas, setTurmas] = useState([]);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Configuração do react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(comunicadoSchema),
    defaultValues: {
      title: '',
      content: '',
      classId: '',
    },
  });

  // Carregar turmas da API
  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await axios.get('https://sis-medio-production.up.railway.app/api/classes/getAllClasses'); // Substitua pela URL correta
        setTurmas(response.data);
      } catch (err) {
        console.error('Erro ao carregar as turmas:', err);
      }
    };
    fetchTurmas();
  }, []);

  // Função para enviar o formulário
  const onSubmit = async (data) => {
    setMessage('');
    try {
      const creatorId = localStorage.getItem('id');
      await axios.post('https://sis-medio-production.up.railway.app/api/statement/insertStatement', {
        ...data,
        creatorId,
      });

      setMessage('Comunicado adicionado com sucesso!');
      setShowPopup(true);
      reset(); // Reseta os campos do formulário
    } catch (err) {
      console.error('Erro ao enviar o comunicado:', err);
      setMessage('Erro ao enviar o comunicado. Tente novamente.');
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="notices-container">
      <h1>Comunicados</h1>

      <form className="notice-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            className={`input-notice ${errors.title ? 'input-error' : ''}`}
            placeholder="Digite o título do comunicado..."
            {...register('title')}
          />
          {errors.title && <span className="error-message">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <textarea
            className={`input-content ${errors.content ? 'input-error' : ''}`}
            placeholder="Digite o conteúdo do comunicado..."
            rows="4"
            {...register('content')}
          ></textarea>
          {errors.content && <span className="error-message">{errors.content.message}</span>}
        </div>

        <div className="form-group">
          <select
            className={`input-select ${errors.classId ? 'input-error' : ''}`}
            {...register('classId')}
          >
            <option value="">Selecione uma turma...</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nameClass} - {turma.schoolYear} - {turma.shift}
              </option>
            ))}
          </select>
          {errors.classId && <span className="error-message">{errors.classId.message}</span>}
        </div>

        <button type="submit" className="btn-add-notice" disabled={isSubmitting}>
          {isSubmitting ? 'Adicionando...' : 'Adicionar Comunicado'}
        </button>
      </form>

      {/* Pop-up de confirmação */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="popup-message">{message}</span>
            <button onClick={handleClosePopup} className="btn-close-popup">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comunicados;
