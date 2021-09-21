from flask import g
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth, MultiAuth

from models import User

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()
auth = MultiAuth(token_auth, basic_auth)


@basic_auth.verify_password
def verify_login(email, password):
    email = email.lower()
    user = User.query.filter_by(email=email).first()
    try:
        if not user.verify_password(password):
            return False
    # Throws an AttributeError if email not found
    except AttributeError:
        return False
    g.user = user
    return True


@token_auth.verify_token
def verify_token(token):
    user = User.verify_auth_token(token)
    if user is not None:
        g.user = user
        return True
    return False
