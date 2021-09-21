from auth import auth
from config import DEBUG, HOST, PORT
from models import db, todo_app
from resources.tasks import tasks_api
from resources.users import users_api

todo_app.register_blueprint(users_api, url_prefix="/v1")
todo_app.register_blueprint(tasks_api, url_prefix="/v1")

# view to test auth
@todo_app.route("/test")
@auth.login_required
def test():
    return "Hello World!"


if __name__ == "__main__":
    db.create_all()
    todo_app.run(debug=DEBUG, host=HOST, port=PORT)
