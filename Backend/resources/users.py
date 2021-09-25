from auth import verify_login
from flask import Blueprint, g
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
            message = {"message": "Email already exists"}
            return message, 409

        verify_login(email=args.email, password=args.password)
        token = g.user.generate_auth_token()
        response = {
            "message": "User created successfully",
            "token": token.decode("ascii"),
        }
        return response, 201


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
        kwargs = self.reqparse.parse_args()
        if verify_login(**kwargs):
            token = g.user.generate_auth_token()
            response = {
                "message": "Login Successful",
                "token": token.decode("ascii"),
            }
            return response, 200
        message = {"message": "Invalid Login Credentials"}
        return message, 401


users_api = Blueprint("res_users", __name__)
api = Api(users_api)
api.add_resource(UserSignup, "/signup", endpoint="signup")
api.add_resource(UserLogin, "/login", endpoint="login")
