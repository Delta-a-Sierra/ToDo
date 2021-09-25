from datetime import datetime

from flask import g
from itsdangerous import BadSignature, SignatureExpired
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from sqlalchemy.exc import IntegrityError

from .config import SECRET_KEY
from .extensions import HASHER, db
from .utils import json_abort


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self):
        return f"""User(
            id={self.id}
            email={self.email}
            password={self.password}
            first_name={self.first_name}
            last_name={self.last_name}
            created_at={self.created_at}
            is_admin={self.is_admin})"""

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
        serializer = Serializer(SECRET_KEY)
        try:
            data = serializer.loads(token)
        except (SignatureExpired, BadSignature):
            return False
        else:
            user = User.query.filter_by(id=data["id"]).first()
            return user

    @staticmethod
    def verify_email(email):
        email = email.lower()
        user = User.query.filter_by(email=email).first()
        if user:
            return user
        return False

    def verify_password(self, password):
        return HASHER.verify(self.password, password)

    def generate_auth_token(self):
        serializer = Serializer(SECRET_KEY, expires_in=604800)
        return serializer.dumps({"id": self.id})


class Icon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    svg = db.Column(db.Text, nullable=False)

    @classmethod
    def create_icon(cls, name, svg):
        icon = cls(name=name, svg=svg)
        db.session.add(icon)
        db.session.commit()

    def delete_icon(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f"""Icon(
            id={self.id}
            name={self.name}
            svg={self.svg})"""


class TaskGroup(db.Model):
    __tablename__ = "task_groups"

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(100), nullable=False)
    group_description = db.Column(db.Text, nullable=True)

    owner_id = db.Column(db.ForeignKey("user.id"))
    owner = db.relationship(
        "User", backref=db.backref("task_groups", cascade="all, delete-orphan")
    )

    icon_id = db.Column(db.ForeignKey("icon.id"), default=1)
    icon = db.relationship("Icon", backref=db.backref("task_group"))

    def __repr__(self):
        return f"""TaskGroup(
            id={self.id}
            group_name={self.group_name}
            group_description={self.group_description}
            owner_id={self.owner_id}
            icon_id={self.icon.id})"""


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    due_date = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    task_g_id = db.Column(db.ForeignKey("task_groups.id"))
    task_g = db.relationship(
        "TaskGroup", backref=db.backref("tasks", cascade="all, delete-orphan")
    )

    owner_id = db.Column(db.ForeignKey("user.id"))
    owner = db.relationship(
        "User", backref=db.backref("tasks", cascade="all, delete-orphan")
    )

    @classmethod
    def create_task(cls, title, description, due_date):
        owner_id = g.user.id
        if due_date:
            due_date = datetime.strptime(due_date, "%d/%m/%Y").date()
        task = cls(
            title=title,
            description=description,
            due_date=due_date,
            owner_id=owner_id,
        )
        db.session.add(task)
        db.session.commit()
        return True

    def edit_task(self, **kwargs):
        for key, value in kwargs.items():
            if key == "due_date" and value:
                self.due_date = datetime.strptime(
                    kwargs.get(key), "%d/%m/%Y"
                ).date()
            elif value:
                self.__setattr__(key, value)
        db.session.commit()

    def delete_task(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f"""Task(
            id={self.id}
            title={self.title}
            description={self.description}
            due_date={self.due_date}
            created_at={self.created_at}
            owner_id={self.owner_id})"""
