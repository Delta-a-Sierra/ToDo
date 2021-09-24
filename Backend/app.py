from flask_cors import CORS

from config import DEBUG, HOST, PORT
from models import app, db
from resources import tasks, users


def initialize_app(app):
    """Initialises the app with imported extentions"""
    register_all_extensions(app)
    register_all_blueprints(app)
    return app


def register_all_extensions(app):
    """Registers flask extensions"""
    CORS(app)


def register_all_blueprints(app):
    """Registers flask blueprints from resources import"""
    app.register_blueprint(users.users_api, url_prefix="/v1")
    app.register_blueprint(tasks.tasks_api, url_prefix="/v1")


if __name__ == "__main__":
    app = initialize_app(app)
    db.create_all()
    app.run(debug=DEBUG, host=HOST, port=PORT)
