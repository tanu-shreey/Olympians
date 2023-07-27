import flask
from flask_mysqldb import MySQL
import datetime

app = flask.Flask(__name__)
# app.secret_key = "secret key"

# CONNECT TO THE DATABASE
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'olympics_db'

mysql = MySQL(app)


@app.route('/')
def home():
    return flask.render_template('index.html')

@app.route('/feedback')
def feedback():
    return flask.render_template('Feedback.html')

@app.route('/feedback/submit', methods=['POST'])
def submit_feedback():
    # extracting data from form
    full_name = flask.request.form.get('full_name')
    email = flask.request.form.get('email')
    suggestion = flask.request.form.get('suggestion')
    date_time = datetime.datetime.now()
    print(full_name, email, date_time, suggestion)
    # storing form data in database
    conn = mysql.connect
    cursor = conn.cursor()
    query = "INSERT INTO feedbacks (full_name, email, time, suggestion) VALUES (%s, %s, %s, %s)"
    values = (full_name, email, date_time, suggestion)
    cursor.execute(query, values)
    conn.commit()
    conn.close()
    # Return a 204 response to indicate success without content
    return '', 204

@app.route('/services/games')
def games():
    return flask.render_template('Games.html')

@app.route('/services/games/details')
def game_details():
    return flask.render_template('GameDetails.html')

@app.route('/services/athletes')
def athletes():
    return flask.render_template('Athletes.html')

@app.route('/services/visualization')
def visualization():
    conn = mysql.connect
    cursor = conn.cursor()
    # fetchone returns a tuple and fetchall returns tuple of tuples
    cursor.execute('SELECT COUNT(*) FROM indian_athletes WHERE Medal = "Gold";')
    Gold = cursor.fetchone()[0]
    cursor.execute('SELECT COUNT(*) FROM indian_athletes WHERE Medal = "Silver";')
    Silver = cursor.fetchone()[0]
    cursor.execute('SELECT COUNT(*) FROM indian_athletes WHERE Medal = "Bronze";')
    Bronze = cursor.fetchone()[0]
    cursor.execute('SELECT COUNT(DISTINCT Name) FROM indian_athletes;')
    Players = cursor.fetchone()[0]
    cursor.execute('SELECT COUNT(DISTINCT Sport) FROM indian_athletes;')
    Sports = cursor.fetchone()[0]
    cursor.execute('SELECT Sport, CAST(AVG(Age) AS INT), ROUND(AVG(Height)), ROUND(AVG(Weight)) FROM indian_athletes GROUP BY Sport;')
    temp = cursor.fetchall()
    Avg_ahw_lables = []
    Avg_a = []
    Avg_h = []
    Avg_w = []
    for (game, a, h, w) in temp:
        Avg_ahw_lables.append(game)
        Avg_a.append(a)
        Avg_h.append(h)
        Avg_w.append(w)
    cursor.execute('SELECT COUNT(*) FROM indian_athletes GROUP BY Sex ORDER BY SEX;')
    temp = cursor.fetchall()
    F = temp[0][0]
    M = temp[1][0]
    cursor.execute('SELECT City, COUNT(*) FROM indian_athletes GROUP by City ORDER by City;')
    temp = cursor.fetchall()
    Cities = []
    Matches = []
    for (city, count) in temp:
        Cities.append(city)
        Matches.append(count)
    cursor.execute('SELECT Name, COUNT(Medal) FROM indian_athletes GROUP BY Name HAVING COUNT(Medal) != 0 ORDER BY Name;')
    temp = cursor.fetchall()
    temp = sorted(temp, key=lambda x: x[1], reverse=True)
    temp = temp[0:10]
    temp = sorted(temp)
    Names = []
    Medals = []
    for (name, count) in temp:
        Names.append(name)
        Medals.append(count)
    data = {
        'Gold': Gold,
        'Silver': Silver,
        'Bronze': Bronze,
        'Players': Players,
        'Sports': Sports,
        'Avg_ahw_labels': Avg_ahw_lables,
        'Avg_a': Avg_a,
        'Avg_h': Avg_h,
        'Avg_w': Avg_w,
        'F': F,
        'M': M,
        'Cities': Cities,
        'Matches': Matches,
        'Names': Names,
        'Medals': Medals,
    }
    conn.close()
    return flask.render_template('Visualization.html', data = data)


