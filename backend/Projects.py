from pymongo import MongoClient

uri = "mongodb+srv://Javier:ECE461@cluster0.068zylu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tlsAllowInvalidCertificates=true"

class Project:
    def __init__(self):
        self.client = MongoClient(uri)
        self.db = self.client.Management
        self.project_collection = self.db.Projects

    def create_project(self, projectID, project_name, description):
        if self.project_collection.find_one({"projectID": projectID}):
            return False, "Project ID already exists."
        self.project_collection.insert_one({
            "projectID": projectID,
            "Name": project_name,
            "Description": description,
        })
        return True, "Project created successfully."

    def join_project(self, projectID):
        project = self.project_collection.find_one({"projectID": projectID})
        if not project:
            return False, "Project not found."
        return True, "User successfully joined the project."
