import { useState, useEffect } from 'react';
import './CadastroNotas.css';

const CadastroNotas = () => {
  // Estados para armazenar as disciplinas, turmas, alunos e dados
  const [disciplinas, setDisciplinas] = useState([]);
  const [turmas, setTurmas] = useState([]); // Estado para turmas
  const [alunos, setAlunos] = useState([]); // Estado para alunos
  const [selectedDisciplina, setSelectedDisciplina] = useState('');
  const [selectedUnidade, setSelectedUnidade] = useState('');
  const [selectedTurma, setSelectedTurma] = useState('');
  const [selectedAluno, setSelectedAluno] = useState('');
  const [atributo1, setAtributo1] = useState('');
  const [atributo2, setAtributo2] = useState('');
  const [situacao, setSituacao] = useState('');
  const [error, setError] = useState(''); // Estado para armazenar erros
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Função para buscar disciplinas
  const fetchDisciplinas = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/disciplines/getAll');
      if (!response.ok) {
        throw new Error('Erro ao carregar disciplinas');
      }
      const data = await response.json();
      setDisciplinas(data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      setError('Erro ao carregar disciplinas: ' + error.message);
    }
  };

  // Função para buscar turmas
  const fetchTurmas = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/classes/getAllClasses'); // URL da API para turmas
      if (!response.ok) {
        throw new Error('Erro ao carregar turmas');
      }
      const data = await response.json();
      setTurmas(data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      setError('Erro ao carregar turmas: ' + error.message);
    }
  };

  // Função para buscar alunos
  const fetchAlunos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/allStudents'); // URL da API para alunos
      if (!response.ok) {
        throw new Error('Erro ao carregar alunos');
      }
      const data = await response.json();
      setAlunos(data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      setError('Erro ao carregar alunos: ' + error.message);
    } finally {
      setLoading(false); // Define loading como false ao final da operação
    }
  };

  useEffect(() => {
    fetchDisciplinas();
    fetchTurmas();
    fetchAlunos();
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita o recarregamento da página
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

    console.log('Dados cadastrados:', dados);
    // Aqui você pode implementar a lógica para enviar os dados para o servidor
  };

  return (
    <div className="notas-container">
      <h1>Cadastro de Notas</h1>
      {error && <div className="error">{error}</div>} {/* Exibe mensagem de erro */}
      {loading ? (
        <div>Carregando...</div> // Mensagem de carregamento
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Linha superior com Disciplina e Unidade */}
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
                    {disciplina.disciplineName} {/* Usando disciplineName para exibir o nome */}
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
              </select>
            </div>
          </div>

          {/* Linha inferior com Turma, Aluno, Atributos e Situação */}
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
                  <option key={turma.id} value={turma.id}> {/* Ajuste conforme a estrutura dos dados */}
                    {turma.nome} {/* Ajuste conforme a estrutura dos dados */}
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
              >
                <option value="">Selecione o Aluno</option>
                {alunos.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}> {/* Ajuste conforme a estrutura dos dados */}
                    {aluno.nome} {/* Ajuste conforme a estrutura dos dados */}
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
                <option value="d">D</option>
                <option value="nd">ND</option>
              </select>
            </div>
          </div>

          <button type="submit" className="cadastro-button">
            Cadastrar Notas
          </button>
        </form>
      )}
    </div>
  );
};

export default CadastroNotas;
