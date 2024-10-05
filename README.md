# Task-Management-API-with-Authentication
A **Task Management API** é uma API RESTful projetada para fornecer funcionalidades essenciais de gerenciamento de tarefas, com foco em segurança e facilidade de uso. Ela inclui um sistema completo de autenticação e autorização, garantindo que apenas usuários autenticados possam criar, visualizar, editar e excluir suas próprias tarefas. Além disso, a API está documentada de forma interativa com o Swagger, permitindo que você explore e teste facilmente seus endpoints.

A API já está hospedada e disponível publicamente em: [Task Management API](https://task-management-api-with-authentication.onrender.com). 
Com esta API, os usuários podem gerenciar suas tarefas de maneira eficiente e segura, em um ambiente acessível e confiável.


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
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **JWT (JSON Web Token)**: Mecanismo para autenticação e autorização.
- **bcrypt**: Biblioteca para hash de senhas.
- **SQLite**: Banco de dados leve e de fácil configuração.
- **Prisma**: ORM para trabalhar com banco de dados de maneira eficiente.
- **Swagger-UI-Express**: Ferramenta para documentação de APIs com interface interativa.
- **Zod**: Biblioteca para validação de esquemas e tipos.
- **zod-validation-error**: Utilitário para converter erros de validação do Zod em mensagens mais amigáveis.
- **dotenv**: Carrega variáveis de ambiente a partir de um arquivo `.env`.
- **cors**: Middleware para permitir requisições de diferentes origens (Cross-Origin Resource Sharing).
- **Jest**: Framework de testes para JavaScript/TypeScript.
- **ts-jest**: Predefinição de Jest para usar com TypeScript, facilitando a execução de testes escritos em TypeScript.
- **Supertest**: Biblioteca para realizar testes de integração em APIs.



## Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)


### Passos

1. Clone o repositório:

   ```bash
   git@github.com:DomingosChiconela/Task-Management-API-with-Authentication.git
  ou
  
    https://github.com/DomingosChiconela/Task-Management-API-with-Authentication.git

2. **acesse o projecto que a caba de clonar com o comando:**
   ```bash
   cd Task-Management-API-with-Authentication
   
3. **Instale as dependências**
    ```bash
    npm install 

4. **Configure as variáveis de ambiente antes de rodar a aplicação. Para isso, crie o arquivo ***.env*** com base no arquivo ***.env.template***, que contém um molde do que é necessário.**
   
5. **Para rodar a aplicação, utilize o comando**
   ```bash
   npm run dev
 
6. **Com o servidor rodando, você pode acessar a documentação Swagger no seguinte endereço**
   ```bash
   http://localhost:{numero de porta}/api/docs/

**Ou, se preferir, acesse o Swagger da aplicação hospedada em: [Task Management API SWAGGER](https://task-management-api-with-authentication.onrender.com/api/docs/)**



