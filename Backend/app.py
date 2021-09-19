import config
from models import Task, User, db, todo_app

if __name__ == "__main__":
    db.create_all()

    # cj = User(
    #     email="carltonlnd@hotmail.com",
    #     password="Password123",
    #     first_name="Carlton",
    #     last_name="Nunes Desouza",
    # )
    # task = Task(title="todo models", owner_id=1)
    # db.session.add(task)
    # db.session.add(cj)
    # db.session.commit()

    # todo_app.run(debug=config.DEBUG, host=config.HOST, port=config.PORT)
