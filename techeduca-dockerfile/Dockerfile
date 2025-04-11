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
ENV EMAIL="gabrielmaia6743@gmail.com"
ENV PROFISSAO="Dev"
ENV SITE="github.com/gabrielmaiaaa"
CMD [ "python3", "app.py" ]