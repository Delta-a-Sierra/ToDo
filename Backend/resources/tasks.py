import models
from extensions import auth
from flask import Blueprint, abort, g
from flask_restful import Api, Resource, fields, marshal, reqparse


class MyDateFormat(fields.Raw):
    """class for marshalling datetimes"""

    def format(self, value):
        return value.strftime("%a, %d %b %Y")


task_fields = {
    "id": fields.Integer,
    "title": fields.String,
    "description": fields.String,
    "due_date": MyDateFormat,
    "created_at": MyDateFormat,
}


def task_ownership(id):
    """Attempts to retrieve task by id, then checks owner_id foreign key"""
    task = models.Task.query.get(id)
    if not task:
        abort(404)
    elif not task.owner_id == g.user.id:
        abort(401)
    else:
        return task


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
        task = task_ownership(id)
        response = {
            "message": "Retrieved Task",
            "task": marshal(task, task_fields),
        }
        return response, 200

    @auth.login_required
    def put(self, id):
        kwargs = self.reqparse.parse_args()
        task = task_ownership(id)
        task.edit_task(**kwargs)
        return {"message": "Task updated"}, 200

    @auth.login_required
    def delete(self, id):
        task = task_ownership(id)
        task.delete_task()
        return {"message": "Task deleted"}, 200


tasks_api = Blueprint("res_tasks", __name__)
api = Api(tasks_api)
api.add_resource(TaskList, "/tasks", endpoint="tasks")
api.add_resource(Task, "/tasks/<int:id>", endpoint="task")
