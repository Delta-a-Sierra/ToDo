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
    return todo_app


def register_all_extensions(todo_app):
    """Registers flask extensions"""
    cors.init_app(todo_app)
    db.init_app(todo_app)


def register_all_blueprints(todo_app):
    """Registers flask blueprints from resources import"""
    todo_app.register_blueprint(users.users_api, url_prefix="/v1")
    todo_app.register_blueprint(tasks.tasks_api, url_prefix="/v1")


if __name__ == "__main__":
    initialize_app()
