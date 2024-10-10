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
  const [isSubmitted, setIsSubmitted] = useState(false); // Estado para controle de submissão

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
      av1: atributo1,
      av2: atributo2,
      status: situacao,
      nf: selectedUnidade,
      alunoId: selectedAluno,
      disciplineId: selectedDisciplina,
    };

    let insertionEndpoint = '';

    switch (selectedUnidade) {
      case 'ud1':
        insertionEndpoint = 'http://localhost:8080/api/concepts/insertConceptUnitOne'; // POST
        break;
      case 'ud2':
        insertionEndpoint = 'http://localhost:8080/api/concepts/insertConceptUnitTwo'; // POST
        break;
      case 'ud3':
        insertionEndpoint = 'http://localhost:8080/api/concepts/insertConceptUnitThree'; // POST
        break;
      default:
        setError('Unidade não suportada.');
        return;
    }

    try {
      const insertionResponse = await fetch(insertionEndpoint, {
        method: 'POST', // Mudando de PUT para POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!insertionResponse.ok) {
        throw new Error('Erro ao inserir conceito');
      }

      console.log('Dados cadastrados com sucesso:', dados);
      setIsSubmitted(true); // Define isSubmitted como true para mostrar o pop-up

      // Limpar os campos após a inserção bem-sucedida
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

  // Exibe o pop-up de confirmação se isSubmitted for true
  useEffect(() => {
    if (isSubmitted) {
      alert('Notas cadastradas com sucesso!');
      setIsSubmitted(false); // Reseta isSubmitted após o alerta
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
                <option value="D">D</option>
                <option value="ND">ND</option>
              </select>
            </div>
          </div>

          <button className= "bnt-cadastro"type="submit" >Cadastrar Notas</button>
        </form>
      )}
    </div>
  );
};

export default CadastroNotas;



