from pymongo import MongoClient

uri = "mongodb+srv://Javier:ECE461@cluster0.068zylu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tlsAllowInvalidCertificates=true"

class HWSet:
    def __init__(self):
        self.client = MongoClient(uri)
        self.db = self.client.Management
        self.hw_set_collection = self.db.HWSet
        self.user_hw_collection = self.db.UserHW

    def initialize_hw_sets_for_project(self, projectID):
        hw_sets = [{'Name': 'HWSet1', 'Capacity': 500, 'Availability': 500},
                   {'Name': 'HWSet2', 'Capacity': 500, 'Availability': 500}]
        
        for hw_set in hw_sets:
            existing_set = self.hw_set_collection.find_one({"ProjectID": projectID, "Name": hw_set['Name']})
            if not existing_set:
                hw_set['ProjectID'] = projectID
                self.hw_set_collection.insert_one(hw_set)
            else:
                self.hw_set_collection.update_one(
                    {"ProjectID": projectID, "Name": hw_set['Name']},
                    {"$set": {"Capacity": hw_set['Capacity'], "Availability": hw_set['Availability']}}
                )

    def check_out(self, userID, projectID, HWSetName, quantity):
        hw_set = self.hw_set_collection.find_one({"Name": HWSetName})
        if hw_set and hw_set["Availability"] >= quantity:
            self.hw_set_collection.update_one(
                {"Name": HWSetName},
                {"$inc": {"Availability": -quantity}}
            )
            existing_record = self.user_hw_collection.find_one({"UserID": userID, "ProjectID": projectID, "HWSetName": HWSetName})
            if existing_record:
                new_quantity = existing_record["Quantity"] + quantity
                self.user_hw_collection.update_one(
                    {"UserID": userID, "ProjectID": projectID, "HWSetName": HWSetName},
                    {"$set": {"Quantity": new_quantity}}
                )
            else:
                self.user_hw_collection.insert_one(
                    {"UserID": userID, "ProjectID": projectID, "HWSetName": HWSetName, "Quantity": quantity}
                )
            return True, "Hardware checked out successfully."
        return False, "Insufficient availability or hardware set not found."

    def check_in(self, userID, projectID, HWSetName, quantity):
        user_hw = self.user_hw_collection.find_one({"UserID": userID, "ProjectID": projectID, "HWSetName": HWSetName})
        if user_hw and user_hw["Quantity"] >= quantity:
            self.hw_set_collection.update_one(
                {"Name": HWSetName},
                {"$inc": {"Availability": quantity}}
            )
            new_quantity = user_hw["Quantity"] - quantity
            if new_quantity > 0:
                self.user_hw_collection.update_one(
                    {"UserID": userID, "ProjectID": projectID, "HWSetName": HWSetName},
                    {"$set": {"Quantity": new_quantity}}
                )
            else:
                self.user_hw_collection.delete_one({"UserID": userID, "ProjectID": projectID, "HWSetName": HWSetName})
            return True, "Hardware checked in successfully."
        return False, "User does not have enough hardware to check in or it was not found."


    def get_availability_and_capacity_for_project(self, projectID):
        hardware_sets = self.hw_set_collection.find({"ProjectID": projectID})
        result = []
        for hw_set in hardware_sets:
            result.append({
                "Name": hw_set["Name"],
                "Availability": hw_set["Availability"],
                "Capacity": hw_set["Capacity"]
            })
        return result

