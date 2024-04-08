from pymongo import MongoClient

uri = "mongodb+srv://Javier:ECE461@cluster0.068zylu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tlsAllowInvalidCertificates=true"

class HWSet:
    def __init__(self):
        self.client = MongoClient(uri)
        self.db = self.client.Management
        self.hw_set_collection = self.db.HWSet
        self.user_hw_collection = self.db.UserHW  
        
    def check_out(self, userID, HWSetName, quantity):
        hw_set = self.hw_set_collection.find_one({"Name": HWSetName})
        if hw_set and hw_set["Availability"] >= quantity:
            self.hw_set_collection.update_one(
                {"Name": HWSetName}, 
                {"$inc": {"Availability": -quantity}}
            )
            existing_record = self.user_hw_collection.find_one({"UserID": userID, "HWSetName": HWSetName})
            if existing_record:
                new_quantity = existing_record["Quantity"] + quantity
                self.user_hw_collection.update_one(
                    {"UserID": userID, "HWSetName": HWSetName},
                    {"$set": {"Quantity": new_quantity}}
                )
            else:
                self.user_hw_collection.insert_one(
                    {"UserID": userID, "HWSetName": HWSetName, "Quantity": quantity}
                )
            return True, "Hardware checked out successfully."
        return False, "Insufficient availability or hardware set not found."

    def check_in(self, userID, HWSetName, quantity):
        user_hw = self.user_hw_collection.find_one({"UserID": userID, "HWSetName": HWSetName})
        if user_hw and user_hw["Quantity"] >= quantity:
            self.hw_set_collection.update_one(
                {"Name": HWSetName}, 
                {"$inc": {"Availability": quantity}}
            )
            new_quantity = user_hw["Quantity"] - quantity
            if new_quantity > 0:
                self.user_hw_collection.update_one(
                    {"UserID": userID, "HWSetName": HWSetName},
                    {"$set": {"Quantity": new_quantity}}
                )
            else:
                self.user_hw_collection.delete_one({"UserID": userID, "HWSetName": HWSetName})
            return True, "Hardware checked in successfully."
        return False, "User does not have enough hardware to check in or it was not found."
