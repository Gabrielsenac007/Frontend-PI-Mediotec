import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './EditUsuario.css'; // Importa o CSS da tela de edição de aluno
import { atualizarTurma } from '../../services/api'; // Importe as funções de API necessárias

const EditarTurma = () => {
    const { id } = useParams(); // Pega o ID da turma a partir da URL
    const [nameClass, setNameClass] = useState("");
    const [schoolYear, setSchoolYear] = useState("");
    const [shift, setShift] = useState("");
    const [semester, setSemester] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Função para lidar com o envio do formulário
    const handleSubmit = async () => {
        const updatedData = {
            nameClass,
            schoolYear,
            shift,
            semester,
        };

        try {
            await atualizarTurma(id, updatedData); // Atualiza a turma
            alert('Turma atualizada com sucesso!');
            navigate('/turmas'); // Redireciona para a lista de turmas após a atualização
        } catch (error) {
            setError('Erro ao atualizar a turma: ' + error.message);
        }
    };

    const handleConfirm = (event) => {
        event.preventDefault();

        confirmAlert({
            title: 'Confirmação de Edição',
            message: 'Tem certeza que deseja salvar as alterações desta turma?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => handleSubmit()
                },
                {
                    label: 'Não',
                    onClick: () => {}
                }
            ]
        });
    };

    return (
        <div className="container"> {/* Altere a classe para corresponder ao CSS existente */}
            <form onSubmit={handleConfirm} >
                <h1>Editar Turma</h1>
                {error && <p className="error-message">{error}</p>}

                <div className='input-wrapper'>
                    <input
                        type="text"
                        placeholder='Nome da Turma'
                        value={nameClass}
                        onChange={(e) => setNameClass(e.target.value)}
                        required
                        className="input-nameClass"
                    />
                </div>

                <div className='input-wrapper'>
                    <input
                        type="text"
                        placeholder='Ano Letivo'
                        value={schoolYear}
                        onChange={(e) => setSchoolYear(e.target.value)}
                        required
                        className="input-schoolYear"
                    />
                </div>

                <div className='input-wrapper'>
                    <input
                        type="text"
                        placeholder='Turno (ex: Matutino, Vespertino)'
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                        required
                        className="input-shift"
                    />
                </div>

                <div className='input-wrapper'>
                    <input
                        type="text"
                        placeholder='Semestre (ex: 1, 2)'
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        required
                        className="input-semester"
                    />
                </div>

                <button type="submit" className="button-save">Salvar Alterações</button>
                <button type="button" className="button-cancel" onClick={() => navigate('/turmas')}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditarTurma;
