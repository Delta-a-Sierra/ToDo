# from datetime import datetime

from auth import token_auth
from flask import Blueprint, g
from flask_restful import Api, Resource, fields, marshal, reqparse
from models import Task

task_fields = {
    "id": fields.Integer,
    "title": fields.String,
    "description": fields.String,
    "due_date": fields.DateTime,
    "created_at": fields.DateTime,
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
        # type=datetime.strptime when i know input format
        self.reqparse.add_argument(
            "due_date",
            help="Please provide a constant datetime format",
            location=["form", "json"],
        )
        super().__init__()

    @token_auth.login_required
    def get(self):
        task_list = Task.query.filter(Task.owner_id == g.user.id).all()
        if not task_list:
            return "", 204
        response = {
            "message": "Retrieved all user tasks",
            "tasks": marshal(task_list, task_fields),
        }
        return response, 200


tasks_api = Blueprint("res_tasks", __name__)
api = Api(tasks_api)
api.add_resource(TaskList, "/tasks", endpoint="tasks")
