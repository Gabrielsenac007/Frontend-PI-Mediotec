import { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPlus, FaIdCard } from 'react-icons/fa';
import './EditUsuario.css';

const EditarProfessor = () => {
    const { id } = useParams(); // Pega o ID do professor da URL
    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [materias, setMaterias] = useState([{ disciplinaId: "" }]);
    const [opcoesMaterias, setOpcoesMaterias] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Função para buscar as disciplinas disponíveis
    const fetchDisciplinas = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/disciplines/getAll');
            const data = await response.json();
            setOpcoesMaterias(data);
        } catch (error) {
            setError('Erro ao carregar disciplinas: ' + error.message);
        }
    };

    useEffect(() => {
        fetchDisciplinas();
    }, []);

    // Função para lidar com o envio do formulário de edição
    const handleSubmit = async (event) => {
        event.preventDefault();

        const professorData = {
            cpf,
            name,
            email,
            password, // A senha pode ser deixada vazia se não for necessária
            disciplinas: materias.map((materia) => ({
                disciplinaId: materia.disciplinaId,
            })),
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/users/update/professor/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(professorData),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar o professor');
            }

            alert('Edição realizada com sucesso!');
            navigate('/professores'); // Navega para a lista de professores após a edição

        } catch (error) {
            setError('Erro ao editar: ' + error.message);
        }
    };

    // Função para adicionar mais matérias no formulário
    const addMateria = () => {
        setMaterias([...materias, { disciplinaId: "" }]);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Editar Professor</h1>
                {error && <p className="error">{error}</p>}

                {/* Campo de CPF */}
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='CPF'
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                    <FaIdCard className='icon' />
                </div>

                {/* Campo de Nome */}
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <FaUser className='icon' />
                </div>

                {/* Campo de Email */}
                <div className='input-field'>
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaEnvelope className='icon' />
                </div>

                {/* Campo de Senha */}
                <div className='input-field'>
                    <input
                        type="password"
                        placeholder='Senha (opcional)'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className='icon' />
                </div>

                {/* Campo de Matérias */}
                {materias.map((materia, index) => (
                    <div className='input-field' key={index}>
                        <select
                            value={materia.disciplinaId}
                            onChange={(e) => {
                                const newMaterias = [...materias];
                                newMaterias[index].disciplinaId = e.target.value;
                                setMaterias(newMaterias);
                            }}
                            required
                        >
                            <option value="">Selecione uma matéria</option>
                            {opcoesMaterias.map((disciplina) => (
                                <option key={disciplina.id} value={disciplina.id}>
                                    {disciplina.disciplineName}
                                </option>
                            ))}
                        </select>
                        {index === materias.length - 1 && (
                            <a
                                href="#"
                                className="add-materia-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addMateria();
                                }}
                            >
                                <FaPlus />
                            </a>
                        )}
                    </div>
                ))}

                <button type="submit" className='cadastro-bnt'>Salvar</button>
            </form>
        </div>
    );
};

export default EditarProfessor;
