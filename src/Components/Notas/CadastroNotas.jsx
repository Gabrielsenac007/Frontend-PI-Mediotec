import { useState, useEffect } from 'react';
import './CadastroNotas.css';

const CadastroNotas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]); // Deve ser um array
  const [filteredAlunos, setFilteredAlunos] = useState([]);
  const [selectedDisciplina, setSelectedDisciplina] = useState('');
  const [selectedUnidade, setSelectedUnidade] = useState('');
  const [selectedTurma, setSelectedTurma] = useState('');
  const [selectedAluno, setSelectedAluno] = useState('');
  const [atributo1, setAtributo1] = useState('');
  const [atributo2, setAtributo2] = useState('');
  const [situacao, setSituacao] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchData = async () => {
    try {
      const [disciplinasResponse, turmasResponse, alunosResponse] = await Promise.all([
        fetch('https://sam-light-production.up.railway.app/api/disciplines/getAll'),
        fetch('https://sam-light-production.up.railway.app/api/classes/getAllClasses'),
        fetch('https://sam-light-production.up.railway.app/api/users/allStudents')
      ]);
  
      if (!disciplinasResponse.ok) throw new Error('Erro ao carregar disciplinas');
      if (!turmasResponse.ok) throw new Error('Erro ao carregar turmas');
      if (!alunosResponse.ok) throw new Error('Erro ao carregar alunos');
  
      const disciplinasData = await disciplinasResponse.json();
      const turmasData = await turmasResponse.json();
      const alunosData = await alunosResponse.json();
  
      console.log('Disciplinas:', disciplinasData);
      console.log('Turmas:', turmasData);
      console.log('Alunos:', alunosData); // Log para verificar estrutura
  
      // Verifica a estrutura de alunosData
      if (Array.isArray(alunosData.usersList)) {
        setAlunos(alunosData.usersList); // Ajuste aqui para acessar usersList
      } else {
        console.error('Dados de alunos não são um array:', alunosData);
        setAlunos([]); // Define como array vazio se não for um array
      }
  
      setDisciplinas(disciplinasData);
      setTurmas(turmasData);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!selectedDisciplina || !selectedUnidade || !selectedTurma || !selectedAluno) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dados = {
      av1: atributo1,
      av2: atributo2,
      status: situacao,
      nf: selectedUnidade,
      alunoId: selectedAluno,
      disciplineId: selectedDisciplina,
    };

    const insertionEndpoints = {
      ud1: 'https://sam-light-production.up.railway.app/api/concepts/insertConceptUnitOne',
      ud2: 'https://sam-light-production.up.railway.app/api/concepts/insertConceptUnitTwo',
      ud3: 'https://sam-light-production.up.railway.app/api/concepts/insertConceptUnitThree',
    };

    const insertionEndpoint = insertionEndpoints[selectedUnidade];

    if (!insertionEndpoint) {
      setError('Unidade não suportada.');
      return;
    }

    try {
      const insertionResponse = await fetch(insertionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!insertionResponse.ok) throw new Error('Erro ao inserir conceito');

      console.log('Dados cadastrados com sucesso:', dados);
      setIsSubmitted(true); 

      // Resetar campos após a inserção
      setSelectedDisciplina('');
      setSelectedUnidade('');
      setSelectedTurma('');
      setSelectedAluno('');
      setAtributo1('');
      setAtributo2('');
      setSituacao('');
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
        <form onSubmit={handleSubmit}>
          <div className="top-row">
            <div className="form-group">
              <label htmlFor="disciplina">Disciplina:</label>
              <select
                id="disciplina"
                name="disciplina"
                value={selectedDisciplina}
                onChange={(e) => setSelectedDisciplina(e.target.value)}
              >
                <option value="">Selecione a Disciplina</option>
                {disciplinas.map((disciplina) => (
                  <option key={disciplina.id} value={disciplina.id}>
                    {disciplina.disciplineName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="unidade">Unidade:</label>
              <select
                id="unidade"
                name="unidade"
                value={selectedUnidade}
                onChange={(e) => setSelectedUnidade(e.target.value)}
              >
                <option value="">Selecione a Unidade</option>
                <option value="ud1">UD1</option>
                <option value="ud2">UD2</option>
                <option value="ud3">UD3</option>
              </select>
            </div>
          </div>

          <div className="bottom-row">
            <div className="form-group">
              <label htmlFor="turma">Turma:</label>
              <select
                id="turma"
                name="turma"
                value={selectedTurma}
                onChange={(e) => setSelectedTurma(e.target.value)}
              >
                <option value="">Selecione a Turma</option>
                {turmas.map((turma) => (
                  <option key={turma.id} value={turma.id}>
                    {turma.nameClass}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="aluno">Aluno:</label>
              <select
                id="aluno"
                name="aluno"
                value={selectedAluno}
                onChange={(e) => setSelectedAluno(e.target.value)}
                disabled={!selectedTurma}
              >
                <option value="">Selecione o Aluno</option>
                {filteredAlunos.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.name} - {aluno.studentClass?.nameClass || 'Sem turma'}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="atributo1">AV1:</label>
              <select
                id="atributo1"
                name="atributo1"
                value={atributo1}
                onChange={(e) => setAtributo1(e.target.value)}
              >
                <option value="">Selecione o Atributo</option>
                <option value="A">A</option>
                <option value="PA">PA</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="atributo2">AV2:</label>
              <select
                id="atributo2"
                name="atributo2"
                value={atributo2}
                onChange={(e) => setAtributo2(e.target.value)}
              >
                <option value="">Selecione o Atributo</option>
                <option value="A">A</option>
                <option value="PA">PA</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="situacao">Situação:</label>
              <select
                id="situacao"
                name="situacao"
                value={situacao}
                onChange={(e) => setSituacao(e.target.value)}
              >
                <option value="">Selecione a Situação</option>
                <option value="A">A</option>
                <option value="PA">PA</option>
                <option value="NA">NA</option>
              </select>
            </div>
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      )}
    </div>
  );
};

export default CadastroNotas;
