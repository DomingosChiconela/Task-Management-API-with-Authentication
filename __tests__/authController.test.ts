import request from 'supertest';
import{app} from "../src/server" // Importando o app Express
import { db } from '../src/utils/db.server'; // Simulando o banco de dados
import { encryptPassword,checkPassword } from '../src/utils/cryptPassword';
import jwt from 'jsonwebtoken'; 

import dotenv from 'dotenv'; // Importando dotenv

dotenv.config();


// Mock do banco de dados
jest.mock('../src/utils/db.server', () => ({
    db: {
      user: {
        findFirst: jest.fn(),
        create: jest.fn(),
        findUnique:jest.fn()
      },
    },
  })); 


  
jest.mock('../src/utils/cryptPassword'); // Mock da função encryptPassword

jest.mock("jsonwebtoken")

describe('AuthController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpar mocks após cada teste
  });

    describe('teste de registro de novo usuario', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      // Mockando a função encryptPassword
      (encryptPassword as jest.Mock).mockResolvedValue('hashedPassword');

      // Mockando a função db.user.findFirst (função essa que verifica seja existe um usuario com  aquele username e o valor que e simulado e o null que seria retornado se nao existisse um usario com aquele username )
      (db.user.findFirst as jest.Mock).mockResolvedValue(null);

      // Mockando a função db.user.create (para criar um novo usuário)
      (db.user.create as jest.Mock).mockResolvedValue({
        id: 'jf4f99304-ei3h44994-ei4fj49',
        username: 'Domingos Chiconela',
        email: 'azevedodmingos78@gmail.com',
        
      });

      const response = await request(app)
        .post('/auth/register')
        .send({
          username: 'testUser',
          email: 'azevedodmingos78@gmail.com',
          password: 'Password123!',
          confirmPassword: 'Password123!',
        });

      expect(response.status).toBe(201); // Verifica se o status da resposta é 201
      expect(response.body.message).toBe('user created'); // Verifica a mensagem de resposta
    });

    it('deve retornar erro quando as senhas não coincidem', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          username: 'testUser',
          email: 'test@example.com',
          password: 'Password123!',
          confirmPassword: 'Password1234!',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('The passwords do not match');
    });

    it('deve retornar erro quando o nome de usuário ou email já existe', async () => {
      // Mockando a função db.user.findFirst para simular um usuário já existente
      (db.user.findFirst as jest.Mock).mockResolvedValue({
        id: "3c541198-0c5f-4912-9e74-7a373d4ef34c",
        username: "Domingos Chiconela",
        email: "azevedodmingos78@gmail.com",
        role: "USER"
      });

      const response = await request(app)
        .post('/auth/register')
        .send({
          username: 'Domingos Chiconela',
          email: 'azevedodmingos78@gmail.com',
          password: 'Password123!',
          confirmPassword: 'Password123!',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('The username already exists, please enter a new one');
    });
    });

    describe('teste de login', () => {
        it('deve autenticar um usuário com sucesso', async () => {
        const mockUser = {
            id: 'mockedUserId',
            username: 'testUser',
            password: 'hashedPassword', // Simule a senha já criptografada
            role: 'USER'
        };

        

        // Mockando a função db.user.findUnique para retornar um usuário simulado
        (db.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

        // Mockando a função checkPassword para retornar verdadeiro
        (checkPassword as jest.Mock).mockResolvedValue(true);

        //mockando o jwb
        (jwt.sign as jest.Mock).mockResolvedValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNjNTQxMTk4LTBjNWYtNDkxMi05ZTc0LTdhMzczZDRlZjM0YyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzI4MDUwMDg3LCJleHAiOjE3MzA2NDIwODd9.X1kyvbpAXcE379p6yOa_OPQU51DO3OPtnSrVC9m-pGA")


        const response = await request(app)
            .post('/auth/login')
            .send({
            username: 'testUser',
            password: 'Password123!',
            });

        expect(response.status).toBe(200); // Verifica se o status da resposta é 200
        expect(response.body.message).toBe('authenticated user'); // Verifica a mensagem de resposta
        expect(response.body.token).toBeDefined(); // Verifica se o token foi retornado
        });

        it('deve retornar erro quando o usuário não é encontrado', async () => {
   

        // Mockando a função db.user.findUnique para retornar null
        (db.user.findUnique as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .post('/auth/login')
            .send({
            username: 'nonExistentUser',
            password: 'Password123!',
            });

        expect(response.status).toBe(404); // Verifica se o status da resposta é 404
        expect(response.body.message).toBe('user not found'); // Verifica a mensagem de resposta
        });

        it('deve retornar erro quando a senha é inválida', async () => {
        const mockUser = {
            id: 'mockedUserId',
            username: 'testUser',
            password: 'hashedPassword',
            role: 'USER'
        };

        
        // Mockando a função db.user.findUnique para retornar o usuário simulado
        (db.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

        // Mockando a função checkPassword para retornar falso
        (checkPassword as jest.Mock).mockResolvedValue(false);

        const response = await request(app)
            .post('/auth/login')
            .send({
            username: 'testUser',
            password: 'WrongPassword!',
            });

        expect(response.status).toBe(400); // Verifica se o status da resposta é 400
        expect(response.body.message).toBe('invalid password'); // Verifica a mensagem de resposta
        });

        it('deve retornar erro em caso de erro interno', async () => {
        
    

        // Mockando a função db.user.findUnique para lançar um erro
        (db.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post('/auth/login')
            .send({
            username: 'testUser',
            password: 'Password123!',
            });

        expect(response.status).toBe(500); // Verifica se o status da resposta é 500
        expect(response.body.message).toBe('Internal Server Error'); // Verifica a mensagem de resposta
        });
    });



  
    describe('teste de verificação de token', () => {

        it('deve retornar erro quando o token não é fornecido', async () => {
            const response = await request(app)
                .get('/auth/verify') 
                .set('Authorization', ''); // Não fornecendo um token

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Token not provider');
        });

        it('deve retornar erro quando o token é inválido', async () => {
            const invalidToken = 'invalid.token.here';

            // Mockando a função verify para lançar um erro
            (jwt.verify as jest.Mock).mockImplementation(() => {
                throw new Error('Invalid token');
            });

            const response = await request(app)
                .get('/auth/verify')
                .set('Authorization', `Bearer ${invalidToken}`);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Internal Server Error');
        });

        it('deve retornar o usuário quando o token é válido', async () => {
            const validToken = 'ifemkvroerirknbvreii495gj9fsxnsjeieirjfmr';
            const mockUser = {
                id: 'ncuef4i4450-cneufn4fi4-e cifj4i4',
                username: 'testUser',
                email: 'test@example.com',
                role: 'USER',
            };

            // Mockando a função verify para retornar um payload de token válido
            (jwt.verify as jest.Mock).mockReturnValue({ id: 'ncuef4i4450-cneufn4fi4-e cifj4i4' });

            // Mockando a função db.user.findUnique para retornar um usuário simulado
            (db.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

            const response = await request(app)
                .get('/auth/verify')
                .set('Authorization', `Bearer ${validToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('User verified');
            expect(response.body.data).toEqual(mockUser);
        });

    });
});





  

