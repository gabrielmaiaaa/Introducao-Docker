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
