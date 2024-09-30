// api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
const API_URL_PROF = '';

// Função para buscar todos os alunos
export const fetchAlunos = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/allStudents`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para buscar um aluno específico pelo ID
export const fetchUsuario = async (id) => {
    try {   
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Cadastrar aluno
export const cadastrarAluno = async (alunoData) => {
    try {
        const response = await axios.post(`${API_URL}/users/register/student`, alunoData);
        return response.data;
        console.log(response.data)
    } catch (error) {
        throw new Error(error.message);
    }
};


// Cadastrar Professor
export const cadastrarProfessor= async (alunoData) => {
    try {
        const response = await axios.post(API_URL_PROF, alunoData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};


// Função para editar um aluno
export const editarUsuario = async (id, newName) => {
    try {
        const response = await axios.put(`${API_URL}/usuers/update/student/${id}`, { nome: newName });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para deletar um aluno
export const deleteAluno = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para autenticar usuário
export const autenticarUsuario = async (cpf, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
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
        const response = await axios.post('URL_DA_API/coordenadores', dados); // Ajuste a URL conforme necessário
        return response.data;
    } catch (error) {
        throw new Error('Erro ao cadastrar coordenador: ' + error.response?.data?.message || error.message);
    }
};
    