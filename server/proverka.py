import sqlite3

conn = sqlite3.connect('comments.db')
c = conn.cursor()
c.execute('SELECT * FROM comments')
print(c.fetchall())
conn.close()