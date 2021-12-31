# from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
#
#
# class TripletExtractor:
#     def __init__(self, tokenizer_model="Babelscape/rebel-large", seq2seq_model="Babelscape/rebel-large", length_penalty=10):
#         self.tokenizer = AutoTokenizer.from_pretrained(tokenizer_model)
#         self.seq2seq_model = AutoModelForSeq2SeqLM.from_pretrained(seq2seq_model)
#         self.gen_kwargs = {
#             "max_length": 256,
#             "length_penalty": length_penalty,
#             "num_beams": 5,
#             "num_return_sequences": 1,
#         }
#
#     def _extract_triplets(self, text):
#         triplets = []
#         relation, subject, relation, object_ = '', '', '', ''
#         text = text.strip()
#         current = 'x'
#         for token in text.replace("<s>", "").replace("<pad>", "").replace("</s>", "").split():
#             if token == "<triplet>":
#                 current = 't'
#                 if relation != '':
#                     triplets.append({'from': subject.strip(), 'value': relation.strip(),'to': object_.strip()})
#                     relation = ''
#                 subject = ''
#             elif token == "<subj>":
#                 current = 's'
#                 if relation != '':
#                     triplets.append({'from': subject.strip(), 'value': relation.strip(),'to': object_.strip()})
#                 object_ = ''
#             elif token == "<obj>":
#                 current = 'o'
#                 relation = ''
#             else:
#                 if current == 't':
#                     subject += ' ' + token
#                 elif current == 's':
#                     object_ += ' ' + token
#                 elif current == 'o':
#                     relation += ' ' + token
#         if subject != '' and relation != '' and object_ != '':
#             triplets.append({'from': subject.strip(), 'value': relation.strip(),'to': object_.strip()})
#         return triplets
#
#     def get_triplets_list(self, text):
#         model_inputs = self.tokenizer(text, max_length=256, padding=True, truncation=True, return_tensors='pt')
#         generated_tokens = self.seq2seq_model.generate(
#             model_inputs["input_ids"].to(self.seq2seq_model.device),
#             attention_mask=model_inputs["attention_mask"].to(self.seq2seq_model.device),
#             **self.gen_kwargs,
#         )
#         encoded_prediction = self.tokenizer.batch_decode(generated_tokens, skip_special_tokens=False)
#         return self._extract_triplets(encoded_prediction[0])
#
#     def get_graphin_json(self, text):
#         nodes = set()
#         edges = self.get_triplets_list(text)
#
#         for tripet in edges:
#             fromnode, tonode , value = tripet["from"], tripet["to"], tripet["value"]
#             nodes.add(fromnode)
#             nodes.add(tonode)
#         nodes = list(nodes)
#         return {"nodes": nodes, "edges": edges}

