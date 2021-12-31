def find_shortest_path(db, word1, word2, node_collection, graph):
    return db.aql.execute(f"FOR a IN {node_collection} FILTER a.text == '{word1}' "
                   f"FOR d IN {node_collection} FILTER d.text == '{word2}' "
                   f"FOR v, e IN OUTBOUND SHORTEST_PATH a TO d GRAPH '{graph}' "
                   "RETURN [e._id, v.text]")


def find_surround_path(db, word, node_collection, graph):
    return db.aql.execute(f"FOR a IN {node_collection} FILTER a.text == '{word}'"
                            f"FOR v,e IN 1..2 OUTBOUND a GRAPH '{graph}' RETURN [e._id, v.text]"
                          )