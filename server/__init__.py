from flask import Flask, redirect, url_for, request, jsonify


from routes.main import mainpg
from routes.zapros_people import coords_bp

# инициализация классов
app = Flask(__name__)



app.register_blueprint(coords_bp)
app.register_blueprint(mainpg)

# запуск приложения
if __name__ == "__main__":
    app.run(debug=True)
