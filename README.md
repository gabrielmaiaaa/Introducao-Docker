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

## 🌐 Tipos de Redes

O Docker possui três tipos principais de redes: `bridge`, `host` e `none`. Por padrão, o Docker já gerencia os IPs dos containers automaticamente.

### 🔗 Bridge
É a rede padrão dos containers. Permite que containers se comuniquem entre si.

#### Criar uma rede bridge personalizada
```bash
docker network create --driver bridge <nomeRede>
docker network ls  # Lista redes existentes
```

#### Conectar container à nova rede
Desconectando da rede bridge padrão:
```bash
docker network disconnect bridge <nomeContainer>
```
Conectando à nova rede:
```bash
docker network connect <nomeRede> <nomeContainer>
docker inspect <nomeContainer>  # Verificar conexões de rede
```
Rodar container já conectado à rede:
```bash
docker run -it --network <nomeRede> --name <nome> <imagem>
```
Teste de comunicação entre containers:
```bash
ping ubuntu1
ping ubuntu2
```
> Se ambos os containers estiverem na mesma rede bridge, conseguem se comunicar por nome.

### 🖥️ Host
O container compartilha a mesma rede do host. Isso elimina a necessidade de mapear portas manualmente. Exemplo de uso:
```bash
docker run --network host <imagem>
```
Você pode acessar a aplicação no `localhost` diretamente.

### 🚫 None
O container não possui nenhuma interface de rede. Útil para:
- Processamento de dados locais
- Executar tarefas que não precisam de rede

Exemplo:
```bash
docker run --network none <imagem>
```
> O container não terá nenhum IP associado.

---

# 🧩 Docker Compose

O Docker Compose é uma alternativa prática para que você **não precise ficar criando vários Dockerfiles** ou repetindo comandos manualmente. Com ele, você define toda a estrutura de containers, redes, volumes e variáveis de ambiente num único arquivo (`docker-compose.yml`).

## 📦 Estrutura Base
```yaml
version: '3'  # versão do Compose que será utilizada

services:     # serviços que queremos executar
  meu-blog:   # nome do serviço (pode ser qualquer um)
    image: wordpress:6.2.2         # imagem e versão
    container_name: wordpress      # nome customizado do container
    restart: always                # reiniciar automaticamente se falhar
    env_file:                      # arquivo de variáveis de ambiente
      - .env
    ports:                         # mapeamento de portas
      - 80:80
    volumes:                       # volumes compartilhados
      - wordpress:/var/www/html
    networks:                      # rede a ser utilizada
      - meu-blog
    depends_on:                    # dependência de outro serviço
      - db

  db:
    image: mysql:5.7
    container_name: mysql
    restart: always
    env_file:
      - .env
    ports:
      - 8000:8000
    volumes:
      - db:/var/lib/mysql
    networks:
      - meu-blog

# Criamos a rede e os volumes usados pelos serviços
networks:
  meu-blog:      # nome da rede
    driver: bridge

volumes:         # volumes que serão criados se não existirem
  wordpress:
  db:
```

## ▶️ Rodando o Docker Compose
Para rodar, basta estar na pasta onde está o `docker-compose.yml` e executar:
```bash
docker compose up
```

Se quiser rodar em segundo plano (background), adicione `-d`:
```bash
docker compose up -d
```


