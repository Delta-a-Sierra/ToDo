from argon2.exceptions import VerifyMismatchError
from flask import g
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth, MultiAuth

from models import User

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()
auth = MultiAuth(token_auth, basic_auth)


@basic_auth.verify_password
def verify_login(email, password):
    user = User.verify_email(email)
    try:
        user.verify_password(password)
    except (VerifyMismatchError, AttributeError):
        return False
    else:
        g.user = user
        return True


@token_auth.verify_token
def verify_token(token):
    user = User.verify_auth_token(token)
    if user:
        g.user = user
        return True
    return False
