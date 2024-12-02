.

📚 Projeto de Cadastro de Alunos
Este é um projeto desenvolvido em React que permite o cadastro, listagem e gerenciamento de alunos, incluindo a associação de imagens de perfil e validações completas no front-end. Ele utiliza uma integração com APIs REST no backend para armazenar e processar os dados.

🚀 Tecnologias Utilizadas
Frontend:
React
React Hook Form + Zod (validação de formulários)
Axios (requisições HTTP)
InputMask (máscaras de campos)
React Icons (ícones)
react-confirm-alert (diálogo de confirmação)
Backend:
Spring Boot (Java)
Cloudinary (upload de imagens)
📋 Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

Node.js (versão LTS recomendada)
npm ou yarn
Backend configurado e funcionando (veja as instruções do backend)
🔧 Instalação e Configuração
Clone este repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
Acesse o diretório do projeto:

bash
Copiar código
cd seu-repositorio
Instale as dependências:

bash
Copiar código
npm install
# ou
yarn install
Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

env
Copiar código
REACT_APP_API_BASE_URL=http://localhost:8080
Substitua http://localhost:8080 pela URL da sua API backend.

Inicie o servidor de desenvolvimento:

bash
Copiar código
npm start
# ou
yarn start
A aplicação será aberta no navegador no endereço http://localhost:3000.

📦 Estrutura do Projeto
Diretórios Principais
src/components: Componentes reutilizáveis da aplicação.
src/pages: Páginas principais, como o formulário de cadastro e listagem de alunos.
src/services: Configurações e chamadas de APIs.
src/styles: Arquivos de estilo global e específicos.
src/utils: Funções utilitárias como validações de CPF.
🛠️ Funcionalidades Implementadas
1. Cadastro de Aluno
Formulário com validações usando React Hook Form e Zod.
Máscara de CPF e validação avançada.
Upload de imagem com visualização prévia.
Integração com a API para enviar dados como multipart/form-data.
2. Listagem de Alunos
Exibe todos os alunos cadastrados.
Filtragem para exibir apenas alunos habilitados.
Logs para monitorar respostas da API e depuração.
🖋️ Estilos de Código
Padrão ESLint e Prettier:
O projeto segue um padrão consistente de código configurado no ESLint e Prettier.
Execute o comando abaixo para corrigir automaticamente o formato do código:
bash
Copiar código
npm run lint
npm run format
🧪 Testes
Rodando Testes Unitários
Executar todos os testes:

bash
Copiar código
npm test
Testar componentes específicos:

bash
Copiar código
npm test NomeDoComponente.test.js
🛡️ Instruções de Segurança
Armazenamento Seguro de Tokens:
Os tokens de autenticação são armazenados no localStorage. Certifique-se de limpar esses dados ao fazer logout.

Validações no Backend:
Embora validações sejam feitas no front-end, sempre valide os dados também no backend para evitar manipulação maliciosa.

🛠️ Instruções do Backend
Certifique-se de que o backend está configurado e rodando corretamente.
Veja aqui as instruções detalhadas do backend.

📷 Screenshots
Página de Cadastro

Listagem de Alunos

📜 Licença
Este projeto está licenciado sob a MIT License.

🤝 Contribuindo
Faça um fork do projeto.
Crie uma nova branch para sua feature:
bash
Copiar código
git checkout -b feature/nome-da-feature
Commit suas mudanças:
bash
Copiar código
git commit -m 'Adicionando nova funcionalidade'
Envie para sua branch:
bash
Copiar código
git push origin feature/nome-da-feature
Abra um Pull Request.
