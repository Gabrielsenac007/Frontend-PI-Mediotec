import { useState, useEffect } from 'react';
import './ListarNotas.css'; // Renomeie o arquivo CSS se necessário

const ListarNotas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [notas, setNotas] = useState([]); // Estado para armazenar as notas
  const [unidades] = useState([ // Definindo as unidades diretamente
    { id: 'unidade1', nome: 'Unidade 1' },
    { id: 'unidade2', nome: 'Unidade 2' },
    { id: 'unidade3', nome: 'Unidade 3' },
  ]);
  const [selectedDisciplina, setSelectedDisciplina] = useState('');
  const [selectedTurma, setSelectedTurma] = useState('');
  const [selectedUnidade, setSelectedUnidade] = useState(''); // Novo estado para unidade
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDisciplinas = async () => {
    try {
      const response = await fetch('https://sis-medio-production.up.railway.app/api/disciplines/getAll');
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
      const response = await fetch('https://sis-medio-production.up.railway.app/api/classes/getAllClasses');
      if (!response.ok) {
        throw new Error('Erro ao carregar turmas');
      }
      const data = await response.json();
      setTurmas(data);
    } catch (error) {
      setError('Erro ao carregar turmas: ' + error.message);
    }
  };

  const fetchNotas = async () => {
    if (!selectedDisciplina || !selectedTurma || !selectedUnidade) {
      return; // Não faz a requisição se não tiver disciplina, turma ou unidade selecionada
    }

    // Endpoint baseado na unidade selecionada
    let endpoint;
    switch (selectedUnidade) {
      case 'unidade1':
        endpoint = `https://sis-medio-production.up.railway.app/api/concepts/conceptsOne/class/${selectedTurma}/discipline/${selectedDisciplina}`;
        break;
      case 'unidade2':
        endpoint = `https://sis-medio-production.up.railway.app/api/concepts/conceptsTwo/class/${selectedTurma}/discipline/${selectedDisciplina}`;
        break;
      case 'unidade3':
        endpoint = `https://sis-medio-production.up.railway.app/api/concepts/conceptsThree/class/${selectedTurma}/discipline/${selectedDisciplina}`;
        break;
      default:
        return; // Saia se a unidade não for válida
    }

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Erro ao carregar notas');
      }
      const data = await response.json();
      setNotas(data);
    } catch (error) {
      setError('Erro ao carregar notas: ' + error.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchDisciplinas();
      await fetchTurmas();
      setLoading(false); // Define loading como false após carregar disciplinas e turmas
    };
    loadData();
  }, []);

  useEffect(() => {
    fetchNotas(); // Busca as notas quando a disciplina, turma ou unidade é alterada
  }, [selectedDisciplina, selectedTurma, selectedUnidade]);

  return (
    <div className="notas-container">
      <h1>Listar Notas</h1>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div>
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
            <label htmlFor="unidade">Unidade:</label>
            <select
              id="unidade"
              name="unidade"
              value={selectedUnidade}
              onChange={(e) => setSelectedUnidade(e.target.value)}
            >
              <option value="">Selecione a Unidade</option>
              {unidades.map((unidade) => (
                <option key={unidade.id} value={unidade.id}>
                  {unidade.nome} {/* Substitua 'nome' pelo campo correto do seu objeto unidade */}
                </option>
              ))}
            </select>
          </div>

          <button className="bnt-ntsview" onClick={fetchNotas}>Listar Notas</button>

          {notas.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>AV1</th>
                  <th>AV2</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                {notas.map((nota) => (
                  <tr key={nota.id}> {/* Use o id da nota como chave */}
                    <td>{nota.aluno.name}</td> {/* Acesse corretamente o nome do aluno */}
                    <td>{nota.av1}</td>
                    <td>{nota.av2}</td>
                    <td>{nota.status}</td> {/* Acesse o status diretamente */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-notas">Nenhuma nota cadastrada.</div> // Mensagem quando não há notas
          )}
        </div>
      )}
    </div>
  );
};

export default ListarNotas;
