from flask import Flask, request, jsonify
from Users import User
from Projects import Project
from HWSet import HWSet

app = Flask(__name__)

user_ops = User()
project_ops = Project()
hwset_ops = HWSet()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    success, message = user_ops.sign_in(data['userid'], data['username'], data['password'])
    return jsonify({'message': message}), 201 if success else 400

@app.route('/signin', methods=['POST'])
def signin():
    data = request.json
    success, message = user_ops.sign_in(data['userid'], data['username'], data['password'])
    return jsonify({'message': message}), 200 if success else 401

@app.route('/createproject', methods=['POST'])
def create_project():
    data = request.json
    success, message = project_ops.create_project(
        data['projectID'], data['project_name'], data['description'], data['creator']
    )
    return jsonify({'message': message}), 201 if success else 400

@app.route('/joinproject', methods=['POST'])
def join_project():
    data = request.json
    success, message = project_ops.join_project(data['username'], data['projectID'])
    return jsonify({'message': message}), 200 if success else 400

@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.json
    success, message = hwset_ops.check_out(data['userID'], data['HWSetName'], data['quantity'])
    return jsonify({'message': message}), 200 if success else 400

@app.route('/checkin', methods=['POST'])
def checkin():
    data = request.json
    success, message = hwset_ops.check_in(data['userID'], data['HWSetName'], data['quantity'])
    return jsonify({'message': message}), 200 if success else 400

if __name__ == '__main__':
    app.run(debug=True)
