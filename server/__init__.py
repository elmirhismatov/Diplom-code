from flask import Flask, render_template, redirect, url_for, request, jsonify
import sqlite3

from routes.main import mainpg
from routes.zapros_people import coords_bp

# инициализация классов
app = Flask(__name__)


app.register_blueprint(coords_bp)
app.register_blueprint(mainpg)

@app.route('/')
def index():
    return render_template('./comment_form.html')

@app.route('/submit_comment', methods=['POST'])
def submit_comment():
    name = request.form['name']
    comment = request.form['comment']

    conn = sqlite3.connect('./comments.sqlite')
    c = conn.cursor()
    c.execute('INSERT INTO comments (name, comment) VALUES (?, ?)', (name, comment))
    conn.commit()
    conn.close()

    return redirect(url_for('show_comments'))

@app.route('/comments')
def show_comments():
    conn = sqlite3.connect('./comments.sqlite')
    c = conn.cursor()
    c.execute('SELECT name, comment FROM comments ORDER BY rowid DESC LIMIT 6')
    comments = c.fetchall()
    conn.close()

    return render_template('comments.html', comments=comments)
   
# запуск приложения
if __name__ == "__main__":
    app.run(debug=True)




    