import models
from auth import auth
from flask import Blueprint, abort, g
from flask_restful import Api, Resource, fields, marshal, reqparse

icon_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "svg": fields.String,
}


class IconList(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            "name",
            required=True,
            help="No icon name provided",
            location=["form", "json"],
        )
        self.reqparse.add_argument(
            "svg",
            required=True,
            help="No icon svg text provided.",
            location=["json"],
        )
        super().__init__()

    def get(self):
        icon_list = models.Icon.query.all()
        if not icon_list:
            return "", 204
        response = {
            "message": "Retrieved all icons",
            "icons": marshal(icon_list, icon_fields),
        }
        return response, 200

    @auth.login_required
    def post(self):
        g.user.verify_admin()
        kwargs = self.reqparse.parse_args()
        models.Icon.create_icon(**kwargs)
        response = {"message": "Icon created"}
        return response, 201


class Icon(Resource):
    def get(self, id):
        icon = models.Icon.query.get_or_404(id)
        response = {
            "message": "Retrieved icon",
            "icon": marshal(icon, icon_fields),
        }
        return response, 200

    @auth.login_required
    def delete(self, id):
        g.user.verify_admin()
        icon = models.Icon.query.get_or_404(id)
        icon.delete_icon()
        return {"message": "Icon deleted"}, 200


icons_api = Blueprint("res_icons", __name__)
api = Api(icons_api)
api.add_resource(IconList, "/icons", endpoint="icons")
api.add_resource(Icon, "/icons/<int:id>", endpoint="icon")
