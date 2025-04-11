# Projeto: Cartão de Visitas (card-business) - Python/Flask
### 1 - O que é?
Cartão de visitas web desenvolvido em Python com Flask com intuito educacional. Pelo TechEduca

### Comandos usados
Para ativar o venv
```bash
python -m venv venv
venv\Scripts\activate
deactivate
```

Para instalar as dependencias
```python
pip install --no-cache-dir -r requirements.txt
python app.py
```

Para buildar com o docker e rodae
```bash
docker build -t meu-app-python:v1 .
docker run -it -p 8080:8080 meu-app-python:v1
```

# Atualizando o Dockerfile
### Versão Velha
```bash
FROM ubuntu:22.04
RUN apt-get update && \
    apt-get install python3.11 python3.11-dev python3-pip -y
WORKDIR /app
COPY . .
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 8080
ENV LOGOMARCA=""
ENV FOTO=""
ENV NOME="Gabriel Maia"
ENV IDADE="20"
ENV EMAIL="email"
ENV PROFISSAO="Dev"
ENV SITE="github.com/gabrielmaiaaa"
CMD [ "python3", "app.py" ]
```

### Nova versão
A nova versão é mais otimizada e ocupa menos espaços, pois utilizamos uma versão do python que é alpine (um sistema operacional simples, tendo somente o suficeinte). Além disso deixamos um Copy no final do arquivo para ele atualizar somente as partes que vamos sempre mexer (consequentemente, faz com que os comandos que estão a cima dele aproveitem do cache e executem rápido).
```bash
FROM python:3.9-alpine
WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 8080
ENV LOGOMARCA=""
ENV FOTO=""
ENV NOME="Gabriel Maia"
ENV IDADE="20"
ENV EMAIL="email"
ENV PROFISSAO="Dev"
ENV SITE="github.com/gabrielmaiaaa"
COPY . .
CMD [ "python3", "app.py" ]
```
