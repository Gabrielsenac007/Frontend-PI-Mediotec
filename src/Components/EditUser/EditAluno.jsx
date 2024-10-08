import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './EditUsuario.css'; // Estilo específico para edição
import { obterAluno, atualizarAluno, listarTurmas } from '../../services/api';

const EditarAluno = () => {
    const { id } = useParams(); // Pega o ID do aluno a partir da URL
    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Opcional, pode não ser editável
    const [turmas, setTurmas] = useState([]);
    const [selectedTurma, setSelectedTurma] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Busca os dados do aluno e das turmas ao carregar a tela
    useEffect(() => {
        const fetchData = async () => {
            try {
                const aluno = await obterAluno(id); // Obter informações do aluno para edição
                const turmasList = await listarTurmas();

                // Popula os campos com os dados do aluno
                setCpf(aluno.cpf || "");
                setName(aluno.name || "");
                setEmail(aluno.email || "");
                setSelectedTurma(aluno.classeId || "");

                setTurmas(turmasList); // Preenche as turmas no select
            } catch (error) {
                setError('Erro ao carregar os dados: ' + error.message);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async () => {
        const updatedData = {
            cpf,
            name,
            email,
            password: password || undefined, // Se não for alterado, mantém o valor atual
            classeId: selectedTurma,
        };
    
        try {
            await atualizarAluno(id, updatedData); // Removido 'const response ='
            alert('Aluno atualizado com sucesso!');
            navigate('/alunos'); // Redireciona para a lista de alunos após a atualização
        } catch (error) {
            setError('Erro ao atualizar o aluno: ' + error.message);
        }
    };
    

    const handleConfirm = (event) => {
        event.preventDefault();

        confirmAlert({
            title: 'Confirmação de Edição',
            message: 'Tem certeza que deseja salvar as alterações deste aluno?',
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
        <div className="editar-aluno-wrapper">
            <form onSubmit={handleConfirm} className="editar-aluno-form">
                <h1>Editar Aluno</h1>
                {error && <p className="error-message">{error}</p>}

                <div className='input-wrapper'>
                    <input
                        type="text"
                        placeholder='CPF'
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                        className="input-cpf"
                    />
                    <FaIdCard className='icon-cpf' />
                </div>

                <div className='input-wrapper'>
                    <input
                        type="text"
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-name"
                    />
                    <FaUser className='icon-name' />
                </div>

                <div className='input-wrapper'>
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-email"
                    />
                    <FaEnvelope className='icon-email' />
                </div>

                <div className='input-wrapper'>
                    <input
                        type="password"
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-password"
                    />
                    <FaLock className='icon-password' />
                </div>

                <div className='input-wrapper'>
                    <label htmlFor="turma" className="label-turma">
                        Selecione a turma:
                    </label>
                    <select
                        id="turma"
                        value={selectedTurma}
                        onChange={(e) => setSelectedTurma(e.target.value)}
                        required
                        className="select-turma"
                    >
                        <option value="">Selecione uma turma</option>
                        {turmas.map((turma) => (
                            <option key={turma.id} value={turma.id}>{turma.nameClass}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="button-save">Salvar Alterações</button>
                <button type="button" className="button-cancel" onClick={() => navigate('/alunos')}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditarAluno;
