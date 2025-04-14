# Projeto: Castrastro de Usuários (user-registration) - NodeJS/Express
### 1 - O que é?
Página web para cadastro de usuários desenvolvido em NodeJS/Express com intuito educacional.

### 2 - Objetivo
O principal objetivo desse projeto é sua utilização em containers.

### 3 - Execução
Para cumprir o objetivo e executar esse projeto:
1. Crie uma network personalizada utilizando o driver Bridge.
2. Configure um container do MongoDB na porta 27017 e insira-o na rede personalizada criada no passo anterior.
3. Crie um Dockerfile para a aplicação em NodeJS expondo a porta 3000 e uma variável MONGODB contendo o nome do container do MongoDB para que haja comunicação. Em seguida inicialize um container para a aplicação na network criada no passo 1.
4. Para visualizar os dados inseridos no banco, pode ser utilizado um container do Mongo Express.

### 4 - Mais Informações
Para mais detalhes sobre a criação dos dockerfiles e execução do projeto, acompanhe as aulas do curso 'Docker Essencial: Primeiros Passos'.