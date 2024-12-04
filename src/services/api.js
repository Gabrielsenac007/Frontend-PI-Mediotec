import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Cria uma instância do Axios
const api = axios.create({
    baseURL: API_URL,
});

// Adiciona um interceptor para incluir o token em todas as requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
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
        await api.delete(`/users/delete/student/${id}`); // Usa a instância do Axios
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para buscar todos os professores
export const fetchProfessores = async () => {
    try {
        const response = await api.get('/users/allProfessor'); // Usa a instância do Axios e o endpoint correto
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para deletar um professor
export const deleteProfessor = async (id) => {
    try {
        await api.delete(`/users/delete/professor/${id}`);
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
        const response = await api.post('/users/register/student', alunoData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Se aplicável
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
        const response = await api.put(`/users/update/student/${id}`, updatedData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para obter um aluno pelo ID
export const obterAluno = async (id) => {
    try {
        const response = await api.get(`/users/students/class/${id}`); // Ajuste o endpoint conforme necessário
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
        const response = await api.post('/users/register/coordinator', dados, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Se aplicável
                'Content-Type': 'application/json' // Opcional
            }
        });

        console.log('Resposta do servidor:', response.data); // Log da resposta do servidor
        return response.data; // Retorna os dados da resposta
    } catch (error) {
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
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Se você estiver usando autenticação com token
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar coordenadores: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
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

        const textResponse = await response.text();
        if (!response.ok) {
            throw new Error(textResponse || 'Erro ao editar coordenador');
        }

        let jsonResponse;
        try {
            jsonResponse = JSON.parse(textResponse);
        } catch {
            console.warn('Resposta não está em formato JSON. Utilizando texto direto.');
            jsonResponse = { message: textResponse };
        }

        return jsonResponse;
    } catch (error) {
        console.error('Erro ao editar coordenador:', error.message);
        throw error;
    }
};

export const buscarCoordenadorPorId = async (id) => {
    try {
      const response = await api.get(`/users/coordenador/findById/${id}`); // Substitua pelo endpoint correto
      console.log('teste',response.data)
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar coordenador: ' + error.message);
    }
  };

// Função para deletar um coordenador
export const deleteCoordenador = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar coordenador: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Coordenador deletado com sucesso:', data);
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

// Função para cadastrar disciplina
export const cadastrarDisciplina = async (disciplinaData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token de autenticação não encontrado.');
    }

    const response = await fetch('https://sam-light-production.up.railway.app/api/disciplines/insertDiscipline', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(disciplinaData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Erro ao cadastrar a disciplina: ' + errorText);
    }

    return await response.text();
};

// Função para cadastrar Turma
export const cadastrarTurma = async (turmaData) => {
    const response = await fetch('https://sam-light-production.up.railway.app/api/classes/classRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turmaData),
    });

    if (!response.ok) {
        throw new Error('Erro ao cadastrar a turma');
    }

    const resultText = await response.text(); 
    return resultText;
};

export async function deleteTurma(id) {
    try {
        const response = await api.delete(`/classes/delete/class/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Erro ao deletar a turma');
    }
}

// Função para buscar todas as turmas
export const fetchTurmas = async () => {
    try {
        console.log("pegando turmas");
        const response = await api.get('/classes/getAllClasses');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar turmas:', error);
        throw error;
    }
};

// Função para atualizar uma turma
export const atualizarTurma = async (id, turmaData) => {
    try {
        const response = await axios.put(`https://sam-light-production.up.railway.app/api/classes/update/class/${id}`, turmaData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// Função para listar todas as turmas
export const listarTurmas = async () => {
    try {
        const response = await api.get('/classes/getAllClasses');
        return response.data;
    } catch (error) {
        console.error('Erro ao listar turmas:', error);
        throw error;
    }
};


export default api; // Exporte a instância do Axios para uso em outros arquivos

