from pymongo import MongoClient

uri = "mongodb+srv://Javier:ECE461@cluster0.068zylu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tlsAllowInvalidCertificates=true"

class User:
    def __init__(self):
        self.client = MongoClient(uri)
        self.db = self.client.Management
        self.user_collection = self.db.Users

    @staticmethod
    def encrypt(password):
        return "".join(chr((ord(char) + 3) % 126) for char in password)

    @staticmethod
    def decrypt(encrypted_password):
        return "".join(chr((ord(char) - 3) % 126) for char in encrypted_password)

    def sign_up(self, username, password):
        if self.user_collection.find_one({'username': username}):
            return False, "Username already exists."
        encrypted_password = self.encrypt(password)
        self.user_collection.insert_one({'username': username, 'password': encrypted_password})
        return True, "User created successfully."

    def sign_in(self, username, password):
        user = self.user_collection.find_one({'username': username})
        if user and self.decrypt(user['password']) == password:
            return True, "Login successful."
        return False, "Invalid username or password."