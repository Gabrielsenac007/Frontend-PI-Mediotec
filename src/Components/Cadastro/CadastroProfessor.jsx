import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPlus, FaIdCard } from 'react-icons/fa';
import './Cadastro.css';


const Cadastro = () => {
    const [cpf, setCpf] = useState(""); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [materias, setMaterias] = useState([{ disciplinaId: "" }]);
    const [opcoesMaterias, setOpcoesMaterias] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();


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


    const handleSubmit = async (event) => {
        event.preventDefault();

        const professorData = {
            professor: {
                cpf : cpf, 
                name: name,
                email: email,
                password: password
            },
            disciplina: materias.map(materia => ({ disciplinaId: materia.disciplinaId })) 
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/register/professor', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(professorData)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar o professor');
            }

            alert('Cadastro realizado com sucesso!');
            navigate('/usuarios'); 

        } catch (error) {
            setError('Erro ao cadastrar: ' + error.message);
        }
    };

    const addMateria = () => {
        setMaterias([...materias, { disciplinaId: "" }]); 
    };



    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Cadastro de Professor</h1>
                {error && <p className="error">{error}</p>}

                {/* Campo de CPF antes do Nome */}
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='CPF'
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                    <FaIdCard className='icon' /> {/* Ícone de CPF */}
                </div>

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

                <div className='input-field'>
                    <input
                        type="password"
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>

                {/* Campo de matérias como select */}
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

                <button type="submit" className='cadastro-bnt'>Cadastrar</button>
            </form>
        </div>
    );
};

export default Cadastro;
