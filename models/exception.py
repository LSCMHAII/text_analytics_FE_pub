class GeneralException(Exception):

    def __init__(self, message=None, details=None):

        super().__init__()
        self.message = message
        self.details = details
        self.status_code = "400"

    def to_dict(self):
        rv = dict()
        rv['message'] = self.message
        rv['error'] = self.status_code
        rv['details'] = self.details
        return rv

# error code: 400 series , user input errors
# error code: 500 series , user internal server errors


class DatabaseRegistrationException(GeneralException):
    def __init__(self, message="RegisterDatabaseException", details=None):
        super().__init__(message, details)
        self.status_code = "500-201"


class DatabaseConnectionException(GeneralException):
    def __init__(self, message="DatabaseConnectionException", details=None):
        super().__init__(message, details)
        self.status_code = "500-202"

