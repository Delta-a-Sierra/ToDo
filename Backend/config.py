from secrets import token_urlsafe

from argon2 import PasswordHasher
from environ import Env

env = Env()
env.read_env()

SQLALCHEMY_DATABASE_URI = env("db_uri")
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = token_urlsafe(24)

DEBUG = env("app_debug")
HOST = env("app_host")
PORT = env("app_port")

HASHER = PasswordHasher()
