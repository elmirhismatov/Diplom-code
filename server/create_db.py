import sqlite3

conn = sqlite3.connect('comments.db')
c = conn.cursor()
c.execute('''CREATE TABLE comments
             (id integer,username string, comment text)''')
conn.commit()
conn.close()