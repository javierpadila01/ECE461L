from pymongo import MongoClient

uri = "mongodb+srv://Javier:ECE461@cluster0.068zylu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tlsAllowInvalidCertificates=true"

class HWSet:
    def __init__(self):
        self.client = MongoClient(uri)
        self.db = self.client.Management
        self.hw_set_collection = self.db.HWSet

    def check_out(self, name, quantity):
        hw_set = self.hw_set_collection.find_one({'name': name})
        if hw_set and hw_set['availability'] >= quantity:
            self.hw_set_collection.update_one({'name': name}, {'$inc': {'availability': -quantity}})
            return True, "Hardware checked out successfully."
        return False, "Insufficient hardware availability."

    def check_in(self, name, quantity):
        hw_set = self.hw_set_collection.find_one({'name': name})
        if hw_set:
            new_availability = hw_set['availability'] + quantity
            # Ensure we don't exceed initial capacity
            if new_availability > hw_set['capacity']:
                new_availability = hw_set['capacity']
            self.hw_set_collection.update_one({'name': name}, {'$set': {'availability': new_availability}})
            return True, "Hardware checked in successfully."
        return False, "Hardware set not found."
