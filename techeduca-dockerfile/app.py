import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def exibir_cartao():
    logo = os.environ.get('LOGOMARCA')
    foto = os.environ.get('FOTO')
    nome = os.environ.get('NOME')
    idade = os.environ.get('IDADE')
    email = os.environ.get('EMAIL')
    profissao = os.environ.get('PROFISSAO')
    site = os.environ.get('SITE')

    return render_template('cartao.html', logo=logo, foto=foto, nome=nome, idade=idade, email=email, profissao=profissao, site=site)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
