"""Additional functions and classes used by app"""
from flask import abort, g, jsonify
from flask_restful import fields

from . import models


class CustomDateFormat(fields.Raw):
    """class for marshalling datetimes"""

    def format(self, value):
        return value.strftime("%a, %d %b %Y")


def json_abort(status, message=None):
    """Abort function that returns JSON instead of HTML"""
    data = {"abort": {"message": message, "status": status}}
    response = jsonify(data)
    response.status_code = status
    abort(response)


def get_task(id):
    """Attempts to retrieve task by id, then checks owner_id foreign key"""
    task = models.Task.query.get(id)
    if not task:
        json_abort(404, "Task does not exist")
    elif not task.owner_id == g.user.id:
        json_abort(401, "Unauthorized Access")
    else:
        return task


def admin_only(func):
    """Decorator to enforce admin restrictions on resources"""

    def check_admin(*args, **kwargs):
        if g.user.is_admin:
            return func(*args, **kwargs)
        json_abort(401, message="Unauthorized Access: Not Admin")

    return check_admin
