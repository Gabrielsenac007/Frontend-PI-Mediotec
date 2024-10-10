Sistema de Gestão Escolar - Mediotec
Este projeto foi desenvolvido como parte de um trabalho acadêmico para um sistema de gestão escolar voltado para o Mediotec, um programa de ensino médio profissionalizante oferecido pelo Senac na região metropolitana do Recife. O sistema tem como objetivo facilitar a administração acadêmica e a comunicação entre alunos, professores e coordenadores, com foco em usabilidade e eficiência.

Funcionalidades
1. Gerenciamento de Usuários
O sistema permite o cadastro e a autenticação de três perfis principais: Alunos, Professores e Coordenadores.
Utiliza autenticação baseada em JWT para proteger as rotas e garantir a segurança dos dados.
Cada perfil possui funções específicas e permissões personalizadas, gerenciadas pelo back-end.
2. Cadastro e Atribuição de Disciplinas
O coordenador pode cadastrar professores e associá-los a disciplinas diretamente pelo sistema.
Para o cadastro de professores, as disciplinas são recuperadas via API e associadas utilizando os respectivos IDs.
3. Gerenciamento de Turmas
O sistema permite a criação de turmas e a atribuição de alunos a essas turmas.
Cada aluno é relacionado a apenas uma turma, enquanto uma turma pode conter vários alunos.
Professores são associados a disciplinas e turmas, permitindo a gestão de conteúdos e avaliações.
4. Conceitos Acadêmicos
A tabela de conceitos armazena as notas e avaliações dos alunos, associadas diretamente ao usuário (aluno), sem relação direta com turmas.
As notas podem ser consultadas por classe e disciplina específicas, facilitando a análise de desempenho acadêmico.
5. Comunicação Interna
O sistema oferece uma funcionalidade de envio de comunicados, permitindo que coordenadores e professores compartilhem informações importantes com os alunos.
6. Sistema de Autenticação
Utilizamos o Auth0 JWT para geração e verificação de tokens JWT. O token contém o CPF do usuário como subject.
A autenticação é central para proteger informações sensíveis e assegurar que somente usuários autenticados possam acessar determinadas funcionalidades.
Tecnologias Utilizadas
Backend: Spring Boot com Spring Data JPA e MySQL.
Frontend: React.js (não implementado ainda, mas planejado).
Autenticação: Auth0 JWT.
Banco de Dados: MySQL com utilização de stored procedures para gerenciar atualizações e inserções.
Integração com API: O sistema busca dados externos de disciplinas e gerencia os IDs no back-end.
Estrutura de Tabelas
Usuários (Users)

Armazena informações básicas como CPF, nome, email e senha.
Utiliza enum para o papel dos usuários (Aluno, Professor, Coordenador).
Turmas (Classes)

Armazena o nome da turma, ano letivo, turno e semestre.
Disciplinas (Disciplines)

Contém informações sobre cada disciplina, como nome e descrição.
Turmas_Disciplinas

Tabela intermediária para associar turmas a disciplinas, permitindo o relacionamento de muitos para muitos.
Conceitos

Armazena notas e avaliações dos alunos por disciplina.
Procedimentos Armazenados (Stored Procedures)
associate_classes_and_disciplines: Procedimento para associar turmas e disciplinas.
Utilização de IFNULL e NULLIF para garantir a atualização condicional de colunas durante modificações nos registros.
Como Rodar o Projeto
Clone o Repositório

bash
Copiar código
git clone https://github.com/seu-usuario/sistema-escolar-mediotec.git
Configure o Banco de Dados

Crie o banco de dados MySQL utilizando o arquivo schema.sql fornecido.
Instale as Dependências

Copiar código
mvn install
Configure as Variáveis de Ambiente

Defina as variáveis de ambiente para a conexão com o banco de dados MySQL e a configuração do Auth0 JWT.
Inicie o Servidor

arduino
Copiar código
mvn spring-boot:run
Considerações Finais
Este sistema foi desenvolvido para fins acadêmicos, com o objetivo de aplicar conceitos de arquitetura de software, autenticação segura e boas práticas de desenvolvimento. Futuras melhorias incluem a implementação de um front-end em React.js e a adição de novas funcionalidades voltadas à comunicação e gestão de conteúdo escolar.
