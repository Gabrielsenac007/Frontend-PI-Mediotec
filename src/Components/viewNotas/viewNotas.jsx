import { useState, useEffect } from 'react';
import './ListarNotas.css'; // Renomeie o arquivo CSS se necessário

const ListarNotas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState([]); // Estado para armazenar as notas
  const [selectedDisciplina, setSelectedDisciplina] = useState('');
  const [selectedTurma, setSelectedTurma] = useState('');
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

  const fetchNotas = async () => {
    if (!selectedDisciplina || !selectedTurma) {
      return; // Não faz a requisição se não tiver disciplina ou turma selecionada
    }

    try {
      const response = await fetch(`http://localhost:8080/api/concepts/getNotes?disciplinaId=${selectedDisciplina}&turmaId=${selectedTurma}`);
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
    fetchDisciplinas();
    fetchTurmas();
    setLoading(false); // Para simular o carregamento
  }, []);

  useEffect(() => {
    fetchNotas(); // Busca as notas quando a disciplina ou turma é alterada
  }, [selectedDisciplina, selectedTurma]);

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

          <button onClick={fetchNotas}>Listar Notas</button>

          {notas.length > 0 && (
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
                  <tr key={nota.alunoId}>
                    <td>{nota.nomeAluno}</td>
                    <td>{nota.av1}</td>
                    <td>{nota.av2}</td>
                    <td>{nota.situacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ListarNotas;
