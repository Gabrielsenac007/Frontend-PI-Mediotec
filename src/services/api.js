// api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Cria uma instância do Axios
const api = axios.create({
    baseURL: API_URL,
});

// Adiciona um interceptor para incluir o token em todas as requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // Obtém o token do localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token ao cabeçalho
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Função para buscar todos os alunos
export const fetchAlunos = async () => {
    try {
        const response = await api.get('/users/allStudents'); // Usa a instância do Axios
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para deletar um aluno
export const deleteAluno = async (id) => {
    try {
        await api.delete(`http://localhost:8080/api/users/delete/student/${id}`); // Usa a instância do Axios
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para buscar todos os professores
export const fetchProfessores = async () => {
    try {
        const response = await api.get('http://localhost:8080/api/users/allProfessor'); // Usa a instância do Axios e o endpoint correto
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para deletar um professor
export const deleteProfessor = async (id) => {
    try {
        await api.delete(`http://localhost:8080/api/users/delete/professor/${id}`);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para buscar um aluno específico pelo ID
export const fetchUsuario = async (id) => {
    try {   
        const response = await api.get(`/${id}`); // Usa a instância do Axios
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};


// Cadastrar aluno
export const cadastrarAluno = async (alunoData) => {
    try {
        const response = await api.post('http://localhost:8080/api/users/register/student', alunoData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Se aplicável
                'Content-Type': 'application/json' // Opcional
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};


// Função para atualizar um aluno
export const atualizarAluno = async (id, updatedData) => {
    try {
        const response = await api.put(`http://localhost:8080/api/users/update/student/${id}`, updatedData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para obter um aluno pelo ID
export const obterAluno = async (id) => {
    try {
        const response = await api.get(`http://localhost:8080/api/users/students/class/${id}`); // Ajuste o endpoint conforme necessário
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};



// Função para autenticar usuário
export const autenticarUsuario = async (cpf, password) => {
    try {
        const response = await api.post('/auth/login', {
            cpf: cpf,
            senha: password,
        });
        return response.data; // Retorna os dados do usuário autenticado
    } catch (error) {
        throw new Error('Erro ao autenticar: ' + error.response?.data?.message || error.message);
    }
};


// Função para cadastrar coordenador
export const cadastrarCoordenador = async (dados) => {
    try {
        const response = await api.post('http://localhost:8080/api/users/register/coordinator', dados, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Se aplicável
                'Content-Type': 'application/json' // Opcional
            }
        });

        // Axios sempre resolve a promessa em caso de resposta com erro, então não é necessário verificar response.ok
        console.log('Resposta do servidor:', response.data); // Log da resposta do servidor
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        // Para Axios, o erro contém a resposta no objeto error.response
        if (error.response) {
            console.error('Erro na resposta do servidor:', error.response.data);
            throw new Error(`Erro ao cadastrar coordenador: ${error.response.data}`);
        } else {
            console.error('Erro:', error.message);
            throw error; // Propague o erro
        }
    }
};




// Função para buscar coordenadores
export const fetchCoordenadores = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/users/allCoordenador', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Se você estiver usando autenticação com token
            },
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao buscar coordenadores: ${response.statusText}`);
        }

        const data = await response.json(); // Converte a resposta para JSON
        return data; // Retorna os dados
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error; // Propaga o erro para ser tratado onde a função é chamada
    }
};


// Função para atualizar um coordenador
export const editarCoordenador = async (id, coordenadorData) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/update/coordinator/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coordenadorData),
        });

        // Captura a resposta como texto para verificar o conteúdo
        const textResponse = await response.text();

        // Se a resposta não for bem-sucedida, lança um erro com a mensagem apropriada
        if (!response.ok) {
            throw new Error(textResponse || 'Erro ao editar coordenador');
        }

        // Verifica se a resposta é JSON e a retorna como objeto
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(textResponse);
        } catch {
            // Se a resposta não for JSON, retorna o texto como está
            console.warn('Resposta não está em formato JSON. Utilizando texto direto.');
            jsonResponse = { message: textResponse };
        }

        return jsonResponse;
    } catch (error) {
        console.error('Erro ao editar coordenador:', error.message);
        throw error;
    }
};

// Função para deletar um coordenador
export const deleteCoordenador = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Se você estiver usando autenticação com token
            },
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao deletar coordenador: ${response.statusText}`);
        }

        const data = await response.json(); // Se o backend retornar algum dado, você pode usá-lo
        console.log('Coordenador deletado com sucesso:', data);
        return data; // Retorna os dados, se necessário
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error; // Propaga o erro para ser tratado onde a função é chamada
    }
};




// Função para cadastrar disciplina
export const cadastrarDisciplina = async (disciplinaData) => {
    const token = localStorage.getItem('authToken'); // Obter o token do localStorage

    // Verifica se o token está presente
    if (!token) {
        throw new Error('Token de autenticação não encontrado.');
    }

    // Faz a requisição para cadastrar a disciplina
    const response = await fetch('http://localhost:8080/api/disciplines/insertDiscipline', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('authToken')}` // Adiciona o token ao cabeçalho
        },
        body: JSON.stringify(disciplinaData),
    });

    // Verifica se a resposta é bem-sucedida (status 200-299)
    if (!response.ok) {
        const errorText = await response.text(); // Lê a resposta como texto
        throw new Error('Erro ao cadastrar a disciplina: ' + errorText); // Lança o erro com a resposta
    }

    // Retorna a resposta convertida em JSON
    return await response.text(); // Retorna diretamente o JSON da resposta
};


// Função para cadastrar Turma
export const cadastrarTurma = async (turmaData) => {
    const response = await fetch('http://localhost:8080/api/classes/classRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turmaData),
    });

    if (!response.ok) {
        throw new Error('Erro ao cadastrar a turma');
    }

    // Captura a resposta como texto ao invés de JSON
    const resultText = await response.text(); 
    return resultText; // Retorna a string capturada
};

export async function deleteTurma(id) {
    try {
        const response = await api.delete(`/classes/delete/class/${id}`); // Atualize aqui
        return response.data; // Retorne a resposta, se necessário
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Erro ao deletar a turma');
    }
}

// Função para buscar todas as turmas
export const fetchTurmas = async () => {
    try {
        // Requisição GET para buscar todas as turmas no endpoint `/turmas`
        const response = await api.get('http://localhost:8080/api/classes/getAllClasses');
        return response.data; // Retorna os dados das turmas
    } catch (error) {
        console.error('Erro ao buscar turmas:', error);
        throw error;
    }
};

// Função para listar todas as turmas
export const listarTurmas = async () => {
    try {
        const response = await api.get('/classes/getAllClasses'); // Use o endpoint correto
        return response.data; // Retorna os dados das turmas
    } catch (error) {
        console.error('Erro ao listar turmas:', error);
        throw error;
    }
};

// Função para atualizar uma turma
export const atualizarTurma = async (id, turmaData) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/classes/update/class/${id}`, turmaData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};


export const listarAlunosPorTurmaEDisciplina = async (turmaId, disciplinaId) => {
    try {
        const response = await api.get(`/alunos/turma/${turmaId}/disciplina/${disciplinaId}`); // Ajuste a URL conforme seu endpoint
        return response.data; // Retorna os dados
    } catch (error) {
        console.error('Erro ao listar alunos por turma e disciplina:', error);
        throw new Error(error.message);
    }
};


// Função para buscar todas as disciplinas
export const listarDisciplinas = async () => {
    try {
        const response = await api.get('http://localhost:8080/api/concepts/getUnitOne'); // Ajuste o endpoint conforme necessário
        return response.data;
    } catch (error) {
        console.error('Erro ao listar disciplinas:', error);
        throw error; // Propaga o erro
    }
};



export default api; // Exporte a instância do Axios para uso em outros arquivos

