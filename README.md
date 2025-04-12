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

Sim, é possível persistir dados entre containers! Isso significa que dá pra manter informações salvas mesmo que o container seja parado ou removido. Pra isso, a gente "joga" os dados pra fora do container, salvando eles no seu HD ou na memória RAM, dependendo da estratégia.

---

### 📁 Bind Mounts

Aqui, você cria uma pasta **na sua máquina** (host) e a compartilha com o container. A imagem do container consegue ler e gravar arquivos nela.

```bash
docker run -it -v /<nomeDaPastaNoPC>:/<nomeDaPastaNoContainer> <imagem>
# ou
docker run -it --mount type=bind,source=/<nomeDaPastaNoPC>,target=/<nomeDaPastaNoContainer> <imagem>
```

> 📝 `nomeDaPastaNoPC`: diretório no seu PC.
> 📦 `nomeDaPastaNoContainer`: caminho dentro do container, que será sincronizado com o diretório do host.

---

### 📦 Volumes

Nesse caso, o próprio Docker cuida da criação, organização e gerenciamento do volume. É mais prático e **recomendado** em produção.

```bash
docker volume create <nomeVolume>                                 # Cria um volume
docker run -it --mount source=<nomeVolume>,target=/<caminho> ubuntu
# ou
docker run -it -v <nomeVolume>:/<caminhoNoContainer> <imagem>     # Versão mais curta (e comum)
```

> `target`: caminho dentro do container onde os dados vão ficar.  
> `source`: se você informar um volume que ainda não existe, o Docker cria automaticamente.

📍 Os volumes ficam salvos no caminho:  
```
/var/lib/docker/volumes
```

E dentro das pastas dos volumes você vai encontrar os dados persistidos.

---

#### ❌ Remover Volume

Pra apagar um volume manualmente:

```bash
docker volume rm <nomeVolume>
```

---

### ⚡ TMPFS (Memória RAM)

Nesse caso, os dados são salvos na **RAM**, ou seja, em memória volátil. Ideal pra arquivos temporários ou situações onde o desempenho é mais importante que a persistência.

```bash
docker run -it --tmpfs=/<caminhoNoContainer> <imagem>
# ou
docker run -it --mount type=tmpfs,destination=/<caminhoNoContainer> <imagem>
```

> ⚠️ Quando o container for encerrado, os dados somem (porque estão na RAM).

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

## Tipos de Redes
Existem 3 tipos de redes: Bridge, Host e None. O Docker já faz por padrão o gerenciamento dos IPs dos containers

### Brigde
Por padrão o Docker coloca os containers como bridge, permitindo a comunicação entre containers.

Existe uma forma de criar uma conexão entre containers sem precisar ficar passando o IP
```bash
docker network create --driver bridge <nomeRede>
# para verificar
docker network ls
```

#### Conectar na minha rede criada
Primeiro para conectar em nossa rede iremos desconectar ela do padrão bridge
```bash
docker network desconnect bridge <nomeImage>
```
Agora conectando
```bash
docket network connect <nomeRede> <nomeImage>
# para verificar
docker inspect <nomeContainer>
```
Para abrir uma imagem direto na rede
```bash
docker run -it --network <nomerede> --name <nome> <nomeImage>
```
Agora os dois containers consegue se comunicar entre si
```bash
ping ubuntu1
ping ubuntu2
```
Nesse exemplo de cima, os dois containers do ubuntu vão conseguir pingar um no outro.

### Host
Ele tira a necessidade de precissar mapear as portas que aquele container vai utilizar. Ele vai estar inserido na própria rede, logo acessando o localhost sem porta, ele consegue acessar

### None
Não usa nenhuma interface de rede, algumas aplicações que ele pode ser usado:
- processamento de dados locais
- Executar algo localmente sem rede

Caso vc rode um container como none, ele não vai ter nenhum IP vinculado
