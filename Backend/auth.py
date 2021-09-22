from argon2.exceptions import VerifyMismatchError
from flask import g
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth

from models import User

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()


@basic_auth.verify_password
def verify_login(email, password):
    email = email.lower()
    user = User.query.filter_by(email=email).first()
    if user:
        try:
            user.verify_password(password)
        except VerifyMismatchError:
            return False
        else:
            g.user = user
            return True
    return False


@token_auth.verify_token
def verify_token(token):
    user = User.verify_auth_token(token)
    if user is not None:
        g.user = user
        return True
    return False
