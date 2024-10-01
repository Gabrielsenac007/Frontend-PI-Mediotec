import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css'; // Certifique-se de ter um arquivo CSS correspondente para o estilo
import { cadastrarDisciplina } from '../../services/api'; // Importe a função de cadastro da sua API

const CadastroDisciplina = () => {
    // Estados para os campos de disciplina
    const [disciplineName, setDisciplineName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Para redirecionar após o cadastro

    // Função para lidar com o envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault();

        const disciplinaData = {
            disciplineName,
            description,
        };

        try {
            // Envia os dados para a API e realiza o cadastro
            await cadastrarDisciplina(disciplinaData);
            alert('Disciplina cadastrada com sucesso!');
            navigate('/disciplinas'); // Redireciona para a lista de disciplinas ou outra página desejada
        } catch (error) {
            setError('Erro ao cadastrar a disciplina: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Cadastro de Disciplina</h1>
                {error && <p className="error">{error}</p>}
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='Nome da Disciplina'
                        value={disciplineName}
                        onChange={(e) => setDisciplineName(e.target.value)}
                        required
                    />
                </div>
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='Descrição'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastroDisciplina;
