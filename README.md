# **Portfólio Moderno**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

Este é um **portfólio moderno e responsivo** criado com **React**, **Bootstrap**, **Node.js** e **MongoDB**. Ele combina um design limpo e funcionalidades práticas, como um formulário de contato conectado ao MongoDB, modo escuro automático e total responsividade para dispositivos móveis e desktops.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Como Executar o Projeto](#como-executar-o-projeto)
5. [Deploy](#deploy)
6. [Contribuições](#contribuições)
7. [Licença](#licença)

---

## 🌟 Visão Geral

Este projeto foi desenvolvido para ser um portfólio pessoal moderno e funcional. Ele inclui um **formulário de contato integrado ao MongoDB**, permitindo que as mensagens enviadas pelos visitantes sejam armazenadas em um banco de dados. Além disso, o projeto possui um **modo escuro automático** e é totalmente responsivo, garantindo uma experiência consistente em todos os dispositivos.

O backend foi construído com **Node.js** e **Express**, enquanto o frontend utiliza **React** e **Bootstrap** para criar uma interface atraente e interativa.

---

## ✨ Funcionalidades

- **Formulário de Contato**:
  - Conectado ao MongoDB para armazenar mensagens.
  - Validação de campos (nome, e-mail, mensagem).
- **Modo Escuro Automático**:
  - Detecta as preferências do sistema operacional do usuário.
- **Responsividade Total**:
  - Design adaptável para dispositivos móveis, tablets e desktops.
- **Fácil Personalização**:
  - O projeto pode ser facilmente personalizado para atender às suas necessidades.

---

## 💻 Tecnologias Utilizadas

### Frontend
- **React**: Framework JavaScript para construção da interface do usuário.
- **Bootstrap**: Biblioteca CSS para estilização e responsividade.
- **Axios**: Biblioteca para fazer requisições HTTP ao backend.

### Backend
- **Node.js**: Ambiente de execução JavaScript para o servidor.
- **Express**: Framework para criar APIs RESTful.
- **MongoDB**: Banco de dados NoSQL para armazenar as mensagens.

### Ferramentas de Desenvolvimento
- **dotenv**: Para gerenciar variáveis de ambiente.
- **CORS**: Middleware para permitir comunicação entre frontend e backend.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- **Node.js** (v18.x ou superior): [Download aqui](https://nodejs.org).
- **npm** ou **yarn**: Gerenciadores de pacotes para instalar dependências.
- **MongoDB Atlas**: Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para hospedar o banco de dados.

### Passos

#### 1. Clone o Repositório
Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/portfolio.git
cd portfolio

#### 2. Instale as Dependências do Frontend
Navegue até as pastas client e instale as dependências:

````bash
cd client
npm install

#### 3. Instale as Dependências do Backend
Navegue até a pasta server e instale as dependências:

````bash
cd ../server
npm install

#### 4. Configure o MongoDB
Crie um arquivo .env na pasta server com a seguinte variável:

````bash
MONGO_URI=sua-uri-do-mongodb

#### 5. Execute o Backend
Inicie o servidor backend:

````bash
node server/server.js

#### 6. Execute o Frontend
Em outro terminal, navegue até a pasta client e inicie o frontend:

````bash
npm start

---

## 🌐 Deploy
Para colocar o projeto online, siga estas etapas:

### Frontend no Netlify
1. Faça push do código para o GitHub.
2. Acesse o Netlify e conecte seu repositório.
3. Configure o comando de build como npm run build e aponte para a pasta build.
### Backend no Render
1. Acesse o Render e crie uma conta.
2. Conecte seu repositório e configure o comando de build como node server/server.js.
3. Adicione a variável de ambiente MONGO_URI com a URL do MongoDB Atlas.

---

## 🤝 Contribuições
Contribuições são bem-vindas! Se você encontrar bugs ou quiser adicionar novas funcionalidades, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature: git checkout -b feature/nova-funcionalidade.
3. Commit suas mudanças: git commit -m "Adiciona nova funcionalidade".
4. Envie para o repositório remoto: git push origin feature/nova-funcionalidade.
5. Abra um Pull Request.

---

## 📞 Contato
Se tiver dúvidas ou sugestões, entre em contato:

E-mail : dpcouto.dev@gmail.com
LinkedIn : linkedin.com/in/diegocouto87
WhatsApp : +55 21 97470-0582

---
