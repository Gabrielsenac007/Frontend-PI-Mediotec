import { useState, useEffect } from 'react';
import './CadastroNotas.css';

const CadastroNotas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
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

  const fetchDisciplinas = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/disciplines/getAll');
      if (!response.ok) {
        throw new Error('Erro ao carregar disciplinas');
      }
      const data = await response.json();
      setDisciplinas(data);
    } catch (error) {
      setError('Erro ao carregar disciplinas: ' + error.message);
    }
  };

  const fetchTurmas = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/classes/getAllClasses');
      if (!response.ok) {
        throw new Error('Erro ao carregar turmas');
      }
      const data = await response.json();
      setTurmas(data);
    } catch (error) {
      setError('Erro ao carregar turmas: ' + error.message);
    }
  };

  const fetchAlunos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/allStudents');
      if (!response.ok) {
        throw new Error('Erro ao carregar alunos');
      }
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      setError('Erro ao carregar alunos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
    fetchTurmas();
    fetchAlunos();
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
      disciplina: selectedDisciplina,
      unidade: selectedUnidade,
      turma: selectedTurma,
      aluno: selectedAluno,
      atributo1,
      atributo2,
      situacao,
    };

    let creationEndpoint = '';
    let insertionEndpoint = '';

    // Verifica a unidade selecionada e define os endpoints correspondentes
    switch (selectedUnidade) {
      case 'ud1':
        insertionEndpoint = 'http://localhost:8080/api/concepts/insertConceptUnitOne';
        break;
      case 'ud2':
        creationEndpoint = 'http://localhost:8080/api/concepts/creteConceptUnitTwo';
        insertionEndpoint = 'http://localhost:8080/api/concepts/insertConceptUnitTwo';
        break;
      case 'ud3':
        creationEndpoint = 'http://localhost:8080/api/concepts/creteConceptUnitThree';
        insertionEndpoint = 'http://localhost:8080/api/concepts/insertConceptUnitThree';
        break;
      default:
        setError('Unidade não suportada.');
        return;
    }

    try {
      // Requisição para criar o conceito (por exemplo, inicialização)
      const creationResponse = await fetch(creationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!creationResponse.ok) {
        throw new Error('Erro ao criar conceito');
      }

      // Requisição para inserir o conceito
      const insertionResponse = await fetch(insertionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!insertionResponse.ok) {
        throw new Error('Erro ao inserir conceito');
      }

      console.log('Dados cadastrados com sucesso:', dados);
    } catch (error) {
      setError('Erro ao cadastrar notas: ' + error.message);
    }
  };

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
                    {aluno.name}
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
                <option value="a">A</option>
                <option value="pa">PA</option>
                <option value="na">NA</option>
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
                <option value="a">A</option>
                <option value="pa">PA</option>
                <option value="na">NA</option>
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
                <option value="aprovado">D</option>
                <option value="reprovado">ND</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Cadastrar
          </button>
        </form>
      )}
    </div>
  );
};

export default CadastroNotas;
