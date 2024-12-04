import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './CadastroNotas.css';

// Definição do schema Zod para validação dos campos
const schema = z.object({
  disciplina: z.string().nonempty('Disciplina é obrigatória'),
  unidade: z.string().nonempty('Unidade é obrigatória'),
  turma: z.string().nonempty('Turma é obrigatória'),
  aluno: z.string().nonempty('Aluno é obrigatório'),
  atributo1: z.string().nonempty('Atributo 1 é obrigatório'),
  atributo2: z.string().nonempty('Atributo 2 é obrigatório'),
  situacao: z.string().nonempty('Situação é obrigatória'),
});

const CadastroNotas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]); // Deve ser um array
  const [filteredAlunos, setFilteredAlunos] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState(''); // Estado para armazenar a turma selecionada
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Função para carregar os dados das APIs
  const fetchData = async () => {
    try {
      const [disciplinasResponse, turmasResponse, alunosResponse] = await Promise.all([
        fetch('https://sis-medio-production.up.railway.app/api/disciplines/getAll'),
        fetch('https://sis-medio-production.up.railway.app/api/classes/getAllClasses'),
        fetch('https://sis-medio-production.up.railway.app/api/users/allStudents'),
      ]);

      if (!disciplinasResponse.ok) throw new Error('Erro ao carregar disciplinas');
      if (!turmasResponse.ok) throw new Error('Erro ao carregar turmas');
      if (!alunosResponse.ok) throw new Error('Erro ao carregar alunos');

      const disciplinasData = await disciplinasResponse.json();
      const turmasData = await turmasResponse.json();
      const alunosData = await alunosResponse.json();

      setDisciplinas(disciplinasData);
      setTurmas(turmasData);
      setAlunos(alunosData);
    } catch (error) {
      setError('Erro ao carregar dados: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if (selectedTurma) {
      const alunosFiltrados = alunos.filter(aluno => aluno.studentClass?.id === selectedTurma);
      setFilteredAlunos(alunosFiltrados);
    } else {
      setFilteredAlunos([]);  
    }
  }, [selectedTurma, alunos]); 

  const onSubmit = async (data) => {
    setError('');
    const { disciplina, unidade, turma, aluno, atributo1, atributo2, situacao } = data;
    

    const dados = {
      av1: atributo1,
      av2: atributo2,
      status: situacao,
      nf: unidade,
      alunoId: aluno,
      disciplineId: disciplina,
    };
    console.log(dados)
    const insertionEndpoints = {
      ud1: 'https://sis-medio-production.up.railway.app/api/concepts/insertConceptUnitOne',
      ud2: 'https://sis-medio-production.up.railway.app/api/concepts/insertConceptUnitTwo',
      ud3: 'https://sis-medio-production.up.railway.app/api/concepts/insertConceptUnitThree',
    };

    const insertionEndpoint = insertionEndpoints[unidade];

    if (!insertionEndpoint) {
      setError('Unidade não suportada.');
      return;
    }

    try {
      const response = await fetch(insertionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar notas');

      setIsSubmitted(true);
      reset(); // Limpa o formulário após a submissão
    } catch (error) {
      setError('Erro ao cadastrar notas: ' + error.message);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      alert('Notas cadastradas com sucesso!');
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  return (
    <div className="notas-container">
      <h1>Cadastro de Notas</h1>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="top-row">
            <div className="form-group">
              <label htmlFor="disciplina">Disciplina:</label>
              <Controller
                name="disciplina"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Selecione a Disciplina</option>
                    {disciplinas.map((disciplina) => (
                      <option key={disciplina.id} value={disciplina.id}>
                        {disciplina.disciplineName}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.disciplina && <span className="error-text">{errors.disciplina.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="unidade">Unidade:</label>
              <Controller
                name="unidade"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Selecione a Unidade</option>
                    <option value="ud1">UD1</option>
                    <option value="ud2">UD2</option>
                    <option value="ud3">UD3</option>
                  </select>
                )}
              />
              {errors.unidade && <span className="error-text">{errors.unidade.message}</span>}
            </div>
          </div>

          <div className="bottom-row">
            <div className="form-group">
              <label htmlFor="turma">Turma:</label>
              <Controller
                name="turma"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => {
                      setValue('turma', e.target.value);
                      setSelectedTurma(e.target.value); // Atualiza o estado selectedTurma
                    }}
                  >
                    <option value="">Selecione a Turma</option>
                    {turmas.map((turma) => (
                      <option key={turma.id} value={turma.id}>
                        {turma.nameClass}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.turma && <span className="error-text">{errors.turma.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="aluno">Aluno:</label>
              <Controller
                name="aluno"
                control={control}
                render={({ field }) => (
                  <select {...field} disabled={!filteredAlunos.length}>
                    <option value="">Selecione o Aluno</option>
                    {filteredAlunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.name} - {aluno.studentClass?.nameClass || 'Sem turma'}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.aluno && <span className="error-text">{errors.aluno.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="atributo1">AV1:</label>
              <Controller
                name="atributo1"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Selecione o Atributo</option>
                    <option value="A">A</option>
                    <option value="PA">PA</option>
                    <option value="NA">NA</option>
                  </select>
                )}
              />
              {errors.atributo1 && <span className="error-text">{errors.atributo1.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="atributo2">AV2:</label>
              <Controller
                name="atributo2"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Selecione o Atributo</option>
                    <option value="A">A</option>
                    <option value="PA">PA</option>
                    <option value="NA">NA</option>
                  </select>
                )}
              />
              {errors.atributo2 && <span className="error-text">{errors.atributo2.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="situacao">Situação:</label>
              <Controller
                name="situacao"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Selecione a Situação</option>
                    <option value="D">Deferido</option>
                    <option value="ND">Não Deferido</option>
                  </select>
                )}
              />
              {errors.situacao && <span className="error-text">{errors.situacao.message}</span>}
            </div>
          </div>

          <button type="submit">Cadastrar Notas</button>
        </form>
      )}
    </div>
  );
};

export default CadastroNotas;
