from flask import Flask
from flask import render_template
from flask import flash, session

app = Flask(__name__)
app.secret_key = 'A11YOURBASEAREBEL0NGTOU5'


@app.route("/index")
def index():
	return render_template('/page.html')

if __name__ == "__main__":
    app.debug = True
    app.run('127.0.0.1',1111)