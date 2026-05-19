# Portfólio de Leonardo Pereira Silva

Este é o repositório do meu portfólio pessoal e profissional. Ele foi construído com uma stack moderna e possui um painel administrativo completo integrado para gerenciamento dinâmico de projetos e habilidades.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React.js** com **Vite** (para alta performance no desenvolvimento)
- **Tailwind CSS** v4 (para estilização)
- **Framer Motion** (para animações fluidas)
- **Lucide-React** (para ícones)
- **React Router** (para roteamento)

### Backend & Banco de Dados
- **Node.js** com **Express** (API para alimentar o frontend)
- **Prisma ORM** (Gerenciamento do banco de dados)
- **SQLite** (Banco de dados leve e rápido configurado por padrão)
- **Concurrently** (Para rodar o front e o back ao mesmo tempo em um único comando)

---

## 🛠️ Passo a Passo para Instalação

Se você quiser clonar este repositório e rodar o projeto localmente na sua máquina, siga os passos abaixo:

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (Versão 18 ou superior recomendada)
- Git

### 2. Clonando o Repositório
Abra o seu terminal e rode o comando abaixo para clonar o projeto:
```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd portifolio
```

### 3. Instalando as Dependências
Com o terminal aberto na pasta raiz do projeto, instale os pacotes necessários:
```bash
npm install
```

### 4. Configurando Variáveis de Ambiente (.env)
Este projeto utiliza variáveis de ambiente para definir configurações sensíveis, como a senha do painel administrativo. 
- Crie um arquivo chamado `.env` na raiz do projeto.
- Adicione a seguinte linha (substituindo a senha pela de sua preferência):

```env
ADMIN_PASSWORD=suasenhaaqui
```

### 5. Configurando o Banco de Dados
Para que o painel administrativo funcione, você precisa iniciar o banco de dados e aplicar o esquema do Prisma:
```bash
npx prisma db push
```
*(Isso criará automaticamente o banco de dados SQLite e todas as tabelas necessárias).*

### 6. Rodando a Aplicação
Agora, basta iniciar o servidor de desenvolvimento. O comando abaixo vai rodar tanto a API Node.js (backend) quanto o Vite (frontend) de uma vez só:
```bash
npm run dev
```

Pronto! Acesse `http://localhost:5173` no seu navegador para ver o portfólio.
Para acessar o painel administrativo, basta adicionar `/login` ou `/admin` à URL.

---

## 🏗️ Comandos Úteis

- `npm run dev`: Inicia o ambiente de desenvolvimento completo.
- `npx prisma studio`: Abre uma interface web para visualizar e editar os dados do banco de dados diretamente.
- `npm run build`: Gera a versão otimizada de produção do frontend na pasta `dist/`.

## 📜 Licença
Fique à vontade para clonar e se inspirar!
