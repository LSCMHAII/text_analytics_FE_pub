import flask
from bson import json_util
from flask import Blueprint, request
from models.database_client_factory import MongoDatabaseClient, DatabaseClientFactory, DatabaseAccess, \
    ArangoDatabaseClient
from services.arango_graph_operation import find_shortest_path

# initialization
DatabaseBackend = Blueprint('DatabaseBackend', __name__)
arangodb_client = ArangoDatabaseClient()
mongodb_client = MongoDatabaseClient()
database_factory = DatabaseClientFactory()

# define database access
arangodb_access = DatabaseAccess(client=arangodb_client, host="http://fsechaii.local:8529",
                                 database="test", username="User", password="haiiUser")

conceptnet_access = DatabaseAccess(client=arangodb_client, host="http://fsechaii.local:8529",
                                 database="ConceptNet", username="User", password="haiiUser")

mongodb_access = DatabaseAccess(client=mongodb_client, host="fsechaii.local:27017",
                                 database="newsdb", username="lscmhaii", password="haii_coke")


# register a name for database accesses. After registration, we can use the name(a string) to access the database
database_factory.register_access(name="arangodb_test", database_access=arangodb_access)
database_factory.register_access(name="concept_net", database_access=conceptnet_access)
database_factory.register_access(name="mongo_test", database_access=mongodb_access)


@DatabaseBackend.route('/arangodb', methods=['GET'])
def get_arangodb_document():
    student = database_factory.get_access("arangodb_test").collection(name="students").get("john")
    print(student)
    return flask.jsonify(student)


@DatabaseBackend.route('/conceptnet', methods=['GET'])
def get_arangodb_conceptnet_shortest_path():
    word1 = request.args.get('word1')
    word2 = request.args.get('word2')
    conceptnet = database_factory.get_access("concept_net")
    result = list(find_shortest_path(db=conceptnet, word1=word1, word2=word2, node_collection="Word", graph='ConceptNet'))
    # transform database output into json format with nodes and edges .
    nodes = [term[1] for term in result]
    relations = [term[0].split("/")[0] for term in result[1:]]
    edges = list({"from": start_node, "value": value,  "to": end_node} for start_node, end_node, value in zip(nodes[:-1], nodes[1:], relations))
    print(result)
    return flask.jsonify(dict(nodes=nodes, edges=edges))


@DatabaseBackend.route('/test', methods=['GET'])
def get_test():
    test = {'nodes': ['Virginia Sorenson', 'Tamara Durand', '71', 'Wilhelm Hospel', '56', 'Jane Kulich', '79', 'LeAnna Owen', '81', '52'], 'edges': [{'from': 'Virginia Sorenson', 'value': 'date of death', 'to': '79'}, {'from': 'LeAnna Owen', 'value': 'date of death', 'to': '71'}, {'from': 'Jane Kulich', 'value': 'date of death', 'to': '52'}, {'from': 'Jane Kulich', 'value': 'date of death', 'to': '52'}, {'from': 'Wilhelm Hospel', 'value': 'date of death', 'to': '81'}, {'from': 'Tamara Durand', 'value': 'date of death', 'to': '52'}, {'from': 'Tamara Durand', 'value': 'date of death', 'to': '52'}, {'from': '52', 'value': 'number of participants', 'to': '52'}, {'from': '52', 'value': 'number of participants', 'to': '56'}, {'from': '52', 'value': 'number of participants', 'to': '56'}]}
    print(test)
    return flask.jsonify(test)


@DatabaseBackend.route('/mongodb', methods=['GET'])
def get_mongodb_document():
    student2 = list(database_factory.get_access("mongo_test")["test"].find({}, {'_id': False}))
    print(student2)
    return json_util.dumps(student2)

# @DatabaseBackend.route('/triplet', methods=['GET'])
# def get_triplet():
#     text = request.args.get("text", None)
#     if text is None:
#         raise Exception
#     result = triplet_extractor.get_graphin_json(text)
#     print(result)
#     return flask.jsonify(result)



