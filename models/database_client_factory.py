from arango import ArangoClient
from pymongo import MongoClient

from models.exception import DatabaseRegistrationException, DatabaseConnectionException


class DatabaseClient:
    def __init__(self):
        pass

    def connect_database(self, database_access):
        pass


class MongoDatabaseClient(DatabaseClient):
    def __init__(self):
        super().__init__()
        self.client = MongoClient

    def connect_database(self, database_access):

        client = self.client(database_access.host, username=database_access.username, password=database_access.password, authSource=database_access.database)
        try:
            database = client[database_access.database]
            return database
        except Exception as e:
            raise DatabaseConnectionException(details=f"Error: unable to connect to MongoDatabase {database_access}. {e}")

    def __repr__(self):
        return "MongoDatabaseClient"


class ArangoDatabaseClient(DatabaseClient):
    def __init__(self):
        super().__init__()
        self.client = ArangoClient

    def connect_database(self, database_access):
        client = self.client(hosts=database_access.host)
        try:
            database = client.db(database_access.database, username=database_access.username, password=database_access.password)
            return database
        except Exception as e:
            raise DatabaseConnectionException(details=f"Error: unable to connect to ArangoDatabase {database_access}. {e}")

    def __repr__(self):
        return "ArangoDatabaseClient"


class DatabaseAccess:
    def __init__(self, client, host, database, username, password):
        self.client = client
        self.host = host
        self.database = database
        self.username = username
        self.password = password

    def __repr__(self):
        return f"{{database:{self.database}}}"


class DatabaseClientFactory:
    def __init__(self):
        self.registered_database_access = dict()

    def register_access(self, name, database_access):
        if name in self.registered_database_access.keys():
            raise DatabaseRegistrationException(details=f"Error: {name} already in registered_database_access:{self.registered_database_access.keys()}")
        else:
            self.registered_database_access[name] = database_access

    def get_access(self, name):
        if name not in self.registered_database_access:
            raise DatabaseRegistrationException(details=f"Error: {name} not in registered_database_access:{self.registered_database_access.keys()}")
        else:
            access = self.registered_database_access[name]
            database = access.client.connect_database(access)
            return database


