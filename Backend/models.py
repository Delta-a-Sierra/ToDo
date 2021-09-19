from datetime import datetime

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

todo_app = Flask(__name__)
todo_app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todo.db"
db = SQLAlchemy(todo_app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f"""User:
        id = {self.id}
        email = {self.email}
        password = {self.password}
        first_name = {self.first_name}
        last_name = {self.last_name}"""


class Icon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    svg = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"""Icon:
        name = {self.name}
        svg = {self.svg}"""


class TaskGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(), nullable=False)
    group_description = db.Column(db.Text, nullable=True)

    owner_id = db.Column(db.ForeignKey("user.id"))
    owner = db.relationship("User", backref=db.backref("task_groups"))

    icon_id = db.Column(db.ForeignKey("icon.id"))
    icon = db.relationship("Icon", backref=db.backref("task_group"))

    def __repr__(self):
        return f"""TaskGroup:
        id = {self.id}
        group_name = {self.group_name}
        group_description = {self.group_description}
        owner_id = {self.owner_id}
        icon_id = {self.icon.id}"""


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text, nullable=True)
    due_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    owner_id = db.Column(db.ForeignKey("user.id"))
    owner = db.relationship("User", backref=db.backref("tasks"))

    def __repr__(self):
        return f"""Task:
        id = {self.id}
        title = {self.title}
        description = {self.description}
        due_date = {self.due_date}
        created_at = {self.created_at}
        owner_id = {self.owner_id}"""
