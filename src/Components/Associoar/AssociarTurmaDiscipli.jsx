import { useState, useEffect } from 'react';
import './AssociarTurmaDisciplina.css'; // Arquivo CSS para estilização
import Swal from 'sweetalert2'
import { Toast } from '../Swal';

const AssociarTurmaDisciplina = () => {
  const [turmas, setTurmas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState('');
  const [selectedDisciplina, setSelectedDisciplina] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para buscar as turmas
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

  // Função para buscar as disciplinas
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

  // Função para associar a turma à disciplina
  const handleAssociar = async () => {
    if (!selectedTurma || !selectedDisciplina) {
      setError('Por favor, selecione uma turma e uma disciplina.');
      return;
    }

    try {
      const response = await fetch('https://sis-medio-production.up.railway.app/api/classes/associateClassDiscipline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classeId: selectedTurma, disciplineId: selectedDisciplina }),
      });

      if (!response.ok) {
        throw new Error('Erro ao associar a turma à disciplina');
      }

      const result = await response.text(); // Use text() para obter a resposta como string

      // Tente analisar a string como JSON
      let message;
      try {
        const jsonResult = JSON.parse(result);
        message = jsonResult.message; // Acesse a propriedade message do JSON
      } catch  {
        message = result; // Se falhar, use a string original
      }

      Swal.fire({
        icon:'success',
        title:'Associação realizada com sucesso!',
        showConfirmButton: true,
        confirmButtonText:'Entendido',
        confirmButtonColor:'green'
      })
      // Limpar seleção
      setSelectedTurma('');
      setSelectedDisciplina('');
    } catch (error) {
      console.error(error)
        Toast.fire({
        icon:'error',
        text:'Algo deu errado no cadastro!'

      })
    }

    console.log('selectedTurma:', selectedTurma, 'selectedDisciplina:', selectedDisciplina);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchTurmas();
      await fetchDisciplinas();
      setLoading(false); // Define loading como false após carregar turmas e disciplinas
    };
    loadData();
  }, []);

  return (
    <div className="associar-container">
      <h1>Associar Turma à Disciplina</h1>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div>
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

          <button className="btn-associar" onClick={handleAssociar}>Associar</button>
        </div>
      )}
    </div>
  );
};

export default AssociarTurmaDisciplina;
