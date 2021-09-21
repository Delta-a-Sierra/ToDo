from secrets import token_urlsafe

SQLALCHEMY_DATABASE_URI = "sqlite:///todo.db"
SECRET_KEY = token_urlsafe(24)
