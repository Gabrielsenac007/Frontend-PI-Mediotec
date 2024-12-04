import { useEffect, useState } from 'react';
import axios from 'axios';
import './Comunicados.css';

const ListaComunicados = () => {
  const [comunicados, setComunicados] = useState([]);

  useEffect(() => {
    fetchComunicados();
  }, []);

  const fetchComunicados = async () => {
    try {
      const response = await axios.get('https://sis-medio-production.up.railway.app/api/statement/getAllStatements');
      setComunicados(response.data); // Assume que a resposta é uma lista de comunicados
    } catch (error) {
      console.error('Erro ao buscar os comunicados:', error);
    }
  };

  return (
    <div className="notices-container">
      <h1>Lista de Comunicados</h1>
      <div className="comunicados-list">
        {comunicados.length > 0 ? (
          comunicados.map((comunicado) => (
            <div key={comunicado.id} className="notice-item">
              <div className="notice-header">
                <h3>{comunicado.title}</h3>
                
              </div>
              <p className="notice-content">{comunicado.content}</p>
              <p className="notice-creator">
                <strong>Criador:</strong> {comunicado.creator.name || "Desconhecido"}
              </p>
              <p className="notice-date">
                <strong>Data de Criação:</strong> {new Date(comunicado.creationDate).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="no-notices">Nenhum comunicado encontrado.</p>
        )}
      </div>
      <div className="btn-add-notice">
        <button>Adicionar Comunicado</button>
      </div>
    </div>
  );
};

export default ListaComunicados;
