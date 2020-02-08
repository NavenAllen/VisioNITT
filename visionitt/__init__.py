import os

from flask import (
    Flask, render_template )


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'visionitt.sqlite'),
    )

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    from . import gate
    app.register_blueprint(gate.bp)

    # a simple page that says hello
    @app.route('/')
    def home():
        return render_template('base.html')

    return app
