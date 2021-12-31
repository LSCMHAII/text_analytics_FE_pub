from flask import Blueprint, jsonify

from models.exception import DatabaseRegistrationException, DatabaseConnectionException

Error = Blueprint('Error', __name__)


@Error.app_errorhandler(DatabaseRegistrationException)
def database_registration_error(e):
    return jsonify(e.to_dict())


@Error.app_errorhandler(DatabaseConnectionException)
def database_connection_error(e):
    return jsonify(e.to_dict())