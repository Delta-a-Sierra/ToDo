"""Factory for creating all resource instances"""
from flask import Blueprint

from ..extensions import api
from .icons import Icon, IconList
from .tasks import Task, TaskList
from .users import UserList, UserLogin, UserSignup


def icons_api():
    icons_api = Blueprint("res_icons", __name__)
    api.init_app(icons_api)
    api.add_resource(IconList, "/icons", endpoint="icons")
    api.add_resource(Icon, "/icons/<int:id>", endpoint="icon")
    return icons_api


def users_api():
    users_api = Blueprint("res_users", __name__)
    api.init_app(users_api)
    api.add_resource(UserSignup, "/signup", endpoint="signup")
    api.add_resource(UserLogin, "/login", endpoint="login")
    api.add_resource(UserList, "/users", endpoint="users")
    return users_api


def tasks_api():
    tasks_api = Blueprint("res_tasks", __name__)
    api.init_app(tasks_api)
    api.add_resource(TaskList, "/tasks", endpoint="tasks")
    api.add_resource(Task, "/tasks/<int:id>", endpoint="task")
    return tasks_api
