from flask import Flask

from config import DEBUG, HOST, PORT
from extensions import cors, db
from resources import tasks, users


def initialize_app(config="./config.py"):
    """Initialises the app with imported extentions"""
    todo_app = Flask(__name__)
    todo_app.config.from_pyfile(config)
    register_all_extensions(todo_app)
    register_all_blueprints(todo_app)
    todo_app.run(debug=DEBUG, host=HOST, port=PORT)


def register_all_extensions(app):
    """Registers flask extensions"""
    cors.init_app(app)
    db.init_app(app)


def register_all_blueprints(app):
    """Registers flask blueprints from resources import"""
    app.register_blueprint(users.users_api, url_prefix="/v1")
    app.register_blueprint(tasks.tasks_api, url_prefix="/v1")


if __name__ == "__main__":
    initialize_app()
