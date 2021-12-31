import flask

from endpoints.arangodb_backend import DatabaseBackend
from endpoints.error_handlers import Error

app = flask.Flask(__name__)
# app.config["DEBUG"] = True

# The basic routes
@app.route('/', methods=['GET'])
def home():
    return '''<h1>GraphAlgorithm API</h1>
    <p>Hello world </p>'''

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


# register new endpoints
app.register_blueprint(DatabaseBackend)
app.register_blueprint(Error)

if __name__ == '__main__':
    app.run()