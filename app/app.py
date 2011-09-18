from flask import Flask
from flask import render_template
from flask import flash, session

app = Flask(__name__)
app.secret_key = 'A11YOURBASEAREBELONGTOU5'


@app.route("/empty")
def empty():
	return render_template('empty.html')


@app.route("/contacts/config")
def contactsconfig():
	flash('sup...message flash')
	return render_template('contacts/config.html')

@app.route("/contacts/result")
def result():
	return render_template('contacts/result.html')
	
@app.route("/start")
def homepage():
	return render_template('start.html')

@app.route("/landing")
def homepage():
	return render_template('landing.html')


@app.route("/contacts/list")
def contacts():
	return render_template('contacts/list.html')


if __name__ == "__main__":
    app.debug = True
    app.run('0.0.0.0')