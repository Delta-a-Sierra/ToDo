import config
from auth import auth
from models import db, todo_app
from resources.users import users_api

DEBUG = True
HOST = "127.0.0.1"
PORT = 8000

todo_app.register_blueprint(users_api)

# view to test auth
@todo_app.route("/test")
@auth.login_required
def test():
    return "Hello World!"


if __name__ == "__main__":
    db.create_all()
    todo_app.run(debug=DEBUG, host=HOST, port=PORT)
