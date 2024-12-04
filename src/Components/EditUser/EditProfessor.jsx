import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaTimes, FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './EditUsuario.css';

// Validação com Zod
const professorSchema = z.object({
    cpf: z
        .string()
        .min(11, 'CPF deve ter no mínimo 11 caracteres.')
        .max(14, 'CPF deve ter no máximo 14 caracteres.'),
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres.'),
    email: z.string().email('Formato de email inválido.'),
    password: z.string().optional(), // Senha opcional
});

const disciplinasSchema = z
    .array(
        z.object({
            disciplinaId: z.string().min(1, 'Matéria é obrigatória.'),
        })
    )
    .nonempty('Ao menos uma matéria é obrigatória.');

const schema = z.object({
    professor: professorSchema,
    disciplina: disciplinasSchema,
});

const EditarProfessor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [opcoesMaterias, setOpcoesMaterias] = useState([]);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            professor: {
                cpf: '',
                name: '',
                email: '',
                password: '',
            },
            disciplina: [{ disciplinaId: '' }],
        },
    });

    // Carregar disciplinas
    const fetchDisciplinas = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/disciplines/getAll');
            const data = await response.json();
            setOpcoesMaterias(data);
        } catch (error) {
            setError('Erro ao carregar disciplinas: ' + error.message);
        }
    };

    // Carregar informações do professor
    const fetchProfessor = async () => {
        try {
            // Carregar dados do professor
            const response = await fetch(`http://localhost:8080/api/users/professor/findById/${id}`);
            const data = await response.json();
    
            setValue('professor.cpf', data.cpf);
            setValue('professor.name', data.name);
            setValue('professor.email', data.email);
            setValue('professor.password', data.password); // Se a senha for retornada
    
            // Carregar disciplinas associadas ao professor
            const disciplinasResponse = await fetch(`http://localhost:8080/api/disciplines/${id}/getDisciplines`);
            const disciplinasData = await disciplinasResponse.json();
    
            // Preencher as disciplinas no formulário
            setValue(
                'disciplina',
                disciplinasData.map((d) => ({ disciplinaId: d.id }))
            );
        } catch (error) {
            setError('Erro ao carregar dados do professor: ' + error.message);
        }
    };

    useEffect(() => {
        fetchDisciplinas();
        fetchProfessor();
    }, []);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/users/update/professor/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    professor: data.professor,
                    disciplina: data.disciplina,
                }),
            });

            if (!response.ok) throw new Error('Erro ao atualizar o professor.');

            alert('Edição realizada com sucesso!');
            navigate('/professores');
        } catch (error) {
            setError('Erro ao editar: ' + error.message);
        }
    };

    const addMateria = () => {
        setValue('disciplina', [...watch('disciplina'), { disciplinaId: '' }]);
    };

    const removeMateria = async (index) => {
        const materias = watch('disciplina');
        const disciplinaId = materias[index].disciplinaId; 
        const professorId = id; 
    
        try {
  
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/disciplines/removeAssoci`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    professorId: professorId,
                    disciplineId: disciplinaId,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao remover a disciplina.');
            }
    
            // Após remover a disciplina, remova do estado local
            setValue('disciplina', materias.filter((_, i) => i !== index));
    
            alert('Disciplina removida com sucesso!');
        } catch (error) {
            setError('Erro ao remover disciplina: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Editar Professor</h1>
                {error && <p className="error">{error}</p>}

                {/* CPF */}
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="CPF"
                        {...register('professor.cpf')}
                    />
                    <FaIdCard className="icon" />
                    {errors.professor?.cpf && <p className="error">{errors.professor.cpf.message}</p>}
                </div>

                {/* Nome */}
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Nome"
                        {...register('professor.name')}
                    />
                    <FaUser className="icon" />
                    {errors.professor?.name && <p className="error">{errors.professor.name.message}</p>}
                </div>

                {/* Email */}
                <div className="input-field">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('professor.email')}
                    />
                    <FaEnvelope className="icon" />
                    {errors.professor?.email && <p className="error">{errors.professor.email.message}</p>}
                </div>

                {/* Senha */}
                <div className="input-field">
                    <input
                        type="password"
                        placeholder="Senha (opcional)"
                        {...register('professor.password')}
                    />
                    <FaLock className="icon" />
                    {errors.professor?.password && <p className="error">{errors.professor.password.message}</p>}
                </div>

                {/* Matérias */}
                {(watch('disciplina') || []).map((materia, index) => (
                    <div className="input-field" key={index}>
                        <select
                            {...register(`disciplina.${index}.disciplinaId`)}
                            defaultValue={materia.disciplinaId}  // Preencher o valor da disciplina associada
                        >
                            <option value="">Selecione uma matéria</option>
                            {opcoesMaterias.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.disciplineName}
                                </option>
                            ))}
                        </select>
                        <FaTimes className="remove-icon" onClick={() => removeMateria(index)} />
                    </div>
                ))}
                <button type="button" onClick={addMateria} style={{ marginBottom: 20 }}>
                    <FaPlus />
                </button>

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default EditarProfessor;
