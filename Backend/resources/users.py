from auth import verify_login
from flask import Blueprint, g, jsonify, make_response
from flask_restful import Api, Resource, reqparse
from models import User


class UserSignup(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            "email",
            required=True,
            help="Error: No email provided",
            location=["form", "json"],
        )
        self.reqparse.add_argument(
            "password",
            required=True,
            help="Error: No password provided",
            location=["form", "json"],
        )
        self.reqparse.add_argument(
            "first_name",
            required=True,
            help="Error: No first name provided",
            location=["form", "json"],
        )
        self.reqparse.add_argument(
            "last_name",
            required=True,
            help="Error: No last name provided",
            location=["form", "json"],
        )
        super().__init__()

    def post(self):
        args = self.reqparse.parse_args()
        result = User.create_user(**args)
        if result == False:
            message = jsonify(message="Email already exists")
            return make_response(message, 409)
        verify_login(email=args.email, password=args.password)
        token = g.user.generate_auth_token()
        response = {
            "message": "User created successfully",
            "token": token.decode("ascii"),
        }
        return make_response(response, 201)


class UserLogin(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            "email",
            required=True,
            help="Error: no email provided",
            location=["form", "json"],
        )
        self.reqparse.add_argument(
            "password",
            required=True,
            help="Error: No password provided",
            location=["form", "json"],
        )
        super().__init__()

    def post(self):
        args = self.reqparse.parse_args()
        if verify_login(**args):
            token = g.user.generate_auth_token()
            response = {
                "message": "Login Successful",
                "token": token.decode("ascii"),
            }
            return make_response(response, 200)
        message = jsonify(message="Invalid Login Credentials")
        return make_response(
            message,
            401,
        )


users_api = Blueprint("res_users", __name__)
api = Api(users_api)
api.add_resource(UserSignup, "/v1/signup", endpoint="signup")
api.add_resource(UserLogin, "/v1/login", endpoint="login")
