# Introducao-Docker
Aprendendo a usar o docker

### Verificar containers e images
- Verificar os containers ativos:
```
docker ps
```
ou para ver todos que já existiram
```
docker ps -a
```
- Verificar as imagens criadas:
```
docker images
```

### Rodar containers
- Para rodar alguma container que existe na internet:
```
docker run hello-world
```
As vezes rodar um container da net pode acabar que você puxa e ele não venha aparecer no "ps", pois os containers puxados e que não tem nada sendo executado dentro, eles automaticamente se fecha. Para resolver isso basta usar este comando aqui:
```
docker run -it ubuntu bash
```
O comando "-it" serve para tornar a execução interativa, it vem de interativo. O "bash" é o terminal do ubuntu que você chama para pode manter o container sendo executado.

### Parar a execução de um container
- Parar uma execução:
```
docker stop "id do container"
```

### Voltar um container a ativa
- Para voltar a rodar um container que foi parado:
```
docker start "id do container"
```
- Para voltar a interagir com um container após ter fechado:
```
docker exec -iti "id" bash
```
outra forma de voltar a interagir
```
docker start -ai <nome/id>
```

### Exlcuir containers
- Para excluir containers que estão inativos:
```
docker rm <id>
```
Uma coisa legal é q o id não precisa ser completo, vc pode colocar os 4 primeiros q ele reconhece
- Para excluir images que foram criadas:
```
docker rmi <nome>:latest
```

### Personalizar nomes
- Dar nomes personalizado aos containers:
```
docker run --name <nome> -it ubuntu
```

### Habilitar container fora do terminal
- Deixar container executando fora daquele terminal (ficando ativo "para sempre").
```
docker run -di uvbuntu
```
- Agora para usar esse container que tá ativo "eternamente":
```
docker exec <id> echo "ola mundo"
```




