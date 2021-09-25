from argon2 import PasswordHasher
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth, MultiAuth
from flask_sqlalchemy import SQLAlchemy

# database instances
db = SQLAlchemy()

# cors instances
cors = CORS()

# auth instances
HASHER = PasswordHasher()
basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()
auth = MultiAuth(token_auth, basic_auth)
