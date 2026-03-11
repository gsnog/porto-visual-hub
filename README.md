# SerpTech - Sistema de Gestão e Comunicação (Estaleiro)
Bem-vindo ao **SerpTech**, uma plataforma integrada de gestão empresarial (ERP) com foco em comunicação em tempo real, gestão de pessoas e produtividade (Kanban/Agenda).
## 🚀 Arquitetura do Projeto
O projeto é dividido em duas partes principais:
1.  **Backend (Django)**: Localizado na pasta `/DLC`. Utiliza Django REST Framework para APIs, Django Channels para WebSockets e PostgreSQL como banco de dados.
2.  **Frontend (React)**: Localizado na pasta `/front-end-serptech`. Desenvolvido com Vite, React, TypeScript, Tailwind CSS e Shadcn/UI.
---
## ✨ Funcionalidades Principais (Foco em Comunicação)
Recentemente, o sistema de chat passou por uma evolução de 12 fases para garantir estabilidade e UX premium:
-   **Comunicação em Tempo Real**: Mensageria instantânea via WebSockets (Django Channels).
-   **WebRTC Video/Audio**: Chamadas de voz e vídeo integradas diretamente no chat.
-   **Notificações Globais**: Badges de mensagens não lidas que persistem em qualquer tela do sistema.
-   **Preview WhatsApp Style**: Visualização da última mensagem na barra lateral com atualização automática.
-   **Gestão de Pessoas**: Integração com a base real de usuários para criação de conversas privadas e grupos.
-   **Kanban & Agenda**: Sincronização em tempo real de atribuições de tarefas e convites de eventos.
---
## 🛠 Como Rodar o Projeto Localmente
### 1. Pré-requisitos
-   Python 3.10+
-   Node.js 18+
-   Redis (necessário para o Django Channels / WebSockets)
-   PostgreSQL (configurado no `settings.py`)
### 2. Configurando o Backend (Django)
```bash
# Entre na pasta do backend
cd DLC
# Crie e ative um ambiente virtual
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
# Instale as dependências
pip install -r requirements.txt
# Execute as migrações
python manage.py migrate
# Inicie o servidor de desenvolvimento (Daphne para suporte a WebSocket)
daphne -b 127.0.0.1 -p 8000 app.asgi:application
```
### 3. Configurando o Frontend (React)
```bash
# Entre na pasta do frontend
cd front-end-serptech
# Instale as dependências
npm install
# Inicie o servidor de desenvolvimento
npm run dev
```
O frontend estará acessível em `http://localhost:5173`.
---
## 📂 Documentação de Desenvolvimento
Para um histórico detalhado das implementações e correções técnicas, consulte os documentos na pasta de brain do agente:
-   [Walkthrough Completo (12 Fases)](file:///Users/giovananogueira/.gemini/antigravity/brain/ecf790fe-6dde-47c3-bcda-edbaba79c68b/walkthrough.md): Detalhamento técnico de cada sprint de desenvolvimento.
-   [Plano de Implementação](file:///Users/giovananogueira/.gemini/antigravity/brain/ecf790fe-6dde-47c3-bcda-edbaba79c68b/implementation_plan.md): Estrutura de mudanças aprovadas.
---
## 🛡 Licença
Este projeto é de uso restrito e confidencial da SerpTech.
