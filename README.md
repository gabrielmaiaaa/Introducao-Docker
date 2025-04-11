# Introducao-Docker

Estudo sobre Docker, com base nos conteúdos do canal [TechEduca](https://www.youtube.com/playlist?list=PLViOsriojeLrdw5VByn96gphHFxqH3O_N). Este material é voltado para aprendizado prático e conceitual de como utilizar o Docker no dia a dia.

---

## 🐳 Conceito Inicial

Quando você cria vários containers a partir da mesma imagem, **não são geradas múltiplas cópias** dessa imagem. Todos os containers compartilham a **mesma imagem base**, que é imutável (somente leitura).

> Exemplo: se você cria um container com Ubuntu e adiciona um arquivo `.txt`, esse arquivo existirá apenas naquele container. Se iniciar outro container com a mesma imagem, ele não terá o arquivo.

---

## ⚙️ Comandos Básicos

### 🔍 Verificar Containers e Imagens

```bash
docker ps              # Mostra containers em execução
docker ps -a           # Mostra todos os containers (inclusive os finalizados)
docker images          # Lista imagens baixadas
```

---

### ▶️ Rodar Containers

```bash
docker run hello-world          # Executa um container de teste
docker run -it ubuntu bash      # Executa um container Ubuntu com terminal interativo
```

> `-it` = modo interativo com terminal ativo `bash` = abre o shell do Ubuntu

---

### 🛑 Parar e Remover Containers

```bash
docker stop <id>                # Para um container
docker stop -t <tempo> <id>     # Tempo (em segundos) para forçar parada
docker rm -f <id>               # Para e remove container ao mesmo tempo
docker rm <id>                  # Remove container parado
```

---

### 🔁 Reativar Containers

```bash
docker start <id>               # Inicia container parado
docker exec -it <id> bash       # Acessa container ativo com terminal

docker start -ai <id>           # Inicia e conecta ao container
```

---

### 🧹 Limpeza

```bash
docker container prune          # Remove todos os containers parados
docker rmi <nome>:latest        # Remove imagem específica
docker rmi $(docker images -q)  # Remove todas as imagens
```

---

### 🏷️ Nomes Personalizados

```bash
docker run --name <nome> -it ubuntu      # Nome personalizado para o container
docker rename <nome-antigo> <novo-nome>  # Renomear container
```

---

### 🧭 Executar em Background

```bash
docker run -di ubuntu          # Executa container em segundo plano

docker exec <id> echo "ola mundo"  # Roda comando dentro do container ativo
```

---

### 🔎 Inspeção

```bash
docker inspect <nome>:latest   # Exibe detalhes de imagem ou container
```

---

### 🧪 Imagens Não Oficiais

```bash
docker run dockersamples/static-site  # Formato: <usuário>/<repositório>
```

---

### 🌐 Trabalhando com Portas

```bash
docker run -P -d <imagem>          # Associa porta aleatória do host

docker port <id>                   # Verifica porta atribuída automaticamente

docker run -p 8080:80 <imagem>     # Mapeia porta do host:container
```

---

### 🌱 Variáveis de Ambiente

```bash
docker run -e VARIAVEL='valor' <imagem>  # Passa variáveis para o container
```

---

### 🧱 Camadas da Imagem

```bash
docker history <imagem>:latest   # Mostra camadas da imagem
```

---

### 💻 Build da Image

```bash
docker build -t <username>/<nome>:<tag> .
```

---

### 🚀 Lançando pro Docker Hub

```bash
docker push <username>/<nome>:<tag>
```

---

## 🔄 Estados do Container

### Create

Container é criado, mas ainda não executado.

```bash
docker create -it ubuntu
```

> Pode ir para os estados: `Running` ou `Deleted`

### Running

Container em execução.

```bash
docker start <id>
```

> Pode ir para os estados: `Stopped` ou `Paused`

### Stopped

Container foi interrompido.

```bash
docker stop <id>
# ou
docker kill <id>  # Finaliza imediatamente (sem tempo de espera)
```

### Paused

Container congelado, mas com processos mantidos.

```bash
docker pause <id>
docker unpause <id>
```

### Deleted

Container removido.

```bash
docker rm <id>
```

---

## 🎲 Formas de Persistência de Dados
Existe a possibilidade de você conseguir persisitir dados de um container para outro. Para isso vai ser guardados os dados na memoria local, no seu hd.

### Por Bind Mounts
è criado uma pasta na própria máquina e essa pasta pode ser usada pela imagem do container.
```bash
docker run -it -v /<nomePastaMeuPC>:/<nomePastaImage>
# ou
docker run -it --mount type=bind,source/<nomePastaMeuPC>,target=/<nomePastaImage> <image>
```

> `nomePastaMeuPC` é a pasta que você vai deixar no seu PC para comparilhar com o container. `nomePastaImage` é a pasta que vai ser criada na imagem com base na pasta do seu PC.

### Por Volume
O próprio docker faz a gerencia. Melhor que o Bind Mounts

```bash
docker volume create <nome>                                     # Cria um volume
docker run -it --mount source=<nome>,targe=/<nome> ubuntu       
# ou
docker run -it -v <nomeVolumeMeuPC>:/<nomePastaImage> <imagem>  # Menos verboso, mas pode ser usados sim
```
> `target` é o diretorio do seu container
> no `source` você pode colocar o nome de um volume que não foi criado ainda, o próprio docker vai criar para você.

Os volumes ficam guardados na pasta `/var/lib/docker/volume` da sua máquina.

E dentro dos arquivos das pastas no `volume` teremos os dados persistidos.

#### Excluir volume
Para excluir uma volume é simples
```bash
docker volume rm <nome>
```

### Por TMPFS
Aqui os dados serão persistidos na memoria ram, ao inves de ser no HDD ou SSD. Os dados vão ser perdidos, visto que estão sendo guardados numa memoria volátil (arquivos temporários).
```bash
docker run -it --tmpfs=/<nomePastaImage> <image>
# ou
docker run -it --mount type=tmpfs,destination=/<nomePastaImage> <image>
```

## 🛠️ Criando Imagens

Duas formas principais:

### 1. Usando `docker commit`

Mais manual e menos recomendado.

### 2. Usando `Dockerfile`

Método preferido. Exemplo básico:

```Dockerfile
FROM ubuntu
RUN apt update && apt install -y curl
CMD ["bash"]
```

> Salve como `Dockerfile` e rode:

```bash
docker build -t minha-imagem .
```

---
