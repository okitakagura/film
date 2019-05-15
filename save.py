from pymongo import *
import json


class JsonToMongo(object):
    def __init__(self):
        self.host = 'localhost'
        self.port = 27017


    def __open_file(self):
        self.file = open('films_all.json', 'r')

        self.client = MongoClient(self.host, self.port)

        self.db = self.client.tencent

        self.collection = self.db.jobs


    def __close_file(self):
        self.file.close()


    def write_database(self):
        self.__open_file()


        data = json.load(self.file)

        try:
            self.collection.insert(data)
            print 'success'
        except Exception as e:
            print e
        finally:
            self.__close_file()


if __name__ == '__main__':
    j2m = JsonToMongo()
    j2m.write_database()