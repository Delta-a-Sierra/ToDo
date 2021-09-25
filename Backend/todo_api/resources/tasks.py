from flask import g
from flask_restful import Resource, fields, marshal, reqparse

from .. import models
from ..extensions import auth
from ..utils import CustomDateFormat, get_task

task_fields = {
    "id": fields.Integer,
    "title": fields.String,
    "description": fields.String,
    "due_date": CustomDateFormat,
    "created_at": CustomDateFormat,
}


class TaskList(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            "title",
            required=True,
            help="No title provided",
            location=["form", "json"],
        )
        self.reqparse.add_argument(
            "description",
            location=["form", "json"],
        )
        self.reqparse.add_argument(
            "due_date",
            help="Please provide a date as dd/mm/yyyy",
            location=["form", "json"],
        )
        super().__init__()

    @auth.login_required
    def get(self):
        task_list = models.Task.query.filter(
            models.Task.owner_id == g.user.id
        ).all()
        if not task_list:
            return "", 204
        response = {
            "message": "Retrieved all user tasks",
            "tasks": marshal(task_list, task_fields),
        }
        return response, 200

    @auth.login_required
    def post(self):
        kwargs = self.reqparse.parse_args()
        models.Task.create_task(**kwargs)
        response = {"message": "Task created"}
        return response, 201


class Task(Resource):
    """task resource"""

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            "title",
            location=["form", "json"],
        )
        self.reqparse.add_argument(
            "description",
            location=["form", "json"],
        )
        self.reqparse.add_argument(
            "due_date",
            help="Please provide a date as dd/mm/yyyy",
            location=["form", "json"],
        )
        super().__init__()

    @auth.login_required
    def get(self, id):
        task = get_task(id)
        response = {
            "message": "Retrieved Task",
            "task": marshal(task, task_fields),
        }
        return response, 200

    @auth.login_required
    def put(self, id):
        kwargs = self.reqparse.parse_args()
        task = get_task(id)
        task.edit_task(**kwargs)
        return {"message": "Task updated"}, 200

    @auth.login_required
    def delete(self, id):
        task = get_task(id)
        task.delete_task()
        return {"message": "Task deleted"}, 200
