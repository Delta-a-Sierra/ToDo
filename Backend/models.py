from datetime import datetime

from argon2 import PasswordHasher
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from itsdangerous import BadSignature, SignatureExpired
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from sqlalchemy.exc import IntegrityError

HASHER = PasswordHasher()

todo_app = Flask(__name__)
todo_app.config.from_pyfile("config.py")
db = SQLAlchemy(todo_app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self):
        return f"""User:
        id = {self.id}
        email = {self.email}
        password = {self.password}
        first_name = {self.first_name}
        last_name = {self.last_name}
        created_at = {self.created_at}"""

    @classmethod
    def create_user(cls, email, password, first_name, last_name):
        email = email.lower()
        password = HASHER.hash(password)
        user = cls(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        db.session.add(user)
        try:
            db.session.commit()
        except IntegrityError:
            return False
        else:
            return True

    @staticmethod
    def verify_auth_token(token):
        serializer = Serializer(todo_app.secret_key)
        try:
            data = serializer.loads(token)
        except (SignatureExpired, BadSignature):
            return None
        else:
            user = User.query.filter_by(id=data["id"]).first()
            return user

    def verify_password(self, password):
        return HASHER.verify(self.password, password)

    def generate_auth_token(self):
        serializer = Serializer(todo_app.secret_key, expires_in=604800)
        return serializer.dumps({"id": self.id})

    def verify_admin(self):
        if self.is_admin:
            return True
        return False


class Icon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    svg = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"""Icon:
        name = {self.name}
        svg = {self.svg}"""


class TaskGroup(db.Model):
    __tablename__ = "task groups"

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(100), nullable=False)
    group_description = db.Column(db.Text, nullable=True)

    owner_id = db.Column(db.ForeignKey("user.id"))
    owner = db.relationship(
        "User", backref=db.backref("task_groups", cascade="all, delete-orphan")
    )

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
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    due_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    task_g_id = db.Column(db.ForeignKey("task groups.id"))
    task_g = db.relationship(
        "TaskGroup", backref=db.backref("tasks", cascade="all, delete-orphan")
    )

    owner_id = db.Column(db.ForeignKey("user.id"))
    owner = db.relationship(
        "User", backref=db.backref("tasks", cascade="all, delete-orphan")
    )

    def __repr__(self):
        return f"""Task:
        id = {self.id}
        title = {self.title}
        description = {self.description}
        due_date = {self.due_date}
        created_at = {self.created_at}
        owner_id = {self.owner_id}"""
