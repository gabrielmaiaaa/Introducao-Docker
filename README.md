# Introducao-Docker
Aprendendo a usar o docker. Todo o conteúdo está sendo visto no canal TechEduca.

Quando você cria vários containers a partir da mesma imagem, não são geradas múltiplas cópias da imagem. Na realidade, todos os containers compartilham a mesma imagem base, já que ela é imutável (somente leitura). Por exemplo: se você cria um container Ubuntu e adiciona um arquivo .txt dentro dele, esse arquivo só existirá naquele container específico. Se você iniciar um novo container a partir da mesma imagem, o arquivo não estará lá, pois as alterações são isoladas em cada container.

Existe como rodar comando dentro de comando no docker, basta colocar $() depois de um comando que irá funcionar.

# Comandos Básicos
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
docker stop <id do container>
```
as vezes pode demorar para parar, então vc pode usar este comando aqui para colocar até qaundo deve parar:
```
docker stop -t <tempo> <id>
```
- Parar o container e excluir ele ao mesmo tempo:
```
docker rm -f <id>
```

### Voltar um container a ativa
- Para voltar a rodar um container que foi parado:
```
docker start <id do container>
```
- Para voltar a interagir com um container após ter fechado:
```
docker exec -iti <id> bash
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
- Para excluir todos os containers:
```
docker container prune
```
- Para excluir todas as imagens:
```
docker rmi $(docker images -q)
```
o comando "docker images -q" funciona para mostrar todos os ids que tem baixados de imagens.

### Personalizar nomes
- Dar nomes personalizado aos containers:
```
docker run --name <nome> -it ubuntu
```
- Renomear um nome:
```
docker rename <nome antigo> <novo nome>
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

### Inspecionar uma imgem ou container:
- Inspecionar/ver detalhes
```
docker inspect <nome image>:latest
```

### Desconhecido
- Para puxar dockers não oficias, é necessário você colocar o nome do usuario e o docker (tipo como funciona no github)
```
docker run dockersamples/static-site
```

### Portas
- Para rodar uma pagina estatica no docker, vc precisa colocar uma porta para accessar no localhost. O "-d" server para rodar em background, para o terminal não ficar travado
```
docker run -P -d <comando>
```
- Para pegar a porta do ID, basta usar
```
docker port <id>
```
-  Para colocar uma porta manualmente:
```
docker run -p <port> (ex: 5000:50)
```

### Variaveis
Existe a possibilidade de passar variaveis para um container, para isso use "-e":
```
docker run -e VARIAVEL='valor' <container>
```

### Camadas
- Para verificar camads de uma imagem:
```
docker history <image:latest>
```

# Estados de Containers
Quando você dá o "docker run" ele já cria o container, logo n precisa escrever "docker create".
## Create
Estado que um container é criado e está esperando para ser executado. 
```
docker create -it ubuntu
```
O estado Create pode ir para os estados Running e Deleted.
#### Running
Estado que está inicializando um conatainer.
```
docker start <nome/id>
```
#### Deleted
Estado que deleta um container
```
docker rm <nome/id>
```

## Running
Estado que está inicializando um conatainer. O estado Running consegue ir para os estados Stopped e Paused
#### Stoped
Existem dois comandos que vão até o estado Stoped, sendo o kill e stop.
Kill faz com oq o processo principal do container seja finalizado imediatametne (sem aquele cowldown de 10 segundos do stop)
```
docker kill <nome/id>
```
```
docker stop <nome/id>
```
#### Paused
```
docker pause <nome/id>
```

## Paused
Este estado apenas congelar o container, mantendo todos os processos. O estado de Paused só pode ir para o estado de Running.
#### Running
```
docker unpaused <nome/id>
```

## Stopped
O Stopped consegue ir para o estado Deleted e Running
#### Running
```
docker restart <nome/id>
```
#### Deleted
```
docker rm <nome/id>
```

# Criando as Prorpias Imagens
- Existem duas formas de fazer isso, com docker commit ou com dockerfile
- Usando o docker commit é uito custoso e demorado (processo bem chato), por isso a galera prefere criar um dockerfile na pasta de arquivos

