# Introducao-Docker
Aprendendo a usar o docker

### Comandos
- Verificar os conteiners ativos:
```
docker ps
```
ou para ver todos que já existiram
```
docker ps -a
```
- Para rodar alguma conteiner que existe na internet:
```
docker run hello-world
```
As vezes rodar um conteiner da net pode acabar que você puxa e ele não venha aparecer no "ps", pois os conteiners puxados e que não tem nada sendo executado dentro, eles automaticamente se fecha. Para resolver isso basta usar este comando aqui:
```
docker run -it ubuntu bash
```
O comando "-it" serve para tornar a execução interativa, it vem de interativo. O "bash" é o terminal do ubuntu que você chama para pode manter o conteiner sendo executado.
- Parar uma execução:
```
docker stop "id do conteiner"
```
- Para voltar a rodar um conteiner que foi parado:
```
docker start "id do conteiner"
```
- Para voltar a interagir com um conteiner após ter fechado:
```
docker exec -iti "id" bash
```
