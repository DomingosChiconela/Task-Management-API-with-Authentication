# Task-Management-API-with-Authentication
A **Task Management API** é uma API RESTful desenvolvida para um aplicativo simples de gerenciamento de tarefas, que integra funcionalidades de autenticação e autorização de usuários. Esta API permite que usuários gerenciem suas tarefas de maneira eficiente, garantindo que apenas usuários autenticados possam acessar e manipular seus dados. Com uma interface de documentação do Swagger, é fácil testar e interagir com os endpoints da API.

## Funcionalidades

- **Registro de Usuário**: Permite que novos usuários se registrem com um nome de usuário, email e senha.
- **Login de Usuário**: Autentica usuários e retorna um token JWT para acesso seguro.
- **Verificação de Token**: Valida o token JWT fornecido e retorna os dados do usuário.
- **Gerenciamento de Tarefas**:
  - Listar tarefas do usuário autenticado.
  - Criar novas tarefas com título, descrição e data de vencimento.
  - Obter detalhes de tarefas específicas.
  - Atualizar tarefas existentes.
  - Excluir tarefas específicas.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript do lado do servidor.
- **Express.js**: Framework para construção de APIs RESTful.
- **JWT (JSON Web Token)**: Mecanismo para autenticação e autorização.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
-**jest**:Para fazer os teste da api.
- **Swagger**: Ferramenta para documentar e testar APIs.

## Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [PostgreSQL](https://www.postgresql.org/) (banco de dados)

### Passos

1. Clone o repositório:

   ```bash
   git clone git@github.com:SeuUsuario/Task-Management-API.git