#----- functions to return new data ------
@app.route('/services/visualization/chart1')
def get_data_of_chart1():
    update = flask.request.args.get('update')
    conn = mysql.connect
    cursor = conn.cursor()
    data = {}
    if update == 'City':
        cursor.execute('SELECT City, COUNT(Medal) as medals from indian_athletes GROUP BY City ORDER BY medals DESC;')
        temp = cursor.fetchall()
        temp = temp[0:10]
        temp = sorted(temp)
        labels = []
        values = []
        for (city, medals) in temp:
            labels.append(city)
            values.append(medals)
        data.update({'labels': labels})
        data.update({'values': values})
    elif update == 'Player':
        cursor.execute('SELECT Name, COUNT(Medal) FROM indian_athletes GROUP BY Name HAVING COUNT(Medal) != 0 ORDER BY Name;')
        temp = cursor.fetchall()
        temp = sorted(temp, key=lambda x: x[1], reverse=True)
        temp = temp[0:10]
        temp = sorted(temp)
        labels = []
        values = []
        for (name, medals) in temp:
            labels.append(name)
            values.append(medals)
        data.update({'labels': labels})
        data.update({'values': values})
    elif update == 'Sports':
        cursor.execute('SELECT Sport, COUNT(Medal) FROM indian_athletes GROUP BY Sport HAVING COUNT(Medal) != 0 ORDER BY Sport;')
        temp = cursor.fetchall()
        labels = []
        values = []
        for (sport, medals) in temp:
            labels.append(sport)
            values.append(medals)
        data.update({'labels': labels})
        data.update({'values': values})
    elif update == 'Season':
        cursor.execute('SELECT Season, COUNT(Medal) FROM indian_athletes GROUP BY Season;')
        temp = cursor.fetchall()
        labels = []
        values = []
        for (season, medals) in temp:
            labels.append(season)
            values.append(medals)
        data.update({'labels': labels})
        data.update({'values': values})
    elif update == 'Sex':
        cursor.execute('SELECT Sex, COUNT(Medal) FROM indian_athletes GROUP BY Sex;')
        temp = cursor.fetchall()
        labels = []
        values = []
        for (sex, medals) in temp:
            labels.append(sex)
            values.append(medals)
        data.update({'labels': labels})
        data.update({'values': values})
    elif update == 'Year':
        cursor.execute('SELECT Year, COUNT(Medal) as medals FROM indian_athletes GROUP BY Year ORDER BY medals DESC;')
        temp = cursor.fetchall()
        temp = temp[0:10]
        temp = sorted(temp, key=lambda x: x[0])
        labels = []
        values = []
        for (year, medals) in temp:
            labels.append(year)
            values.append(medals)
        data.update({'labels': labels})
        data.update({'values': values})

    conn.close()    
    return flask.jsonify(data)

@app.route('/services/visualization/chart3')
def get_data_of_chart3():
    update = flask.request.args.get('update')
    conn = mysql.connect
    cursor = conn.cursor()
    data = {}
    if update == 'Sports':
        cursor.execute('SELECT Sport, COUNT(DISTINCT Name) as players FROM `indian_athletes` GROUP BY Sport ORDER BY players DESC;')
        temp = cursor.fetchall()
        temp = temp[0:10]
        temp = sorted(temp)
        labels = []
        values = []
        for (sport, players) in temp:
            labels.append(sport)
            values.append(players)
        data.update({'labels': labels})
        data.update({'values': values})
    elif update == 'Season':
        cursor.execute('SELECT Season, COUNT(DISTINCT Name) as players FROM `indian_athletes` GROUP BY Season;')
        temp = cursor.fetchall()
        labels = []
        values = []
        for (season, players) in temp:
            labels.append(season)
            values.append(players)
        data.update({'labels': labels})
        data.update({'values': values})
    elif update == 'Sex':
        cursor.execute('SELECT Sex, COUNT(DISTINCT Name) as players FROM `indian_athletes` GROUP BY Sex;')
        temp = cursor.fetchall()
        labels = []
        values = []
        for (sex, players) in temp:
            labels.append(sex)
            values.append(players)
        data.update({'labels': labels})
        data.update({'values': values})
    elif update == 'Year':
        cursor.execute('SELECT Year, COUNT(DISTINCT Name) as players FROM `indian_athletes` GROUP BY Year ORDER BY players DESC;')
        temp = cursor.fetchall()
        temp = temp[0:10]
        temp = sorted(temp)
        labels = []
        values = []
        for (year, players) in temp:
            labels.append(year)
            values.append(players)
        data.update({'labels': labels})
        data.update({'values': values})

    conn.close()    
    return flask.jsonify(data)

@app.route('/olympians/get_feedback_data')
def get_feedback_data():
    conn = mysql.connect
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM feedbacks ORDER BY time DESC;')
    data = cursor.fetchall()
    conn.close()    
    return flask.jsonify(data)


##_____________+_+_______________##
if __name__ == "__main__":
    app.run(debug=True)
