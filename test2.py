
from models.database_client_factory import DatabaseAccess, ArangoDatabaseClient, DatabaseClientFactory

arangodb_client = ArangoDatabaseClient()
database_factory = DatabaseClientFactory()

# define how to access to the database
arangodb_access_test = DatabaseAccess(client=arangodb_client, host="http://fsechaii.local:8529",
                                 database="test", username="User", password="haiiUser")
arangodb_access_haii = DatabaseAccess(client=arangodb_client, host="http://fsechaii.local:8529",
                                 database="haiiArangodb", username="User", password="haiiUser")

# define a name linked to the access
database_factory.register_access(name="arangodb_test", database_access=arangodb_access_test)
database_factory.register_access(name="arangodb_haii", database_access=arangodb_access_haii )


# access the database test
print("get data from {Database: test}")
db_test = database_factory.get_access("arangodb_test")
test_student_collection = db_test.collection(name="students")
print(list(test_student_collection))
print(test_student_collection.get("Bob"))
print(test_student_collection.get("Bob")["last"])

# access the database haiiarangodb
print("\nget data from {Database: haiiArangodb}")
db_haii = database_factory.get_access("arangodb_haii")
haii_student_collection = db_haii.collection(name="student")
print(list(haii_student_collection))