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
    success, message = user_ops.sign_up(data['userid'], data['username'], data['password'])
    return jsonify({'message': message}), 201 if success else 400

@app.route('/signin', methods=['POST'])
def signin():
    data = request.json
    success, message = user_ops.sign_in(data['userid'], data['username'], data['password'])
    return jsonify({'message': message}), 200 if success else 401

@app.route('/createproject', methods=['POST'])
def create_project():
    data = request.json
    success, message = project_ops.create_project(data['projectID'], data['project_name'], data['description'])
    if success:
        hwset_ops.initialize_hw_sets_for_project(data['projectID'])
        message += " Hardware sets initialized."
    return jsonify({'message': message}), 200 if success else 402

@app.route('/joinproject', methods=['POST'])
def join_project():
    data = request.json
    success, message = project_ops.join_project(data['projectID'])
    return jsonify({'message': message}), 200 if success else 403

@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.json
    success, message = hwset_ops.check_out(data['userID'], data['projectID'], data['HWSetName'], data['quantity'])
    return jsonify({'message': message}), 200 if success else 402

@app.route('/checkin', methods=['POST'])
def checkin():
    data = request.json
    success, message = hwset_ops.check_in(data['userID'], data['projectID'], data['HWSetName'], data['quantity'])
    return jsonify({'message': message}), 200 if success else 404


@app.route('/availability-capacity', methods=['GET'])
def get_hardware_availability_capacity_for_project():
    projectID = request.args.get('projectID')
    availability_capacity_info = hwset_ops.get_availability_and_capacity_for_project(projectID)
    if availability_capacity_info:
        return jsonify({
            "HWSet1 Availability": result[0],
            "HWSet1 Capacity": result[1],
            "HWSet2 Availability": result[2],
            "HWSet2 Capacity": result[3]
        }), 200
    else:
        return jsonify({"message": "No hardware set found for the specified project"}), 404

if __name__ == '__main__':
    app.run(debug=True)
