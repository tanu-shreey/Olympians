import flask
from flask_mysqldb import MySQL

app = flask.Flask(__name__)
# app.secret_key = "secret key"

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'olympics_db'

mysql = MySQL(app)


@app.route('/')
def home():
    return flask.render_template('home_page.html')

@app.route('/feedback')
def feedback():
    return flask.render_template('feedback.html')

if __name__ == "__main__":
    app.run(debug=True)
