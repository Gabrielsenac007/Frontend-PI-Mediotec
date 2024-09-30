import { useState} from 'react';
import './Comunicados.css'; // Importar o CSS para estilização

const Comunicados = () => {
    // Estado para armazenar os comunicados
    const [notices, setNotices] = useState([]);
    const [newNotice, setNewNotice] = useState("");

    // Função para adicionar um novo comunicado
    const handleAddNotice = () => {
        if (newNotice.trim()) {
            const notice = {
                id: Date.now(), // Gera um ID único para o comunicado
                text: newNotice,
                date: new Date().toLocaleDateString(),
            };
            setNotices([notice, ...notices]); // Adiciona o novo comunicado ao início da lista
            setNewNotice(""); // Limpa o campo de entrada
        }
    };

    // Função para excluir um comunicado
    const handleDeleteNotice = (id) => {
        setNotices(notices.filter((notice) => notice.id !== id));
    };

    return (
        <div className="notices-container">
            <h1>Comunicados</h1>
            <div className="notice-form">
                <input
                    type="text"
                    value={newNotice}
                    onChange={(e) => setNewNotice(e.target.value)}
                    placeholder="Digite um novo comunicado"
                    className="input-notice"
                />
                <button onClick={handleAddNotice} className="btn-add-notice">
                    Adicionar
                </button>
            </div>
            <div className="notice-list">
                {notices.length > 0 ? (
                    notices.map((notice) => (
                        <div key={notice.id} className="notice-item">
                            <p>{notice.text}</p>
                            <span>{notice.date}</span>
                            <button
                                onClick={() => handleDeleteNotice(notice.id)}
                                className="btn-delete-notice"
                            >
                                Excluir
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-notices">Nenhum comunicado disponível</p>
                )}
            </div>
        </div>
    );
};

export default Comunicados;
