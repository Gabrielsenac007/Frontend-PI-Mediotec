import { useState } from 'react';
import './CadastroNotas.css'; // Certifique-se de criar um arquivo CSS para estilizar

const CadastroNotas = () => {
    const [notas, setNotas] = useState([{ disciplina: '', nota: '' }, { disciplina: '', nota: '' }, { disciplina: '', nota: '' }]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedNotas = [...notas];
        updatedNotas[index][name] = value;
        setNotas(updatedNotas);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Notas cadastradas:', notas);
        // Aqui você pode implementar a lógica para enviar as notas para o servidor ou outra ação
    };

    return (
        <div className="cadastro-notas">
            <h1>Cadastro de Notas</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Disciplina</th>
                            <th>Nota</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map((nota, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        name="disciplina"
                                        value={nota.disciplina}
                                        onChange={(event) => handleChange(index, event)}
                                        placeholder="Nome da Disciplina"
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="nota"
                                        value={nota.nota}
                                        onChange={(event) => handleChange(index, event)}
                                        placeholder="Nota"
                                        required
                                        min="0"
                                        max="10"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit">Cadastrar Notas</button>
            </form>
        </div>
    );
};

export default CadastroNotas;
