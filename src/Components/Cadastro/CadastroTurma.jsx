import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css'; // Certifique-se de ter um arquivo CSS correspondente para o estilo
import { cadastrarTurma } from '../../services/api'; // Importe a função de cadastro da sua API
import Swal from 'sweetalert2'
import { Toast } from '../Swal';

const CadastroTurma = () => {
    // Estados para os campos da turma
    const [nameClass, setNameClass] = useState("");
    const [schoolYear, setSchoolYear] = useState("");
    const [shift, setShift] = useState("");
    const [semester, setSemester] = useState("");
    const [error] = useState("");
    const navigate = useNavigate(); // Para redirecionar após o cadastro

    // Função para lidar com o envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault();

        const turmaData = {
            nameClass,
            schoolYear,
            shift,
            semester,
        };

        try {
            // Envia os dados para a API e realiza o cadastro
            await cadastrarTurma(turmaData);
            Swal.fire({
                icon:'success',
                title:'Cadastro realizado com sucesso!',
                showConfirmButton: true,
                confirmButtonText:'Entendido',
                confirmButtonColor:'green'
            })
            navigate('/turmas'); // Redireciona para a lista de turmas ou outra página desejada
        } catch (error) {
            console.error(error)
            Toast.fire({
                icon:'error',
                text:'Algo deu errado no cadastro!'
        
              })
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Cadastro de Turma</h1>
                {error && <p className="error">{error}</p>}
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='Nome da Turma'
                        value={nameClass}
                        onChange={(e) => setNameClass(e.target.value)}
                        required
                    />
                </div>
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='Ano Letivo'
                        value={schoolYear}
                        onChange={(e) => setSchoolYear(e.target.value)}
                        required
                    />
                </div>
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='Turno (ex: Matutino, Vespertino)'
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                        required
                    />
                </div>
                <div className='input-field'>
                    <input
                        type="text"
                        placeholder='Semestre (ex: 1, 2)'
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastroTurma;
