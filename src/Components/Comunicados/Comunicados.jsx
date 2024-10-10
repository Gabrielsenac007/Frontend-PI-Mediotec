import { useState } from 'react';
import axios from 'axios';
import './Comunicados.css';

const Comunicados = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Estado para controle do pop-up

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAddComunicado = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const creatorId = localStorage.getItem('id');
      const response = await axios.post('http://localhost:8080/api/statement/insertStatement', {
        title: title,
        content: content,
        creatorId: creatorId,
      });

      // Exibe o pop-up com a mensagem de sucesso
      setMessage(response.data.message); // Supondo que a resposta tenha um campo 'message'
      setShowPopup(true); // Ativa o pop-up

      // Limpa os campos após o envio
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Erro ao enviar o comunicado:', error);
      setMessage('Erro ao enviar o comunicado');
      setShowPopup(true); // Ativa o pop-up mesmo em caso de erro
    } finally {
      setLoading(false);
    }
  };

  // Função para fechar o pop-up
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="notices-container">
      <h1>Comunicados</h1>
      <form className="notice-form" onSubmit={handleAddComunicado}>
        <input
          type="text"
          className="input-notice"
          placeholder="Digite o título do comunicado..."
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          className="input-content"
          placeholder="Digite o conteúdo do comunicado..."
          value={content}
          onChange={handleContentChange}
          rows="4"
        ></textarea>
        <button type="submit" className="btn-add-notice" disabled={loading}>
          {loading ? 'Adicionando...' : 'Adicionar Comunicado'}
        </button>
      </form>

      {/* Pop-up de confirmação */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="popup-message">{message}</span>
            <button onClick={handleClosePopup} className="btn-close-popup">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comunicados;
